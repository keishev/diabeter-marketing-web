// src/repositories/userRepository.js
import { 
    registerUser, 
    isEmailVerified,
    getCurrentUser 
} from '../services/firebaseAuthService';

export const signUpNewUser = async (email, password, userData) => {
    return await registerUser(email, password, userData);
};

export const checkEmailVerification = (user) => {
    return isEmailVerified(user);
};

export const getAuthUser = () => {
    return getCurrentUser();
};