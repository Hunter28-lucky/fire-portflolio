'use client';

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
} from 'firebase/firestore';
import type {Project} from '@/types';
import {db} from '@/lib/firebase/client'; // Use the client-side db for CMS operations
import {projects as seedProjects} from '@/data/projects';

const PROJECTS_COLLECTION = 'projects';

// This function is used by the client-side CMS
export async function getProjects(): Promise<Project[]> {
  try {
    const projectsCollection = collection(db, PROJECTS_COLLECTION);
    const snapshot = await getDocs(projectsCollection);

    if (snapshot.empty) {
      // Fallback for when the CMS is opened for the first time before any projects are added.
      return seedProjects;
    }

    return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()} as Project));
  } catch (error) {
    console.error(
      'Could not fetch projects, returning local fallback. Error:',
      error,
    );
    // This fallback is for display purposes if firestore is unreachable.
    return seedProjects;
  }
}

export async function addProject(
  project: Omit<Project, 'id'>,
): Promise<Project> {
  const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), project);
  return {id: docRef.id, ...project};
}

export async function updateProject(
  id: string,
  project: Partial<Omit<Project, 'id'>>,
): Promise<void> {
  const docRef = doc(db, PROJECTS_COLLECTION, id);
  await updateDoc(docRef, project);
}

export async function deleteProject(id: string): Promise<void> {
  const docRef = doc(db, PROJECTS_COLLECTION, id);
  await deleteDoc(docRef);
}
