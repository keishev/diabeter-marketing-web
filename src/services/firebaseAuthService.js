// src/services/firebaseAuthService.js

// Correct the import path to navigate up one directory to find 'firebase.js'
import { app, db } from '../firebase'; 
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    sendEmailVerification, 
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    reload
} from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const auth = getAuth(app);

/**
 * Original registerUser function (for backward compatibility)
 * Creates user, sends verification, and stores data in one go
 */
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

/**
 * Creates a user account without storing additional data
 * Used in step 1 of the verification flow
 */
export const createUserAccount = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return {
            success: true,
            user: userCredential.user,
            message: 'User account created successfully'
        };
    } catch (error) {
        return {
            success: false,
            error: error.code,
            message: error.message
        };
    }
};

/**
 * Sends email verification to the current user
 */
export const sendVerificationEmail = async (user) => {
    try {
        await sendEmailVerification(user);
        return {
            success: true,
            message: 'Verification email sent successfully'
        };
    } catch (error) {
        return {
            success: false,
            error: error.code,
            message: error.message
        };
    }
};

/**
 * Checks if the current user's email is verified
 * Reloads user data to get the latest verification status
 */
export const checkEmailVerificationStatus = async (user) => {
    try {
        // Reload user data to get the latest verification status
        await reload(user);
        
        return {
            success: true,
            isVerified: user.emailVerified,
            message: user.emailVerified ? 'Email is verified' : 'Email is not verified yet'
        };
    } catch (error) {
        return {
            success: false,
            error: error.code,
            message: error.message
        };
    }
};

/**
 * Signs in user (used for checking verification status)
 */
export const signInUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return {
            success: true,
            user: userCredential.user,
            message: 'User signed in successfully'
        };
    } catch (error) {
        return {
            success: false,
            error: error.code,
            message: error.message
        };
    }
};

/**
 * Signs out current user
 */
export const signOutUser = async () => {
    try {
        await signOut(auth);
        return {
            success: true,
            message: 'User signed out successfully'
        };
    } catch (error) {
        return {
            success: false,
            error: error.code,
            message: error.message
        };
    }
};

/**
 * Check if user email is verified
 */
export const isEmailVerified = (user) => {
    return user && user.emailVerified;
};

/**
 * Gets the current authenticated user
 */
export const getCurrentUser = () => {
    return auth.currentUser;
};

/**
 * Listen for authentication state changes
 */
export const onAuthStateChange = (callback) => {
    return onAuthStateChanged(auth, callback);
};