import React, { useRef } from 'react';
import styles from '../styles/Features.module.css';

// Accept the props including video paths
const Features = ({ 
    sectionTitle, 
    feature1, 
    feature2, 
    feature3, 
    feature4,
    // Video props for each feature
    feature1Video = '/videos/feature1.mp4',
    feature2Video = '/videos/feature2.mp4', 
    feature3Video = '/videos/feature3.mp4',
    feature4Video = '/videos/feature4.mp4'
}) => {
    // Create refs for each video
    const video1Ref = useRef(null);
    const video2Ref = useRef(null);
    const video3Ref = useRef(null);
    const video4Ref = useRef(null);

    // Handle mouse enter - play video
    const handleMouseEnter = (videoRef) => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    // Handle mouse leave - pause video and reset
    const handleMouseLeave = (videoRef) => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <section id="features" className={styles.featuresSection}>
            <h2 className={styles.sectionHeading}>{sectionTitle}</h2>
            <div className={styles.featureGrid}>
                
                {/* Feature 1 */}
                <div 
                    className={styles.featureItem}
                    onMouseEnter={() => handleMouseEnter(video1Ref)}
                    onMouseLeave={() => handleMouseLeave(video1Ref)}
                >
                    <video
                        ref={video1Ref}
                        className={styles.featureVideo}
                        src={feature1Video}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                    />
                    <div className={styles.featureContent}>
                        <div className={styles.featureIcon}>
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="#f79554"/>
                            </svg>
                        </div>
                        <h3>{feature1.title}</h3>
                        <p className={styles.featureDescription}>{feature1.description}</p>
                    </div>
                </div>

                {/* Feature 2 */}
                <div 
                    className={styles.featureItem}
                    onMouseEnter={() => handleMouseEnter(video2Ref)}
                    onMouseLeave={() => handleMouseLeave(video2Ref)}
                >
                    <video
                        ref={video2Ref}
                        className={styles.featureVideo}
                        src={feature2Video}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                    />
                    <div className={styles.featureContent}>
                        <div className={styles.featureIcon}>
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM17 12H7V10H17V12ZM15 16H7V14H15V16ZM17 8H7V6H17V8Z" fill="#f79554"/>
                            </svg>
                        </div>
                        <h3>{feature2.title}</h3>
                        <p className={styles.featureDescription}>{feature2.description}</p>
                    </div>
                </div>

                {/* Feature 3 */}
                <div 
                    className={styles.featureItem}
                    onMouseEnter={() => handleMouseEnter(video3Ref)}
                    onMouseLeave={() => handleMouseLeave(video3Ref)}
                >
                    <video
                        ref={video3Ref}
                        className={styles.featureVideo}
                        src={feature3Video}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                    />
                    <div className={styles.featureContent}>
                        <div className={styles.featureIcon}>
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="#f79554"/>
                            </svg>
                        </div>
                        <h3>{feature3.title}</h3>
                        <p className={styles.featureDescription}>{feature3.description}</p>
                    </div>
                </div>

                {/* Feature 4 */}
                <div 
                    className={styles.featureItem}
                    onMouseEnter={() => handleMouseEnter(video4Ref)}
                    onMouseLeave={() => handleMouseLeave(video4Ref)}
                >
                    <video
                        ref={video4Ref}
                        className={styles.featureVideo}
                        src={feature4Video}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                    />
                    <div className={styles.featureContent}>
                        <div className={styles.featureIcon}>
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 11H7V9H9V11ZM13 11H11V9H13V11ZM17 11H15V9H17V11ZM19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V9H19V20Z" fill="#f79554"/>
                            </svg>
                        </div>
                        <h3>{feature4.title}</h3>
                        <p className={styles.featureDescription}>{feature4.description}</p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Features;