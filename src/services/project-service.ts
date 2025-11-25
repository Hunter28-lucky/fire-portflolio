'use client';

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  writeBatch,
} from 'firebase/firestore';
import type {Project} from '@/types';
import {db} from '@/lib/firebase/client';
import {projects as seedProjects} from '@/data/projects';

const PROJECTS_COLLECTION = 'projects';

// One-time function to seed the database if it's empty
async function seedDatabase() {
  const projectsCollection = collection(db, PROJECTS_COLLECTION);
  const snapshot = await getDocs(projectsCollection);

  if (snapshot.empty) {
    console.log('Database is empty. Seeding with initial projects...');
    const batch = writeBatch(db);
    seedProjects.forEach(project => {
      // Firestore will auto-generate IDs, so we don't use the local ones.
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...projectData } = project;
      const docRef = doc(collection(db, PROJECTS_COLLECTION));
      batch.set(docRef, projectData);
    });
    await batch.commit();
    console.log('Database seeded successfully.');
  }
}

export async function getProjects(): Promise<Project[]> {
  // Ensure the database is seeded if empty before fetching
  await seedDatabase();

  try {
    const projectsCollection = collection(db, PROJECTS_COLLECTION);
    const snapshot = await getDocs(projectsCollection);
    const projects = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()} as Project));
    
    // Sort by order field (ascending), projects without order go to the end
    return projects.sort((a, b) => {
      const orderA = a.order ?? 999999;
      const orderB = b.order ?? 999999;
      return orderA - orderB;
    });
  } catch (error) {
    console.error('Could not fetch projects from Firestore. Error:', error);
    // Return an empty array on failure to prevent crashes.
    // The CMS will show a "could not load" message.
    return [];
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
