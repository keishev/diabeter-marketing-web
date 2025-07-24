// src/components/Features.js
import React from 'react';
// import styles from '../styles/Features.module.css'; // If you use CSS Modules

// Accept the props
const Features = ({ sectionTitle, feature1, feature2, feature3, feature4 }) => {
    return (
        <section id="features" /* Add ID for internal linking */ className="features-section">
            <h2>{sectionTitle}</h2>
            <div className="feature-grid">
                <div className="feature-item">
                    <h3>{feature1.title}</h3>
                    <p>{feature1.description}</p>
                </div>
                <div className="feature-item">
                    <h3>{feature2.title}</h3>
                    <p>{feature2.description}</p>
                </div>
                <div className="feature-item">
                    <h3>{feature3.title}</h3>
                    <p>{feature3.description}</p>
                </div>
                <div className="feature-item">
                    <h3>{feature4.title}</h3>
                    <p>{feature4.description}</p>
                </div>
            </div>
        </section>
    );
};

export default Features;