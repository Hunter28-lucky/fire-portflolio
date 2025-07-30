'use client';

import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, writeBatch, getDoc } from 'firebase/firestore';
import type { Project } from '@/types';
import { db } from '@/lib/firebase/client'; // Use client db for client-side fetching
import { projects as seedProjects } from '@/data/projects';

const PROJECTS_COLLECTION = 'projects';

export async function getProjects(): Promise<Project[]> {
  try {
    const projectsCollection = collection(db, PROJECTS_COLLECTION);
    const snapshot = await getDocs(projectsCollection);
    
    if (snapshot.empty) {
      console.log("Firestore is empty, returning seed projects.");
      return seedProjects;
    }
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
  } catch (error) {
    console.error("Could not fetch projects, returning local fallback. Error:", error);
    // This will catch permission errors on the client and return the fallback data.
    return seedProjects;
  }
}

export async function addProject(project: Omit<Project, 'id'>): Promise<Project> {
    const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), project);
    return { id: docRef.id, ...project };
}

export async function updateProject(id: string, project: Partial<Omit<Project, 'id'>>): Promise<void> {
  const docRef = doc(db, PROJECTS_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    await updateDoc(docRef, project);
  } else {
    console.warn(`Attempted to update non-existent project with id: ${id}`);
  }
}

export async function deleteProject(id: string): Promise<void> {
  const docRef = doc(db, PROJECTS_COLLECTION, id);
  await deleteDoc(docRef);
}
