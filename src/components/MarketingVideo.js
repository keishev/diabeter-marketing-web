// src/components/MarketingVideo.js
import React, { useEffect } from 'react';
import styles from '../styles/Home.module.css';

const MarketingVideo = ({ title, videoUrl }) => {
    useEffect(() => {
        // Add hover effects to video iframe
        const iframe = document.querySelector(`.${styles.responsiveIframe}`);
        if (iframe) {
            const handleMouseEnter = function() {
                this.style.transform = 'scale(1.02)';
                this.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.15)';
            };

            const handleMouseLeave = function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            };

            iframe.addEventListener('mouseenter', handleMouseEnter);
            iframe.addEventListener('mouseleave', handleMouseLeave);

            // Cleanup
            return () => {
                iframe.removeEventListener('mouseenter', handleMouseEnter);
                iframe.removeEventListener('mouseleave', handleMouseLeave);
            };
        }
    }, []);

    if (!videoUrl || typeof videoUrl !== 'string') {
        return null; 
    }

    const embedUrl = videoUrl.replace("watch?v=", "embed/");

    return (
        <section className={styles.videoSection}>
            <h2>{title}</h2>
            <div className={styles.videoContainer}>
                <iframe
                    className={styles.responsiveIframe}
                    src={embedUrl}
                    title={title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </section>
    );
};

export default MarketingVideo;