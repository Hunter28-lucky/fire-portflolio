'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, doc, addDoc, updateDoc, deleteDoc, getDoc, writeBatch } from 'firebase/firestore';
import type { Project } from '@/types';
import { projects as seedProjects } from '@/data/projects';

const PROJECTS_COLLECTION = 'projects';

// Helper function to seed the database from the static file if it's empty.
const seedDatabase = async () => {
  const projectsCollection = collection(db, PROJECTS_COLLECTION);
  const snapshot = await getDocs(projectsCollection);
  if (snapshot.empty) {
    console.log('Database is empty. Seeding with initial projects...');
    const batch = writeBatch(db);
    seedProjects.forEach((project) => {
      // Use the static ID for seeding to maintain consistency if needed
      const docRef = doc(db, PROJECTS_COLLECTION, project.id);
      batch.set(docRef, project);
    });
    await batch.commit();
    console.log('Database seeded successfully.');
  }
};


// Ensures seeding is checked before any operation.
const ensureSeeded = async () => {
    // This is a simplified check. In a real-world app, you might use a flag
    // in another document or a more robust singleton pattern.
    const projectsCollection = collection(db, PROJECTS_COLLECTION);
    const snapshot = await getDocs(projectsCollection);
    if(snapshot.empty) {
        await seedDatabase();
    }
}


export async function getProjects(): Promise<Project[]> {
  await ensureSeeded();
  const projectsCollection = collection(db, PROJECTS_COLLECTION);
  const snapshot = await getDocs(projectsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
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
  const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), project);
  return { id: docRef.id, ...project };
}

export async function updateProject(id: string, project: Omit<Project, 'id'>): Promise<void> {
  const docRef = doc(db, PROJECTS_COLLECTION, id);
  await updateDoc(docRef, project);
}

export async function deleteProject(id: string): Promise<void> {
  const docRef = doc(db, PROJECTS_COLLECTION, id);
  await deleteDoc(docRef);
}
