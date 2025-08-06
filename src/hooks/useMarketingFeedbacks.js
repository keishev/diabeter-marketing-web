// src/hooks/useMarketingFeedbacks.js
import { useState, useEffect } from 'react';
import FeedbackService from '../services/FeedbackService'; 

const useMarketingFeedbacks = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const fetchedTestimonials = await FeedbackService.getPublicFeaturedMarketingFeedbacks();
                console.log('Fetched Testimonials:', fetchedTestimonials); // Add this line
                setTestimonials(fetchedTestimonials);
            } catch (err) {
                setError(err);
                console.error("Failed to fetch marketing testimonials:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    return { testimonials, loading, error };
};

export default useMarketingFeedbacks;