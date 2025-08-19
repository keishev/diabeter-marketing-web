// src/services/firebaseService.js
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB9eCJVgUEzCi_5rD7EjYAwQQYrYH4j4_E",
  authDomain: "diabeaters-4cf9e.firebaseapp.com",
  projectId: "diabeaters-4cf9e",
  storageBucket: "diabeaters-4cf9e.firebasestorage.app",
  messagingSenderId: "670973866835",
  appId: "1:670973866835:web:2a41f442c1abbe12bd67a6",
  measurementId: "G-877JJXG197"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export const fetchDocData = async (collectionPath, docId) => {
  try {
    const docRef = doc(db, collectionPath, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    throw error;
  }
};

export { app, db, auth };
