// src/components/Gamification.js
import React from 'react';
import styles from '../styles/Gamification.module.css';

// Accept props here
const Gamification = ({ sectionTitle, description, feature1, feature2, feature3 }) => {
    return (
        <section id="gamification" className={`${styles.gamificationSection} section-light`}>
            <div className={styles.contentWrapper}>
                <div className={styles.imageColumn}>
                    <img
                        src="/images/placeholder-gamification-screenshot.png"
                        alt="Gamification Character"
                        className={styles.gamificationCharacter}
                    />
                </div>

                <div className={styles.textColumn}>
                    <h2 className={styles.sectionHeading}>{sectionTitle}</h2> {/* Use prop */}
                    <p className={styles.sectionDescription}>{description}</p> {/* Use prop */}
                    <ul className={styles.gamificationList}>
                        <li>{feature1}</li> {/* Use prop */}
                        <li>{feature2}</li> {/* Use prop */}
                        <li>{feature3}</li> {/* Use prop */}
                        {/* If you want more features, you'd need to add more featureX props or pass an array */}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Gamification;