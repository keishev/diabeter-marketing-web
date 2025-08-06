// src/components/MarketingVideo.js
import React from 'react';
import styles from '../styles/Home.module.css';

const MarketingVideo = ({ title, videoUrl }) => {
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