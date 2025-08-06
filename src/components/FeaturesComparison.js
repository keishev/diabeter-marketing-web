// src/components/FeaturesComparison.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  const { premiumPrice, isLoading, error } = useFeaturesComparisonViewModel();

  const handleSignUpClick = () => {
    navigate('/signup');
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
          Diabeter offers flexible plans to fit your needs, whether you're just starting out or ready to unlock advanced insights.
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
            <button className={styles.ctaButton} onClick={handleSignUpClick}>{ctaText}</button>
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
            <button className={`${styles.ctaButton} ${styles.premiumButton}`} onClick={handleSignUpClick}>{ctaText}</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesComparison;