// marketing-website-react-app/src/repositories/FeedbackRepository.js
// Make sure to create the 'repositories' folder or adjust this path
import feedbackServiceInstance from '../services/FeedbackService'; // Changed import name to reflect it's an instance

class FeedbackRepository {
    async getFeaturedMarketingFeedbacks() {
        // Call the method directly on the imported instance
        return feedbackServiceInstance.getMarketingFeedbacks();
    }
}

export default new FeedbackRepository();