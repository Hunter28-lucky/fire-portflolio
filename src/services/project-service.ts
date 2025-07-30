'use server';

import { initializeApp, getApps, getApp } from 'firebase/app';
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

// Initialize Firebase Admin SDK for server-side access
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

const PROJECTS_COLLECTION = 'projects';

export async function getProjects(): Promise<Project[]> {
  try {
    const projectsCollection = collection(db, PROJECTS_COLLECTION);
    const snapshot = await getDocs(projectsCollection);
    
    if (snapshot.empty) {
      console.log("Firestore is empty, returning seed projects as fallback.");
      return seedProjects;
    }
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
  } catch (error) {
    console.error("Could not fetch projects, returning local fallback. Error:", error);
    // On permission error or any other error, fall back to local data.
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
  const projectsCollection = collection(db, PROJECTS_COLLECTION);
  const snapshot = await getDocs(projectsCollection);

  // This check now only happens on the client, inside the authenticated CMS.
  // The first authenticated user to add a project will trigger the seed.
  if (snapshot.empty) {
    console.log('Database is empty. Seeding with initial projects before adding the new one...');
    const batch = writeBatch(db);
    seedProjects.forEach((p) => {
      const { id, ...projectData } = p;
      // Let Firestore generate the ID
      const docRef = doc(collection(db, PROJECTS_COLLECTION));
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
