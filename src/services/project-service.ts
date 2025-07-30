'use server';

import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, writeBatch } from 'firebase/firestore';
import type { Project } from '@/types';
import { db } from '@/lib/firebase/server';
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
    return seedProjects;
  }
}

export async function addProject(project: Omit<Project, 'id'>): Promise<Project> {
  const projectsCollection = collection(db, PROJECTS_COLLECTION);
  const snapshot = await getDocs(projectsCollection);

  if (snapshot.empty) {
    console.log('Database is empty. Seeding with initial projects...');
    const batch = writeBatch(db);
    seedProjects.forEach((p) => {
      const docRef = doc(projectsCollection);
      const { id, ...projectData } = p;
      batch.set(docRef, projectData);
    });
    await batch.commit();
    console.log('Database seeded successfully.');
  }

  const docRef = await addDoc(projectsCollection, project);
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
