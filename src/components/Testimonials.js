// marketing-website-react-app/src/components/Testimonials.js
import React, { useState } from 'react';
import styles from '../styles/Testimonials.module.css'; // Path is relative to Testimonials.js

// Helper function to render stars
const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars.push(<span key={i} className={styles.starFilled}>&#9733;</span>); // Filled star
        } else {
            stars.push(<span key={i} className={styles.starEmpty}>&#9734;</span>); // Empty star
        }
    }
    return <div className={styles.starsContainer}>{stars}</div>;
};

const Testimonials = ({
    sectionTitle,
    testimonial1, // Expects an object { text, author, rating }
    testimonial2, // Expects an object { text, author, rating }
    testimonial3  // Expects an object { text, author, rating }
}) => {
    // Create an array from the passed props for easier carousel management
    // Ensure to include the 'rating' property in the filter if it's mandatory
    const testimonialsToDisplay = [
        testimonial1,
        testimonial2,
        testimonial3
    ].filter(t => t && t.text && t.author && typeof t.rating === 'number'); // Filter out any undefined/incomplete ones

    const [activeIndex, setActiveIndex] = useState(0);

    const goToPrevious = () => {
        setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : testimonialsToDisplay.length - 1));
    };

    const goToNext = () => {
        setActiveIndex((prevIndex) => (prevIndex < testimonialsToDisplay.length - 1 ? prevIndex + 1 : 0));
    };

    if (testimonialsToDisplay.length === 0) {
        return null; // Don't render if no testimonials are available
    }

    return (
        <section id="testimonials" className={styles.testimonialsSection}>
            <h2 className={styles.sectionHeading}>{sectionTitle}</h2>
            <div className={styles.carouselContainer}>
                <button onClick={goToPrevious} className={`${styles.carouselButton} ${styles.prevButton}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                </button>
                <div className={styles.testimonialWrapper}>
                    {testimonialsToDisplay.map((testimonial, index) => {
                        const relativePosition = index - activeIndex;

                        let leftValue = '50%';
                        let scale = 0.75;
                        let opacity = 0.3;
                        let brightness = 0.5;
                        let zIndex = 1;

                        if (relativePosition === 0) {
                            leftValue = '50%';
                            scale = 1;
                            opacity = 1;
                            brightness = 1;
                            zIndex = 3;
                        } else if (relativePosition === -1 || (relativePosition === testimonialsToDisplay.length -1 && activeIndex === 0)) { // handles wrap-around to left
                            leftValue = '0%';
                            scale = 0.85;
                            opacity = 0.7;
                            brightness = 0.7;
                            zIndex = 2;
                        } else if (relativePosition === 1 || (relativePosition === -(testimonialsToDisplay.length -1) && activeIndex === testimonialsToDisplay.length - 1)) { // handles wrap-around to right
                            leftValue = '100%';
                            scale = 0.85;
                            opacity = 0.7;
                            brightness = 0.7;
                            zIndex = 2;
                        } else if (relativePosition < -1 || relativePosition > 1) { // Hide elements further away
                            leftValue = relativePosition < -1 ? '-50%' : '150%';
                            opacity = 0;
                        }
                        // For more than 3, the opacity 0 will ensure they're hidden.

                        return (
                            <div
                                key={testimonial.id || `testimonial-${index}`} // Use testimonial.id if available, otherwise a generated key
                                className={styles.testimonialItem}
                                style={{
                                    left: leftValue,
                                    transform: `translate(-50%, -50%) scale(${scale})`,
                                    opacity: opacity,
                                    filter: `brightness(${brightness})`,
                                    zIndex: zIndex,
                                }}
                            >
                                <p className={styles.testimonialText}>"{testimonial.text}"</p>
                                {testimonial.rating && renderStars(testimonial.rating)} {/* Render stars if rating exists */}
                                <cite className={styles.testimonialAuthor}>- {testimonial.author}</cite>
                            </div>
                        );
                    })}
                </div>
                <button onClick={goToNext} className={`${styles.carouselButton} ${styles.nextButton}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>
            </div>
            <div className={styles.carouselIndicators}>
                {testimonialsToDisplay.map((_, index) => (
                    <span
                        key={index}
                        className={`${styles.indicator} ${index === activeIndex ? styles.active : ''}`}
                        onClick={() => setActiveIndex(index)}
                    ></span>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;