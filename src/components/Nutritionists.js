import React from 'react';
import styles from '../styles/Nutritionists.module.css';

// Accept props here
const Nutritionists = ({
    sectionTitle,
    nutritionist1, // Expects an object { name, bio }
    nutritionist2, // Expects an object { name, bio }
    nutritionist3  // Expects an object { name, bio }
}) => {
    // Create an array from the passed props for easier mapping
    const nutritionistsToDisplay = [
        nutritionist1,
        nutritionist2,
        nutritionist3
    ].filter(n => n && n.name && n.bio); // Filter out any undefined/incomplete ones

    return (
        <section id="nutritionists" className={styles.nutritionistsSection}>
            <div className={styles.container}>
                <h2 className={styles.sectionHeading}>{sectionTitle}</h2>
                <p className={styles.sectionDescription}>
                    Our team of experienced and certified nutritionists is dedicated to helping you achieve your health goals. They provide one-on-one support and create meal plans designed specifically for your unique requirements.
                </p>
                <div className={styles.nutritionistProfiles}>
                    {nutritionistsToDisplay.map((nutritionist, index) => (
                        <div className={styles.nutritionistCard} key={index}>
                            <div className={styles.imageWrapper}>
                                <img 
                                    src={`/images/placeholder-nutritionist${index + 1}.jpg`} 
                                    alt={`${nutritionist.name} Profile`} 
                                    className={styles.nutritionistImage}
                                />
                                <div className={styles.certificationBadge}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
                                    </svg>
                                </div>
                            </div>
                            <div className={styles.nutritionistInfo}>
                                <h3 className={styles.nutritionistName}>{nutritionist.name}</h3>
                                <p className={styles.specialization}>Specialization: {nutritionist.bio}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Nutritionists;