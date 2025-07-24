// src/components/SignUpForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/SignUpForm.module.css';

const SignUpForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '', // Date of Birth
    password: '',
    confirmPassword: '',
    otp: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  // Hardcoded OTP for demonstration
  const HARDCODED_OTP = '123456';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) {
      setFormErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  const validateForm = () => {
    let errors = {};
    const { firstName, lastName, email, dob, password, confirmPassword, otp } = formData;

    if (!firstName) errors.firstName = 'First name is required';
    if (!lastName) errors.lastName = 'Last name is required';
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    if (!dob) errors.dob = 'Date of birth is required';
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (!confirmPassword) {
      errors.confirmPassword = 'Confirm password is required';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    if (!otp) {
      errors.otp = 'OTP is required';
    } else if (otp !== HARDCODED_OTP) {
      errors.otp = 'Invalid OTP';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSignUpSuccess(false);

    if (validateForm()) {
      console.log('Sign up data:', formData);
      setSignUpSuccess(true);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  if (signUpSuccess) {
    return (
      <div className={styles.pageBackground}>
      <div className={styles.formContainer}>
        <div className={styles.successMessage}>
          <h2>Sign Up Successful!</h2>
          <p>Thank you for registering with Diabeter. You can now log in.</p>
          <button className={styles.ctaButton} onClick={handleLoginRedirect}>Go to Login</button>
        </div>
      </div>
      </div>
    );
  }

  return (
    <div className={styles.pageBackground}>
    <div className={styles.formContainer}>
      <h2>Sign Up for Diabeter</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* All these form groups will now be part of the gridInputs for the 2x2 layout */}
        <div className={styles.gridInputs}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={formErrors.firstName ? styles.inputError : ''}
            />
            {formErrors.firstName && <span className={styles.errorText}>{formErrors.firstName}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={formErrors.lastName ? styles.inputError : ''}
            />
            {formErrors.lastName && <span className={styles.errorText}>{formErrors.lastName}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={formErrors.email ? styles.inputError : ''}
            />
            {formErrors.email && <span className={styles.errorText}>{formErrors.email}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className={formErrors.dob ? styles.inputError : ''}
            />
            {formErrors.dob && <span className={styles.errorText}>{formErrors.dob}</span>}
          </div>

          {/* Moved Password and Confirm Password into gridInputs */}
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.passwordLabel}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={formErrors.password ? styles.inputError : ''}
            />
            {formErrors.password && <span className={styles.errorText}>{formErrors.password}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={formErrors.confirmPassword ? styles.inputError : ''}
            />
            {formErrors.confirmPassword && <span className={styles.errorText}>{formErrors.confirmPassword}</span>}
          </div>
        </div> {/* END: gridInputs */}

        {/* OTP will now be a full width input below the 2x2 grid */}
        <div className={styles.formGroup}>
          <label htmlFor="otp">OTP (Hardcoded: {HARDCODED_OTP})</label>
          <input
            type="text"
            id="otp"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
            className={formErrors.otp ? styles.inputError : ''}
          />
          {formErrors.otp && <span className={styles.errorText}>{formErrors.otp}</span>}
        </div>

        <button type="submit" className={styles.ctaButton}>Sign Up</button>
      </form>

      <div className={styles.loginPrompt}>
        Already have an account? <button onClick={handleLoginRedirect} className={styles.linkButton}>Log In</button>
      </div>
    </div>
    </div>
  );
};

export default SignUpForm;