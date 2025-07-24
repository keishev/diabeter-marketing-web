// src/components/Nutritionists.js
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
        <section id="nutritionists" className="section-padded">
            <h2>{sectionTitle}</h2> {/* Use prop */}
            <p>
                {/* You could add a 'description' prop for this text if you want it dynamic */}
                Our team of experienced and certified nutritionists is dedicated to helping you achieve your health goals. They provide one-on-one support and create meal plans designed specifically for your unique requirements.
            </p>
            <div className={styles.nutritionistProfiles}>
                {nutritionistsToDisplay.map((nutritionist, index) => (
                    <div className={styles.nutritionistCard} key={index}> {/* Use index as key if no unique ID */}
                        {/* Assuming images are still hardcoded or handled differently, e.g., in CSS */}
                        <img src={`/images/placeholder-nutritionist${index + 1}.jpg`} alt={`${nutritionist.name} Profile`} /> {/* Example: Dynamic image based on index */}
                        <h3>{nutritionist.name}</h3> {/* Use prop */}
                        <p>Specialization: {nutritionist.bio}</p> {/* Use prop (assuming 'bio' is used for specialization here) */}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Nutritionists;