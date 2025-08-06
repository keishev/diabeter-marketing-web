// src/usePublicWebsiteContent.js

import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import MarketingContentModel from '../Models/MarketingContentModel';
import FeedbackRepository from '../repositories/FeedbackRepository';

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
    
    marketingVideoTitle: "Our Story",
    youtubeVideoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",

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
    testimonials: [],
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
    basicFeatureList: ["Basic Glucose Tracking", "Standard Meal Ideas"],
    premiumFeatureList: ["Advanced Glucose Analytics", "Personalized Meal Plans"],
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

        const unsubscribe = onSnapshot(marketingDocRef, async (docSnap) => {
            try {
                let fetchedMarketingContent = docSnap.exists()
                    ? new MarketingContentModel(docSnap.data())
                    : PUBLIC_DEFAULT_CONTENT;

                // Fetch testimonials separately
                const fetchedTestimonials = await FeedbackRepository.getFeaturedMarketingFeedbacks();
                console.log("Fetched testimonials:", fetchedTestimonials);

                const combinedContent = {
                    ...fetchedMarketingContent,
                    testimonials: fetchedTestimonials,
                };
                setContent(combinedContent);
                setError(null);
            } catch (err) {
                console.error("Error fetching public website content:", err);
                setError("Failed to load website content. Please try again.");
                setContent({
                    ...PUBLIC_DEFAULT_CONTENT,
                    testimonials: [],
                });
            } finally {
                setLoading(false);
            }
        }, (err) => {
            console.error("Error with Firestore snapshot listener:", err);
            setError("Failed to stream real-time updates. Check your connection.");
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { content, loading, error };
}

export default usePublicWebsiteContent;