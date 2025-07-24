// src/components/FeaturesComparison.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/FeaturesComparison.module.css';

// Accept props here
const FeaturesComparison = ({
    title,
    basicHeader,
    premiumHeader,
    basicFeatureList = [], // Default to empty array for safety
    premiumFeatureList = [], // Default to empty array for safety
    ctaText // This can be used for both "Get Started" and "Upgrade Now"
}) => {
    const navigate = useNavigate();

    const handleSignUpClick = () => {
        navigate('/signup');
    };

    return (
        <section id="features-comparison" className={`${styles.featuresComparisonSection} section-light`}>
            <div className={styles.container}>
                <h2 className={styles.sectionHeading}>{title}</h2> {/* Use prop */}
                <p className={styles.sectionDescription}>
                    {/* You could add a 'description' prop if you want this text dynamic */}
                    Diabeter offers flexible plans to fit your needs, whether you're just starting out or ready to unlock advanced insights.
                </p>

                <div className={styles.comparisonGrid}>
                    {/* Basic Plan Card */}
                    <div className={styles.planCard}>
                        <h3 className={styles.planTitle}>{basicHeader}</h3> {/* Use prop */}
                        <p className={styles.planPrice}>Free</p> {/* This could be a prop: basicPrice */}
                        <ul className={styles.featureList}>
                            {basicFeatureList.map((item, index) => (
                                <li className={styles.featureItem} key={`basic-feat-${index}`}>✔️ {item}</li>
                            ))}
                        </ul>
                        <button className={styles.ctaButton} onClick={handleSignUpClick}>{ctaText}</button> {/* Use prop */}
                    </div>

                    {/* Premium Plan Card */}
                    <div className={styles.planCard}>
                        <h3 className={styles.planTitle}>{premiumHeader}</h3> {/* Use prop */}
                        <p className={styles.planPrice}>Starting at $X/month</p> {/* This could be a prop: premiumPrice */}
                        <ul className={styles.featureList}>
                            {premiumFeatureList.map((item, index) => (
                                <li className={styles.featureItem} key={`premium-feat-${index}`}>{item.startsWith('✨') || item.startsWith('✔️') ? '' : '✔️ '}{item}</li>
                            ))}
                        </ul>
                        <button className={`${styles.ctaButton} ${styles.premiumButton}`} onClick={handleSignUpClick}>{ctaText}</button> {/* Use prop */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesComparison;