import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { SubscriptionService } from '../services/subscriptionService';
import styles from '../styles/PaymentCheckoutPage.module.css';

const PaymentCheckoutPage = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checkingPremium, setCheckingPremium] = useState(true);
  const [hasPremium, setHasPremium] = useState(false);
  const [needsLogin, setNeedsLogin] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    nameOnCard: '',
    cvv: '',
    expiryMonth: '',
    expiryYear: ''
  });

  // Check premium status when component mounts
  useEffect(() => {
    const checkPremiumStatus = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          // User not authenticated, need them to login first to check premium status
          setNeedsLogin(true);
          setCheckingPremium(false);
          return;
        }

        const premiumStatus = await SubscriptionService.checkUserPremiumStatus(user.uid);
        if (premiumStatus.hasPremium) {
          setHasPremium(true);
          setError('You have an existing plan already');
        }
      } catch (err) {
        console.error('Error checking premium status:', err);
        setError('Error checking your account status. Please try again.');
      } finally {
        setCheckingPremium(false);
      }
    };

    checkPremiumStatus();
  }, [auth]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData(prev => ({
      ...prev,
      cardNumber: formatted
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = auth.currentUser;
      if (!user) {
        setError('Please log in to continue with payment');
        return;
      }

      // Validate form
      if (!formData.cardNumber || !formData.nameOnCard || !formData.cvv || !formData.expiryMonth || !formData.expiryYear) {
        setError('Please fill in all payment details');
        return;
      }

      // Prepare payment data
      const paymentData = {
        cardNumber: formData.cardNumber,
        nameOnCard: formData.nameOnCard,
        cvv: formData.cvv,
        expiry: `${formData.expiryMonth}/${formData.expiryYear}`,
        amount: 9.99
      };

      // Process premium upgrade using the service
      const result = await SubscriptionService.processPremiumUpgrade(user.uid, paymentData);

      if (result.success) {
        alert(`Payment successful! You are now a premium member. Your partner code is: ${result.partnerCode}`);
        navigate('/');
      }

    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = async () => {
    try {
      // Sign out the current user to clear the session
      await signOut(auth);

      // Navigate to home page
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      navigate('/');
    }
  };

  // Show loading state while checking premium status
  if (checkingPremium) {
    return (
      <div className={styles.checkoutContainer}>
        <div className={styles.checkoutCard}>
          <h1 className={styles.title}>Checking Your Account...</h1>
          <div className={styles.loadingMessage}>
            <p>Please wait while we verify your premium status...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show existing plan message if user already has premium
  if (hasPremium) {
    return (
      <div className={styles.checkoutContainer}>
        <div className={styles.checkoutCard}>
          <h1 className={styles.title}>Premium Member</h1>
          <div className={styles.existingPlanMessage}>
            <div className={styles.premiumBadge}>✨ Premium Active</div>
            <p className={styles.existingPlanText}>
              You have an existing plan already
            </p>
            <p className={styles.existingPlanSubtext}>
              You're all set! Enjoy your premium features in the app.
            </p>
            <button
              className={styles.backButton}
              onClick={handleBackToHome}
            >
              Back to Home
            </button>
            <p className={styles.sessionNote}>
              Note: Clicking "Back to Home" will log you out so you can sign in with a different account if needed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated and checkingPremium is false
  if (needsLogin) {
    return (
      <div className={styles.checkoutContainer}>
        <div className={styles.checkoutCard}>
          <h1 className={styles.title}>Authentication Required</h1>
          <div className={styles.loginMessage}>
            <p>Please log in to your account to access the premium features.</p>
            <button
              className={styles.loginButton}
              onClick={() => navigate('/login')}
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.checkoutCard}>
        <h1 className={styles.title}>Complete Your Purchase</h1>

        <form onSubmit={handleSubmit} className={styles.paymentForm}>
          <h3>Payment Details</h3>

          <div className={styles.formGroup}>
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleCardNumberChange}
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="nameOnCard">Name on Card</label>
            <input
              type="text"
              id="nameOnCard"
              name="nameOnCard"
              value={formData.nameOnCard}
              onChange={handleInputChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="expiryMonth">Expiry Month</label>
              <select
                id="expiryMonth"
                name="expiryMonth"
                value={formData.expiryMonth}
                onChange={handleInputChange}
                required
              >
                <option value="">Month</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                    {String(i + 1).padStart(2, '0')}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="expiryYear">Expiry Year</label>
              <select
                id="expiryYear"
                name="expiryYear"
                value={formData.expiryYear}
                onChange={handleInputChange}
                required
              >
                <option value="">Year</option>
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i} value={String(new Date().getFullYear() + i)}>
                    {new Date().getFullYear() + i}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                placeholder="123"
                maxLength="4"
                required
              />
            </div>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Complete Payment'}
          </button>
        </form>

        <div className={styles.securityNote}>
          <p>🔒 Your payment information is secure and encrypted</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCheckoutPage;
