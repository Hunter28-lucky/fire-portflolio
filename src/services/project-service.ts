'use server';

import { initializeApp, getApps, getApp, deleteApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, addDoc, updateDoc, deleteDoc, getDoc, writeBatch } from 'firebase/firestore';
import type { Project } from '@/types';
import { projects as seedProjects } from '@/data/projects';

const firebaseConfig = {
  "projectId": "krish-goswami-portfolio-qb9yp",
  "appId": "1:425022461612:web:e29cfeb20159228aaff109",
  "storageBucket": "krish-goswami-portfolio-qb9yp.firebasestorage.app",
  "apiKey": "AIzaSyBiS2sr84cCa7ojoRD9Kr3WkSzo1rw_xB4",
  "authDomain": "krish-goswami-portfolio-qb9yp.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "425022461612"
};

// --- Server-side Firebase Initialization ---
let db: ReturnType<typeof getFirestore>;
const appName = 'firebase-server-app-project-service';
if (!getApps().some(app => app.name === appName)) {
  const serverApp = initializeApp(firebaseConfig, appName);
  db = getFirestore(serverApp);
} else {
  const serverApp = getApp(appName);
  db = getFirestore(serverApp);
}
// --- End Server-side Firebase Initialization ---


const PROJECTS_COLLECTION = 'projects';

// This function now returns the local seed data if the database is empty.
// The responsibility of writing data is now solely on the authenticated CMS.
export async function getProjects(): Promise<Project[]> {
  try {
    const projectsCollection = collection(db, PROJECTS_COLLECTION);
    const snapshot = await getDocs(projectsCollection);
    
    if (snapshot.empty) {
      console.log("Firestore is empty, returning seed projects.");
      // If the database is empty, you can return the local data as a fallback.
      // The CMS is now responsible for the initial write.
      return seedProjects;
    }
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
  } catch (error) {
    console.error("Could not fetch projects, returning local fallback. Error:", error);
    // If there's an error (e.g., permissions), return local data.
    return seedProjects;
  }
}

export async function getProject(id: string): Promise<Project | null> {
  const docRef = doc(db, PROJECTS_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Project;
  }
  return null;
}

export async function addProject(project: Omit<Project, 'id'>): Promise<Project> {
  // This function will be called from the CMS by an authenticated user.
  // First, check if the DB is empty and if so, add all seed projects.
  const projectsCollection = collection(db, PROJECTS_COLLECTION);
  const snapshot = await getDocs(projectsCollection);
  if (snapshot.empty) {
    console.log('Database is empty. Seeding with initial projects before adding the new one...');
    const batch = writeBatch(db);
    seedProjects.forEach((p) => {
      // Don't use seed ID, let Firestore generate it
      const { id, ...projectData } = p;
      const docRef = doc(projectsCollection); 
      batch.set(docRef, projectData);
    });
    await batch.commit();
    console.log('Database seeded successfully.');
  }

  const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), project);
  return { id: docRef.id, ...project };
}

export async function updateProject(id: string, project: Partial<Omit<Project, 'id'>>): Promise<void> {
  const docRef = doc(db, PROJECTS_COLLECTION, id);
  await updateDoc(docRef, project);
}

export async function deleteProject(id: string): Promise<void> {
  const docRef = doc(db, PROJECTS_COLLECTION, id);
  await deleteDoc(docRef);
}
