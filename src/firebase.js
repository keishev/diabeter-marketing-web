// src/firebaseConfig.js (in your PUBLIC marketing website project)
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// These are your specific Firebase project's details.
// You MUST replace the placeholder values with YOUR ACTUAL values.
// Find these in your Firebase Console -> Project settings (gear icon next to "Project overview").
const firebaseConfig = {
  apiKey: "AIzaSyB9eCJVgUEzCi_5rD7EjYAwQQYrYH4j4_E",
  authDomain: "diabeaters-4cf9e.firebaseapp.com",
  projectId: "diabeaters-4cf9e",
  storageBucket: "diabeaters-4cf9e.firebasestorage.app",
  messagingSenderId: "670973866835",
  appId: "1:670973866835:web:2a41f442c1abbe12bd67a6",
  measurementId: "G-877JJXG197" // You can remove this if not using Analytics
};

// Initialize your Firebase app
const app = initializeApp(firebaseConfig);
// Get a reference to the Firestore database service
const db = getFirestore(app);

// Export the 'db' object so you can use it in other files to talk to Firestore
export { db };