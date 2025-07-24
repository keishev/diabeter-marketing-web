// marketing-website-react-app/src/services/FeedbackService.js

import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "../firebase"; // Your initialized Firestore instance

class FeedbackService {
    constructor() {
        this.feedbackCollectionRef = collection(db, "feedbacks"); // Confirmed this is correct
    }

    /**
     * Fetches up to 3 feedbacks that match the current data structure:
     * have a 5-star rating, displayOnMarketing is false, and status is "Inbox".
     * @returns {Array} An array of feedback objects.
     */
    async getMarketingFeedbacks() {
        try {
            // Construct the query to filter feedbacks
            const q = query(
                this.feedbackCollectionRef,
                where("displayOnMarketing", "==", false), // CHANGED: To match your current data
                where("rating", "==", 5),                 // Confirmed matches your data
                where("status", "==", "Inbox"),           // CHANGED: To match your current data
                limit(3)                                  // Limit to the first 3 matching testimonials
            );

            const querySnapshot = await getDocs(q); // Execute the query

            // Map the document snapshots to an array of objects
            return querySnapshot.docs.map(doc => ({
                id: doc.id, // Include the document ID for React keys if needed
                ...doc.data() // Spread all other fields from the document
            }));
        } catch (error) {
            console.error("Error fetching marketing feedbacks:", error);
            // Re-throw the error so it can be caught by the calling hook/component
            throw error;
        }
    }
}

// Export an instance of the class
export default new FeedbackService();