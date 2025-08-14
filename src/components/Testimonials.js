// marketing-website-react-app/src/components/Testimonials.js
import React from 'react';
import styles from '../styles/Testimonials.module.css';

// Helper function to render stars
const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars.push(<span key={i} className={styles.starFilled}>★</span>);
        } else {
            stars.push(<span key={i} className={styles.starEmpty}>☆</span>);
        }
    }
    return <div className={styles.starsContainer}>{stars}</div>;
};

const Testimonials = ({ sectionTitle, testimonials }) => {
    // Filter valid testimonials
    const testimonialsToDisplay = testimonials ? testimonials.filter(t => t && t.message && t.userFirstName && typeof t.rating === 'number') : [];

    // Create placeholder testimonials if we don't have 3
    const placeholderTestimonials = [
        {
            id: 'placeholder-1',
            message: '',
            userFirstName: '',
            rating: 0,
            isPlaceholder: true
        },
        {
            id: 'placeholder-2', 
            message: '',
            userFirstName: '',
            rating: 0,
            isPlaceholder: true
        },
        {
            id: 'placeholder-3',
            message: '',
            userFirstName: '',
            rating: 0,
            isPlaceholder: true
        }
    ];

    // Use real testimonials if available, otherwise use placeholders
    const displayTestimonials = testimonialsToDisplay.length > 0 ? testimonialsToDisplay.slice(0, 3) : placeholderTestimonials;

    // Fill remaining slots with placeholders if we have fewer than 3 real testimonials
    while (displayTestimonials.length < 3) {
        displayTestimonials.push({
            id: `placeholder-${displayTestimonials.length + 1}`,
            message: '',
            userFirstName: '',
            rating: 0,
            isPlaceholder: true
        });
    }

    return (
        <section id="testimonials" className={styles.testimonialsSection}>
            <h2 className={styles.sectionHeading}>{sectionTitle}</h2>
            <div className={styles.testimonialsGrid}>
                {displayTestimonials.map((testimonial, index) => (
                    <div
                        key={testimonial.id || `testimonial-${index}`}
                        className={`${styles.testimonialCard} ${testimonial.isPlaceholder ? styles.placeholderCard : ''}`}
                    >
                        {!testimonial.isPlaceholder ? (
                            <>
                                <p className={styles.testimonialText}>"{testimonial.message}"</p>
                                {testimonial.rating && renderStars(testimonial.rating)}
                                <cite className={styles.testimonialAuthor}>- {testimonial.userFirstName}</cite>
                            </>
                        ) : (
                            <div className={styles.placeholderContent}>
                                <div className={styles.placeholderText}></div>
                                <div className={styles.placeholderStars}></div>
                                <div className={styles.placeholderAuthor}></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;