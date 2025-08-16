// src/services/FeedbackService.js
import { collection, getDocs, updateDoc, doc, query, where, limit } from "firebase/firestore";
import { db } from "../firebase";

class FeedbackService {
    constructor() {
        this.feedbackCollectionRef = collection(db, "feedbacks");
    }

    async getFeedbacks() {
        try {
            const querySnapshot = await getDocs(this.feedbackCollectionRef);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error("Error fetching all feedbacks:", error);
            throw error;
        }
    }

    async updateFeedbackStatus(feedbackId, newStatus) {
        try {
            const feedbackDocRef = doc(db, "feedbacks", feedbackId);
            await updateDoc(feedbackDocRef, { status: newStatus });
            return true;
        } catch (error) {
            console.error(`Error updating feedback status for ${feedbackId}:`, error);
            throw error;
        }
    }

    async updateDisplayOnMarketing(feedbackId, displayStatus) {
        try {
            const feedbackDocRef = doc(db, "feedbacks", feedbackId);
            await updateDoc(feedbackDocRef, { displayOnMarketing: displayStatus });
            return true;
        } catch (error) {
            console.error(`Error updating displayOnMarketing for ${feedbackId}:`, error);
            throw error;
        }
    }

    // This method is for the public marketing website
    async getPublicFeaturedMarketingFeedbacks() {
    try {
        const q = query(
            this.feedbackCollectionRef,
            where("displayOnMarketing", "==", true),
            where("rating", "==", 5),
            limit(3)
        );
        const querySnapshot = await getDocs(q);
        const result = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        console.log(`[Marketing Website] Retrieved ${result.length} featured feedbacks`);
        return result;
    } catch (error) {
        console.error("Error fetching marketing feedbacks:", error);
        throw error;
    }
}
}

export default new FeedbackService();