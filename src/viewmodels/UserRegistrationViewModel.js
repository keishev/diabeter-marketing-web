// src/viewModels/UserRegistrationViewModel.js
import { 
    createUserForVerification,
    sendUserVerificationEmail,
    checkUserEmailVerification,
    completeUserRegistration,
    getAuthUser 
} from '../repositories/userRepository';
import { Timestamp } from 'firebase/firestore';

class UserRegistrationViewModel {
    constructor() {
        this.currentUser = null;
        this.registrationState = {
            step: 1, // 1: fill info, 2: verify email, 3: check verification, 4: complete signup
            isLoading: false,
            error: null,
            success: null
        };
        this.userData = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            dateOfBirth: null
        };
        this.listeners = [];
    }

    // Observer pattern for state updates
    addListener(listener) {
        this.listeners.push(listener);
    }

    removeListener(listener) {
        this.listeners = this.listeners.filter(l => l !== listener);
    }

    notifyListeners() {
        this.listeners.forEach(listener => listener(this.getState()));
    }

    getState() {
        return {
            currentUser: this.currentUser,
            registrationState: { ...this.registrationState },
            userData: { ...this.userData }
        };
    }

    // Update user data
    updateUserData(data) {
        this.userData = { ...this.userData, ...data };
        this.notifyListeners();
    }

    // Set date of birth as Firestore timestamp
    setDateOfBirth(date) {
        this.userData.dateOfBirth = Timestamp.fromDate(new Date(date));
        this.notifyListeners();
    }

    // Step 1: Create user account and move to verification step
    async createUserAccount() {
        this.setLoading(true);
        this.clearMessages();

        const { email, password } = this.userData;

        if (!this.validateStep1()) {
            return;
        }

        try {
            const result = await createUserForVerification(email, password);

            if (result.success) {
                this.currentUser = result.user;
                this.registrationState.step = 2;
                this.setSuccess('Account created! Please send verification email.');
            } else {
                this.setError(result.message);
            }
        } catch (error) {
            this.setError('Failed to create account. Please try again.');
        }

        this.setLoading(false);
    }

    // Step 2: Send verification email
    async sendVerificationEmail() {
        if (!this.currentUser) {
            this.setError('No user found. Please create account first.');
            return;
        }

        this.setLoading(true);
        this.clearMessages();

        try {
            const result = await sendUserVerificationEmail(this.currentUser);

            if (result.success) {
                this.registrationState.step = 3;
                this.setSuccess('Verification email sent! Please check your email and click the verification link.');
            } else {
                this.setError(result.message);
            }
        } catch (error) {
            this.setError('Failed to send verification email. Please try again.');
        }

        this.setLoading(false);
    }

    // Step 3: Check email verification status
    async checkEmailVerification() {
        if (!this.currentUser) {
            this.setError('No user found. Please create account first.');
            return;
        }

        this.setLoading(true);
        this.clearMessages();

        try {
            const result = await checkUserEmailVerification(this.currentUser);

            if (result.success) {
                if (result.isVerified) {
                    this.registrationState.step = 4;
                    this.setSuccess('Email verified successfully! You can now complete your registration.');
                } else {
                    this.setError('Email not verified yet. Please check your email and click the verification link.');
                }
            } else {
                this.setError(result.message);
            }
        } catch (error) {
            this.setError('Failed to check verification status. Please try again.');
        }

        this.setLoading(false);
    }

    // Step 4: Complete user registration
    async completeRegistration() {
        if (!this.currentUser) {
            this.setError('No user found. Please start the registration process again.');
            return;
        }

        if (!this.validateStep4()) {
            return;
        }

        this.setLoading(true);
        this.clearMessages();

        try {
            const userDataForFirestore = {
                firstName: this.userData.firstName,
                lastName: this.userData.lastName,
                dateOfBirth: this.userData.dateOfBirth,
                createdAt: Timestamp.now()
            };

            const result = await completeUserRegistration(this.currentUser, userDataForFirestore);

            if (result.success) {
                this.setSuccess('Registration completed successfully! Welcome!');
                // You might want to redirect to dashboard or login page here
                return true;
            } else {
                this.setError(result.message);
                return false;
            }
        } catch (error) {
            this.setError('Failed to complete registration. Please try again.');
            return false;
        } finally {
            this.setLoading(false);
        }
    }

    // Validation methods
    validateStep1() {
        const { email, password } = this.userData;

        if (!email || !password) {
            this.setError('Email and password are required.');
            return false;
        }

        if (!this.isValidEmail(email)) {
            this.setError('Please enter a valid email address.');
            return false;
        }

        if (password.length < 6) {
            this.setError('Password must be at least 6 characters long.');
            return false;
        }

        return true;
    }

    validateStep4() {
        const { firstName, lastName, dateOfBirth } = this.userData;

        if (!firstName || !lastName) {
            this.setError('First name and last name are required.');
            return false;
        }

        if (!dateOfBirth) {
            this.setError('Date of birth is required.');
            return false;
        }

        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // State management helpers
    setLoading(loading) {
        this.registrationState.isLoading = loading;
        this.notifyListeners();
    }

    setError(error) {
        this.registrationState.error = error;
        this.registrationState.success = null;
        this.notifyListeners();
    }

    setSuccess(success) {
        this.registrationState.success = success;
        this.registrationState.error = null;
        this.notifyListeners();
    }

    clearMessages() {
        this.registrationState.error = null;
        this.registrationState.success = null;
        this.notifyListeners();
    }

    // Reset the entire flow
    resetFlow() {
        this.currentUser = null;
        this.registrationState = {
            step: 1,
            isLoading: false,
            error: null,
            success: null
        };
        this.userData = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            dateOfBirth: null
        };
        this.notifyListeners();
    }

    // Resend verification email
    async resendVerificationEmail() {
        return await this.sendVerificationEmail();
    }
}

export default UserRegistrationViewModel;