// src/components/Gamification.js
import React from 'react';
import styles from '../styles/Gamification.module.css';

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
                    <h2 className={styles.sectionHeading}>{sectionTitle}</h2>
                    <p className={styles.sectionDescription}>{description}</p>
                    <ul className={styles.gamificationList}>
                        <li>{feature1}</li>
                        <li>{feature2}</li>
                        <li>{feature3}</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Gamification;