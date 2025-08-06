// src/components/SignUpForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/SignUpForm.module.css';
import useSignUpViewModel from '../viewmodels/signUpViewModel';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignUpForm = () => {
    const navigate = useNavigate();
    const {
        formData,
        formErrors,
        signUpState,
        handleChange,
        handleSignUp,
        checkVerificationStatus,
    } = useSignUpViewModel();

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleDownloadRedirect = () => {
        console.log("Downloading app...");
        navigate('/');
    };

    if (signUpState.isRegistered) {
        if (signUpState.isVerified) {
            return (
                <div className={styles.pageBackground}>
                    <div className={styles.formContainer}>
                        <div className={styles.successMessage}>
                            <h2>Verification Successful!</h2>
                            <p>Your email has been verified. You can now download the app.</p>
                            <button className={styles.ctaButton} onClick={handleDownloadRedirect}>Download App</button>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className={styles.pageBackground}>
                <div className={styles.formContainer}>
                    <div className={styles.successMessage}>
                        <h2>Account Created!</h2>
                        <p>We've sent a verification link to your email. Please verify your email and then click the button below.</p>
                        <button className={styles.ctaButton} onClick={checkVerificationStatus} disabled={signUpState.isLoading}>
                            {signUpState.isLoading ? 'Checking...' : 'I have verified my email'}
                        </button>
                        {signUpState.error && <p className={styles.errorText}>{signUpState.error}</p>}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.pageBackground}>
            <div className={styles.formContainer}>
                <h2>Sign Up for Diabeter</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSignUp(); }} className={styles.form}>
                    <div className={styles.gridInputs}>
                        <div className={styles.formGroup}>
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className={formErrors.firstName ? styles.inputError : ''} />
                            {formErrors.firstName && <span className={styles.errorText}>{formErrors.firstName}</span>}
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className={formErrors.lastName ? styles.inputError : ''} />
                            {formErrors.lastName && <span className={styles.errorText}>{formErrors.lastName}</span>}
                        </div>
                        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={formErrors.email ? styles.inputError : ''} />
                            {formErrors.email && <span className={styles.errorText}>{formErrors.email}</span>}
                        </div>
                    </div>
                    {/* New container for passwords to manage their side-by-side layout */}
                    <div className={styles.passwordGrid}>
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
                                />
                                <span className={styles.passwordToggle} onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            {formErrors.confirmPassword && <span className={styles.errorText}>{formErrors.confirmPassword}</span>}
                        </div>
                    </div>
                    {signUpState.error && <p className={styles.errorText}>{signUpState.error}</p>}
                    <button type="submit" className={styles.ctaButton} disabled={signUpState.isLoading}>
                        {signUpState.isLoading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUpForm;