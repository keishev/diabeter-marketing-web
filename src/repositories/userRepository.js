// src/repositories/userRepository.js
import { 
    createUserAccount,
    sendVerificationEmail,
    checkEmailVerificationStatus,
    signInUser,
    getCurrentUser,
    registerUser,
    isEmailVerified
} from '../services/firebaseAuthService';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Step 1: Create user account (email/password only)
 */
export const createUserForVerification = async (email, password) => {
    return await createUserAccount(email, password);
};

/**
 * Step 2: Send verification email
 */
export const sendUserVerificationEmail = async (user) => {
    return await sendVerificationEmail(user);
};

/**
 * Step 3: Check verification status
 */
export const checkUserEmailVerification = async (user) => {
    return await checkEmailVerificationStatus(user);
};

/**
 * Step 4: Complete user registration with minimal data
 * Only called after email verification is confirmed
 */
export const completeUserRegistration = async (user, userData) => {
    try {
        const userDocData = {
            uid: user.uid,
            email: user.email,
            createdAt: userData.createdAt || Timestamp.now(),
            emailVerified: true,
            registrationCompleted: true,
            role: 'basic',
            profileCompleted: false,
            // Add other fields as needed
        };
        
        await setDoc(doc(db, 'user_accounts', user.uid), userDocData);
        
        return {
            success: true,
            message: 'User registration completed successfully',
            userData: userDocData
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
 * Sign in user for verification check
 */
export const signInUserForVerification = async (email, password) => {
    return await signInUser(email, password);
};

/**
 * Get current authenticated user
 */
export const getAuthUser = () => {
    return getCurrentUser();
};

/**
 * Original signUpNewUser function (for backward compatibility)
 * This uses the original registerUser function
 */
export const signUpNewUser = async (email, password, userData) => {
    return await registerUser(email, password, userData);
};

/**
 * Original checkEmailVerification function (for backward compatibility)
 */
export const checkEmailVerification = (user) => {
    return isEmailVerified(user);
};

/**
 * Helper function to format timestamp for display
 */
export const formatUserTimestamp = (timestamp) => {
    if (!timestamp) return 'Not set';
    
    const date = timestamp.toDate();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    };
    
    return date.toLocaleDateString('en-GB', options);
};