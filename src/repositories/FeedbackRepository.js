// src/repositories/FeedbackRepository.js
import feedbackServiceInstance from '../services/FeedbackService'; 

class FeedbackRepository {
    async getFeaturedMarketingFeedbacks() {
        // Corrected method name to match the service file
        return feedbackServiceInstance.getPublicFeaturedMarketingFeedbacks();
    }
}

export default new FeedbackRepository();