// src/services/firebaseAuthService.js

// Correct the import path to navigate up one directory to find 'firebase.js'
import { app, db } from '../firebase'; 
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';


const auth = getAuth(app);

export const registerUser = async (email, password, userData) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await sendEmailVerification(user);

        await setDoc(doc(db, 'user_accounts', user.uid), {
            ...userData,
            email: user.email,
            role: 'basic',
            profileCompleted: false
        });

        return user;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};

export const isEmailVerified = (user) => {
    return user && user.emailVerified;
};

export const getCurrentUser = () => {
    return auth.currentUser;
};