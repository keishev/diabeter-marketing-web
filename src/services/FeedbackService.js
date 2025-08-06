import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "../firebase";

class FeedbackService {
    constructor() {
        this.feedbackCollectionRef = collection(db, "feedbacks");
    }

    async getInboxFeedbacksForAdmin() {
        try {
            const q = query(
                this.feedbackCollectionRef,
                where("displayOnMarketing", "==", false),
                where("rating", "==", 5),
                where("status", "==", "Inbox"),
                limit(3)
            );
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error("Error fetching inbox marketing feedbacks:", error);
            throw error;
        }
    }

    async getPublicFeaturedMarketingFeedbacks() {
        try {
            const q = query(
                this.feedbackCollectionRef,
                where("displayOnMarketing", "==", true),
                where("rating", "==", 5),
                where("status", "==", "Approved"),
                limit(3)
            );
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error("Error fetching public featured marketing feedbacks:", error);
            throw error;
        }
    }
}
export default new FeedbackService();