// src/components/LoginForm.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import styles from '../styles/LoginForm.module.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();

  // Get the redirect path from the navigation state
  const redirectTo = location.state?.redirectTo || '/';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [loginMessage, setLoginMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) {
      setFormErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
    setLoginMessage('');
  };

  const validateForm = () => {
    let errors = {};
    const { email, password } = formData;

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    if (!password) {
      errors.password = 'Password is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginMessage('');
    setIsLoading(true);

    if (validateForm()) {
      try {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        setLoginMessage('Login successful! Redirecting...');
        setTimeout(() => {
          navigate(redirectTo);
        }, 1500);
      } catch (error) {
        console.error('Login error:', error);
        setLoginMessage('Invalid email or password.');
      }
    }
    setIsLoading(false);
  };

  const handleSignUpRedirect = () => {
    navigate('/signup');
  };

  return (
     <div className={styles.pageBackground}>
    <div className={styles.formContainer}>
      <h2>Login to Diabeater </h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.gridInputs}>
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
            <label htmlFor="password">Password</label>
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
        </div>

        {loginMessage && (
          <div className={`${styles.message} ${loginMessage.includes('successful') ? styles.successMessage : styles.errorMessage}`}>
            {loginMessage}
          </div>
        )}

        <button type="submit" className={styles.ctaButton} disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className={styles.signupPrompt}>
        Don't have an account? <button onClick={handleSignUpRedirect} className={styles.linkButton}>Sign Up</button>
      </div>
    </div>
    </div>
  );
};

export default LoginForm;