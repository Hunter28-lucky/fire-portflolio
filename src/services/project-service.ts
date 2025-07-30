'use server';

import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, writeBatch } from 'firebase/firestore';
import type { Project } from '@/types';
// We use the client instance here because this service will now also be used by client components.
// Firebase handles the context switching automatically.
import { db } from '@/lib/firebase/client';
import { projects as seedProjects } from '@/data/projects';

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
    // If there is a permission error on the client, it's better to show local data than nothing.
    return seedProjects;
  }
}

export async function addProject(project: Omit<Project, 'id'>): Promise<Project> {
  const projectsCollection = collection(db, PROJECTS_COLLECTION);
  const snapshot = await getDocs(projectsCollection);

  // This check is to see if this is the very first project being added.
  // If so, we seed the database with all the local projects first.
  if (snapshot.empty) {
    console.log('Database is empty. Seeding with initial projects...');
    const batch = writeBatch(db);
    seedProjects.forEach((p) => {
      // Use the seed ID if it exists, otherwise let Firestore generate one
      const docRef = p.id ? doc(projectsCollection, p.id) : doc(projectsCollection);
      const { id, ...projectData } = p;
      batch.set(docRef, projectData);
    });
    await batch.commit();
    console.log('Database seeded successfully.');
     const newDocRef = await addDoc(projectsCollection, project);
     return { id: newDocRef.id, ...project };
  } else {
     const docRef = await addDoc(projectsCollection, project);
     return { id: docRef.id, ...project };
  }
}

export async function updateProject(id: string, project: Partial<Omit<Project, 'id'>>): Promise<void> {
  const docRef = doc(db, PROJECTS_COLLECTION, id);
  await updateDoc(docRef, project);
}

export async function deleteProject(id: string): Promise<void> {
  const docRef = doc(db, PROJECTS_COLLECTION, id);
  await deleteDoc(docRef);
}
