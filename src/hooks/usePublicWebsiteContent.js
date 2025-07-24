// src/hooks/usePublicWebsiteContent.js (in your PUBLIC marketing website project)
import { useState, useEffect } from 'react';
import { doc, getDoc, onSnapshot, collection, query, where, limit, getDocs } from 'firebase/firestore'; // Firestore functions
import { db } from '../firebase'; // Your initialized Firestore instance
import MarketingContentModel from '../Models/MarketingContentModel'; // Your content model
import FeedbackRepository from '../repositories/FeedbackRepository'; // Import FeedbackRepository

// IMPORTANT: Define sensible default content as a fallback.
// This is crucial. If fetching fails or content isn't loaded yet,
// your website won't break trying to access undefined properties.
const PUBLIC_DEFAULT_CONTENT = {
    headerLogoText: "DiaBeater",
    headerNavHome: "Home",
    headerNavFeatures: "Features",
    headerNavAbout: "About Us",
    headerNavContact: "Contact",
    headerCtaButton: "Sign Up",
    heroTitle: "Welcome to DiaBeater - Manage Your Diabetes Easily!",
    heroSubtitle: "Empowering you with tools for better health management.",
    heroCtaText: "Start Your Journey",
    featuresSectionTitle: "Key Features",
    feature1Title: "Personalized Meal Plans",
    feature1Description: "Get meal plans tailored to your dietary needs and health goals.",
    feature2Title: "Glucose Tracking & Analytics",
    feature2Description: "Monitor your glucose levels with intuitive graphs.",
    feature3Title: "Secure Data Storage",
    feature3Description: "Your health data is securely stored and accessible anytime.",
    feature4Title: "Direct Nutritionist Support",
    feature4Description: "Connect directly with certified nutritionists for expert advice.",
    testimonialsSectionTitle: "What Our Users Say",
    // IMPORTANT: Initialize testimonials as an empty array here
    // These will be overridden by fetched data, or used as fallback
    testimonials: [], // This will now hold the fetched testimonials
    nutritionistsSectionTitle: "Meet Our Expert Nutritionists",
    nutritionist1Name: "Dr. Emily White",
    nutritionist1Bio: "Specializing in diabetic nutrition.",
    nutritionist2Name: "Mark Johnson, RD",
    nutritionist2Bio: "A registered dietitian.",
    nutritionist3Name: "Sophia Chen, MPH",
    nutritionist3Bio: "Focuses on preventative care.",
    gamificationSectionTitle: "Stay Motivated!",
    gamificationDescription: "Earn points, unlock badges, and compete with friends.",
    gamificationFeature1: "Daily Challenges",
    gamificationFeature2: "Achievement Badges",
    gamificationFeature3: "Leaderboards",
    featuresComparisonTitle: "Basic vs. Premium Features",
    basicHeader: "Basic Plan",
    premiumHeader: "Premium Plan",
    basicFeatureList: ["Basic Glucose Tracking", "Standard Meal Ideas"], // Ensure arrays are initialized
    premiumFeatureList: ["Advanced Glucose Analytics", "Personalized Meal Plans"], // Ensure arrays are initialized
    comparisonCtaText: "Upgrade Now",
    downloadCTATitle: "Download DiaBeater Today!",
    downloadCTASubtitle: "Available on iOS and Android.",
    appStoreLink: "#",
    googlePlayLink: "#",
    footerAboutText: "DiaBeater is committed to providing innovative tools.",
    footerContactEmail: "info@diabeater.com",
    footerContactPhone: "(123) 456-7890",
    footerAddress: "123 Health Ave, Wellness City",
    footerCopyright: `© ${new Date().getFullYear()} DiaBeater. All rights reserved.`,
    footerPrivacyPolicy: "Privacy Policy",
    footerTermsOfService: "Terms of Service",
};


function usePublicWebsiteContent() {
    const [content, setContent] = useState(PUBLIC_DEFAULT_CONTENT);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const marketingDocRef = doc(db, "marketingWebsite", "currentContent");
        let isMounted = true; // Flag to handle component unmounting gracefully

        // Function to fetch all necessary content
        const fetchAllContent = async () => {
            setLoading(true); // Set loading true at the start of fetch
            try {
                // 1. Fetch general marketing content
                const docSnap = await getDoc(marketingDocRef);
                let fetchedMarketingContent = PUBLIC_DEFAULT_CONTENT; // Start with default

                if (docSnap.exists()) {
                    fetchedMarketingContent = new MarketingContentModel(docSnap.data());
                } else {
                    console.warn("Public marketing content document not found. Using default fallback.");
                }

                // 2. Fetch featured testimonials using the repository
                const fetchedTestimonials = await FeedbackRepository.getFeaturedMarketingFeedbacks();
                console.log("Fetched testimonials from Firebase (usePublicWebsiteContent.js):", fetchedTestimonials); // ADDED LOG

                if (isMounted) {
                    // Combine all fetched data
                    const combinedContent = {
                        ...fetchedMarketingContent,
                        testimonials: fetchedTestimonials, // Add the fetched testimonials array
                    };
                    setContent(combinedContent);
                    setError(null);
                }
            } catch (err) {
                console.error("Error fetching public website content (usePublicWebsiteContent.js):", err); // MODIFIED LOG
                console.error("Full error object (usePublicWebsiteContent.js):", JSON.stringify(err, Object.getOwnPropertyNames(err))); // ADDED DETAILED LOG
                if (isMounted) {
                    setError("Failed to load website content. Please try again.");
                    // Fallback to default, but ensure testimonials is an empty array
                    setContent({
                        ...PUBLIC_DEFAULT_CONTENT,
                        testimonials: [],
                    });
                }
            } finally {
                if (isMounted) {
                    setLoading(false); // Set loading false after fetch completes (or errors)
                }
            }
        };

        fetchAllContent(); // Call the one-time fetch function

        // --- Option B: Real-time listener for main content (Uncomment if needed) ---
        // This is for the `marketingWebsite/currentContent` document.
        // For testimonials, you'll likely want to stick to one-time fetch or a separate real-time listener if performance allows.
        /*
        const unsubscribeContent = onSnapshot(marketingDocRef, (docSnap) => {
            if (isMounted) {
                let fetchedMarketingContent = PUBLIC_DEFAULT_CONTENT;
                if (docSnap.exists()) {
                    fetchedMarketingContent = new MarketingContentModel(docSnap.data());
                } else {
                    console.warn("Public marketing content document does not exist. Using default fallback.");
                }

                // If using real-time for main content, you might also want to refetch testimonials here
                // or have a separate real-time listener for testimonials as well.
                // For simplicity and avoiding double-listening issues, sticking to one-time fetch for testimonials.
                // Or you could implement a dedicated onSnapshot for testimonials as well.
                FeedbackRepository.getFeaturedMarketingFeedbacks().then(fetchedTestimonials => {
                    setContent(prevContent => ({
                        ...fetchedMarketingContent, // Take the latest general content
                        testimonials: fetchedTestimonials, // Take the latest testimonials
                    }));
                    setError(null);
                    setLoading(false);
                }).catch(err => {
                    console.error("Error real-time fetching marketing feedbacks:", err);
                    if (isMounted) {
                        setError("Failed to load real-time content updates.");
                        setLoading(false);
                    }
                });
            }
        }, (err) => {
            console.error("Error listening to public marketing content changes:", err);
            if (isMounted) {
                setError("Failed to load real-time content updates.");
                setContent(PUBLIC_DEFAULT_CONTENT); // Fallback on error
                setLoading(false);
            }
        });
        */

        // Cleanup function for useEffect: This runs when the component using this hook is removed.
        return () => {
            isMounted = false; // Prevent state updates on unmounted component
            // If you chose Option B (real-time listener), uncomment the line below to stop listening:
            // if (unsubscribeContent) {
            //     unsubscribeContent();
            // }
        };
    }, []); // Empty dependency array means this effect runs once after the initial render

    return { content, loading, error };
}

export default usePublicWebsiteContent;