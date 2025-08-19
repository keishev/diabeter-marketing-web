// src/components/FeaturesComparison.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import styles from '../styles/FeaturesComparison.module.css';
import useFeaturesComparisonViewModel from '../viewmodels/featuresComparisonViewModel';

const FeaturesComparison = ({
  title,
  basicHeader,
  premiumHeader,
  basicFeatureList = [],
  premiumFeatureList = [],
  ctaText
}) => {
  const navigate = useNavigate();
  const auth = getAuth();
  const { premiumPrice, isLoading, error } = useFeaturesComparisonViewModel();

  const handleBasicSignUpClick = () => {
    navigate('/signup');
  };

  const handlePremiumSignUpClick = () => {
    const user = auth.currentUser;
    if (user) {
      // User is logged in, go directly to checkout
      navigate('/checkout');
    } else {
      // User not logged in, redirect to login with checkout intent
      navigate('/login', { state: { redirectTo: '/checkout' } });
    }
  };

  const renderPrice = () => {
    if (isLoading) {
      return 'Loading...';
    }
    if (error) {
      return 'Error loading price';
    }
    return premiumPrice ? `$${premiumPrice}/month` : 'Contact Us';
  };

  return (
    <section id="features-comparison" className={`${styles.featuresComparisonSection} section-light`}>
      <div className={styles.container}>
        <h2 className={styles.sectionHeading}>{title}</h2>
        <p className={styles.sectionDescription}>
          Diabeater offers two plans to suit your needs. Compare the features below to find the right fit for you.
        </p>
        <div className={styles.comparisonGrid}>
          {/* Basic Plan Card */}
          <div className={styles.planCard}>
            <h3 className={styles.planTitle}>{basicHeader}</h3>
            <p className={styles.planPrice}>Free</p>
            <ul className={styles.featureList}>
              {basicFeatureList.map((item, index) => (
                <li className={styles.featureItem} key={`basic-feat-${index}`}>✔️ {item}</li>
              ))}
            </ul>
            <button className={styles.ctaButton} onClick={handleBasicSignUpClick}>{ctaText}</button>
          </div>
          {/* Premium Plan Card */}
          <div className={styles.planCard}>
            <h3 className={styles.planTitle}>{premiumHeader}</h3>
            <p className={styles.planPrice}>{renderPrice()}</p>
            <ul className={styles.featureList}>
              {premiumFeatureList.map((item, index) => (
                <li className={styles.featureItem} key={`premium-feat-${index}`}>{item.startsWith('✨') || item.startsWith('✔️') ? '' : '✔️ '}{item}</li>
              ))}
            </ul>
            <button className={`${styles.ctaButton} ${styles.premiumButton}`} onClick={handlePremiumSignUpClick}>
              Get Premium
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesComparison;