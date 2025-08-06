// src/viewmodels/signUpViewModel.js
import { useState, useEffect } from 'react';
import { signUpNewUser, getAuthUser, checkEmailVerification } from '../repositories/userRepository'; 

const useSignUpViewModel = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
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

    const validateForm = () => {
        let errors = {};
        const { firstName, lastName, email, password, confirmPassword } = formData;

        if (!firstName) errors.firstName = 'First name is required';
        if (!lastName) errors.lastName = 'Last name is required';
        if (!email) errors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid';
        // The DOB validation has been removed here.
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
                firstName: formData.firstName,
                lastName: formData.lastName,
                // The dob field has been removed from the data object.
            });
            setSignUpState(prevState => ({
                ...prevState,
                isRegistered: true,
                isLoading: false,
                user: user,
            }));
        } catch (e) {
            setSignUpState(prevState => ({
                ...prevState,
                isLoading: false,
                error: e.message,
            }));
        }
    };
    
    const checkVerificationStatus = () => {
        const user = getAuthUser();
        if (user) {
            user.reload().then(() => {
                if (checkEmailVerification(user)) {
                    setSignUpState(prevState => ({ ...prevState, isVerified: true }));
                }
            });
        }
    };

    return {
        formData,
        formErrors,
        signUpState,
        handleChange,
        handleSignUp,
        checkVerificationStatus,
    };
};

export default useSignUpViewModel;