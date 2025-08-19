// src/components/SignUpForm.js //marketing
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/SignUpForm.module.css';
import usePublicWebsiteContent from '../hooks/usePublicWebsiteContent';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { 
    createUserForVerification,
    sendUserVerificationEmail,
    checkUserEmailVerification,
    completeUserRegistration,
    getAuthUser,
    signOutUser
} from '../repositories/userRepository';
import { Timestamp } from 'firebase/firestore';

const SignUpForm = () => {
    const navigate = useNavigate();
    const { content, loading: contentLoading } = usePublicWebsiteContent();
    
    // Form state
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    
    const [formErrors, setFormErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    
    // Registration state
    const [signUpState, setSignUpState] = useState({
        isRegistered: false,
        isVerified: false,
        isLoading: false,
        error: null
    });
    
    // Download state
    const [downloadAttempted, setDownloadAttempted] = useState(false);
    const [showFallback, setShowFallback] = useState(false);

    // Debug logs
    useEffect(() => {
        console.log('SignUpForm State:', {
            signUpState,
            formData,
            formErrors
        });
    }, [signUpState, formData, formErrors]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Clear error when user starts typing
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateForm = () => {
        const errors = {};
        const { email, password, confirmPassword } = formData;

        // Email validation
        if (!email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid';
        }

        // Password validation
        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters long';
        }

        // Confirm password validation
        if (!confirmPassword) {
            errors.confirmPassword = 'Please confirm your password';
        } else if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSignUp = async () => {
        console.log('handleSignUp called');
        if (!validateForm()) {
            console.log('Form validation failed');
            return;
        }

        setSignUpState(prev => ({ ...prev, isLoading: true, error: null }));

        try {
            console.log('Creating user account...');
            
            // Create user account
            const result = await createUserForVerification(formData.email, formData.password);
            
            if (result.success) {
                console.log('User created successfully, sending verification email...');
                
                // Send verification email
                const emailResult = await sendUserVerificationEmail(result.user);
                
                if (emailResult.success) {
                    console.log('Verification email sent');
                    setSignUpState(prev => ({
                        ...prev,
                        isRegistered: true,
                        isLoading: false,
                        error: null
                    }));
                } else {
                    throw new Error(emailResult.message || 'Failed to send verification email');
                }
            } else {
                throw new Error(result.message || 'Failed to create account');
            }
        } catch (error) {
            console.error('Sign up error:', error);
            setSignUpState(prev => ({
                ...prev,
                isLoading: false,
                error: error.message
            }));
        }
    };

    const checkVerificationStatus = async () => {
        console.log('Checking verification status...');
        
        setSignUpState(prev => ({ ...prev, isLoading: true, error: null }));

        try {
            const user = getAuthUser();
            if (!user) {
                throw new Error('No user found. Please sign up again.');
            }

            // Reload user to get latest email verification status
            await user.reload();
            
            if (user.emailVerified) {
                console.log('Email verified, completing registration...');
                
                // Complete registration
                const result = await completeUserRegistration(user, {
                    createdAt: Timestamp.now()
                });

                if (result.success) {
                    console.log('Registration completed successfully. User remains logged in for potential premium upgrade.');

                    setSignUpState(prev => ({
                        ...prev,
                        isVerified: true,
                        isLoading: false,
                        error: null
                    }));
                } else {
                    throw new Error(result.message || 'Failed to complete registration');
                }
            } else {
                setSignUpState(prev => ({
                    ...prev,
                    isLoading: false,
                    error: 'Email not yet verified. Please check your email and try again.'
                }));
            }
        } catch (error) {
            console.error('Verification check error:', error);
            setSignUpState(prev => ({
                ...prev,
                isLoading: false,
                error: error.message
            }));
        }
    };

    const downloadAPK = () => {
        console.log('Download APK button clicked!');
        console.log('Content object:', content);
        setDownloadAttempted(true);
        
        try {
            const apkUrl = content?.apkDownloadUrl || '/assets/Diabeater.apk';
            const fileName = content?.apkFileName || 'Diabeater.apk';
            
            console.log('APK Config:', { apkUrl, fileName });
            
            const link = document.createElement('a');
            link.href = apkUrl;
            link.download = fileName;
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            console.log('APK download initiated');
            alert('APK download started! Please check your downloads folder.');
            
            // Show fallback immediately for testing
            console.log('Setting showFallback to true for testing...');
            setShowFallback(true);
            
            // Also show fallback after delay in case download fails
            setTimeout(() => {
                console.log('Showing fallback after delay...');
                setShowFallback(true);
            }, 3000); // Reduced from 5000 to 3000 for faster testing
            
        } catch (error) {
            console.error('Error downloading APK:', error);
            alert('Download failed. Please try the Google Drive link below.');
            setShowFallback(true);
        }
    };

    const openGoogleDriveLink = () => {
        console.log('Google Drive link clicked!');
        const fallbackLink = content?.apkFallbackGDriveLink || 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view?usp=sharing';
        console.log('Opening fallback link:', fallbackLink);
        window.open(fallbackLink, '_blank');
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted!');
        await handleSignUp();
    };

    // Loading state
    if (contentLoading) {
        return (
            <div className={styles.pageBackground}>
                <div className={styles.formContainer}>
                    <div className={styles.successMessage}>
                        <h2>Loading...</h2>
                        <p>Please wait while we load the signup form.</p>
                    </div>
                </div>
            </div>
        );
    }

    // Email verified - show download
    if (signUpState.isRegistered && signUpState.isVerified) {
        return (
            <div className={styles.pageBackground}>
                <div className={styles.formContainer}>
                    <div className={styles.successMessage}>
                        <h2>Verification Successful!</h2>
                        <p>Your email has been verified. Your Diabeater app will download automatically!</p>
                        
                        <button 
                            className={styles.ctaButton} 
                            onClick={downloadAPK}
                            type="button"
                        >
                            Download App Now
                        </button>
                        
                        {downloadAttempted && (
                            <p className={styles.downloadNote}>
                                {showFallback ? 
                                    "Download taking too long?" : 
                                    "If the download doesn't start automatically, click the button above."
                                }
                            </p>
                        )}
                        
                        {showFallback && (
                            <div className={styles.fallbackSection}>
                                <p className={styles.fallbackMessage}>
                                    {content?.apkFallbackMessage || "Having trouble downloading? Try our Google Drive link instead."}
                                </p>
                                <button 
                                    className={`${styles.ctaButton} ${styles.fallbackButton}`}
                                    onClick={openGoogleDriveLink}
                                    type="button"
                                    style={{ 
                                        backgroundColor: '#28a745',
                                        marginTop: '10px'
                                    }}
                                >
                                    Download from Google Drive
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Account created, waiting for verification
    if (signUpState.isRegistered) {
        return (
            <div className={styles.pageBackground}>
                <div className={styles.formContainer}>
                    <div className={styles.successMessage}>
                        <h2>Account Created!</h2>
                        <p>We've sent a verification link to your email. Please verify your email and then click the button below.</p>
                        <button 
                            className={styles.ctaButton} 
                            onClick={checkVerificationStatus} 
                            disabled={signUpState.isLoading}
                            type="button"
                        >
                            {signUpState.isLoading ? 'Checking...' : 'I have verified my email'}
                        </button>
                        {signUpState.error && <p className={styles.errorText}>{signUpState.error}</p>}
                    </div>
                </div>
            </div>
        );
    }

    // Sign up form
    return (
        <div className={styles.pageBackground}>
            <div className={styles.formContainer}>
                <h2>Sign Up for DiaBeater</h2>
                <form onSubmit={handleFormSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            className={formErrors.email ? styles.inputError : ''} 
                            required
                        />
                        {formErrors.email && <span className={styles.errorText}>{formErrors.email}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.passwordLabel}>Password</label>
                        <div className={styles.passwordInputContainer}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={formErrors.password ? styles.inputError : ''}
                                required
                            />
                            <span className={styles.passwordToggle} onClick={togglePasswordVisibility}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        {formErrors.password && <span className={styles.errorText}>{formErrors.password}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <div className={styles.passwordInputContainer}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={formErrors.confirmPassword ? styles.inputError : ''}
                                required
                            />
                            <span className={styles.passwordToggle} onClick={togglePasswordVisibility}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        {formErrors.confirmPassword && <span className={styles.errorText}>{formErrors.confirmPassword}</span>}
                    </div>

                    {signUpState.error && <p className={styles.errorText}>{signUpState.error}</p>}
                    
                    <button 
                        type="submit" 
                        className={styles.ctaButton} 
                        disabled={signUpState.isLoading}
                    >
                        {signUpState.isLoading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUpForm;

