'use client'

import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  "projectId": "krish-goswami-portfolio-qb9yp",
  "appId": "1:425022461612:web:e29cfeb20159228aaff109",
  "storageBucket": "krish-goswami-portfolio-qb9yp.firebasestorage.app",
  "apiKey": "AIzaSyBiS2sr84cCa7ojoRD9Kr3WkSzo1rw_xB4",
  "authDomain": "krish-goswami-portfolio-qb9yp.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "425022461612"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app as firebaseApp, auth, db };
