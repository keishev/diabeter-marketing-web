// src/viewmodels/signUpViewModel.js
import { useState, useEffect } from 'react';
import { signUpNewUser, getAuthUser, checkEmailVerification } from '../repositories/userRepository'; 
import { Timestamp } from 'firebase/firestore';

const useSignUpViewModel = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        dateOfBirth: '', // Date string from input
    });
    const [formErrors, setFormErrors] = useState({});
    const [signUpState, setSignUpState] = useState({
        isRegistered: false,
        isVerified: false,
        isLoading: false,
        error: null,
        user: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (formErrors[name]) {
            setFormErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
        }
    };

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (formErrors[name]) {
            setFormErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
        }
    };

    // Convert date string to Firebase Timestamp with proper timezone
    const convertDateToTimestamp = (dateString) => {
        if (!dateString) return null;
        
        // Create date at noon local time to avoid timezone issues
        const date = new Date(dateString + 'T12:00:00');
        
        // Create Firestore Timestamp
        return Timestamp.fromDate(date);
    };

    // Format timestamp for display (like "14 July 2025 at 11:50:20 UTC+8")
    const formatTimestampForDisplay = (timestamp) => {
        if (!timestamp) return '';
        
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

    const validateForm = () => {
        let errors = {};
        const { email, password, confirmPassword } = formData;

        if (!email) errors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid';
        
        // Password validation
        if (!password) {
            errors.password = 'Password is required';
        } else {
            const hasUpperCase = /[A-Z]/.test(password);
            const hasSymbolOrNumber = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]/.test(password);
            
            if (password.length < 8) {
                errors.password = 'Password must be at least 8 characters long.';
            }
            if (!hasUpperCase) {
                errors.password = (errors.password || '') + ' Must contain at least one uppercase letter.';
            }
            if (!hasSymbolOrNumber) {
                errors.password = (errors.password || '') + ' Must contain at least one number or symbol.';
            }
            if (errors.password) {
                errors.password = errors.password.trim();
            }
        }
        
        if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSignUp = async () => {
        if (!validateForm()) return;

        setSignUpState(prevState => ({ ...prevState, isLoading: true, error: null }));
        
        try {
            const user = await signUpNewUser(formData.email, formData.password, {
                createdAt: Timestamp.now(), // Store creation timestamp
            });
            
            setSignUpState(prevState => ({
                ...prevState,
                isRegistered: true,
                isLoading: false,
                user: user,
            }));
        } catch (e) {
            console.error('Sign up error:', e);
            setSignUpState(prevState => ({
                ...prevState,
                isLoading: false,
                error: e.message,
            }));
        }
    };
    
    const checkVerificationStatus = async () => {
        setSignUpState(prevState => ({ ...prevState, isLoading: true, error: null }));
        
        try {
            const user = getAuthUser();
            if (user) {
                await user.reload();
                if (checkEmailVerification(user)) {
                    setSignUpState(prevState => ({ 
                        ...prevState, 
                        isVerified: true,
                        isLoading: false 
                    }));
                } else {
                    setSignUpState(prevState => ({ 
                        ...prevState, 
                        isLoading: false,
                        error: 'Email not yet verified. Please check your email and try again.' 
                    }));
                }
            }
        } catch (error) {
            setSignUpState(prevState => ({ 
                ...prevState, 
                isLoading: false,
                error: 'Error checking verification status. Please try again.' 
            }));
        }
    };

    return {
        formData,
        formErrors,
        signUpState,
        handleChange,
        handleDateChange,
        handleSignUp,
        checkVerificationStatus,
        formatTimestampForDisplay, // Export for potential use
    };
};

export default useSignUpViewModel;