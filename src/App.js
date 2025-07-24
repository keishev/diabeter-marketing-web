// src/App.js (in your PUBLIC marketing website project)
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import your custom hook
import usePublicWebsiteContent from './hooks/usePublicWebsiteContent';

// Import all your components
import Header from './components/Header';
import Features from './components/Features';
import Nutritionists from './components/Nutritionists';
import Gamification from './components/Gamification';
import FeaturesComparison from './components/FeaturesComparison';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import SignUpForm from './components/SignUpForm'; // Assuming these are static forms or have their own data needs
import LoginForm from './components/LoginForm';   // Assuming these are static forms or have their own data needs
import DownloadCTA from './components/DownloadCTA';

import './App.css'; // Your main application CSS (if you have one)

function App() {
    // Use the custom hook to fetch marketing content for the entire app
    const { content, loading, error } = usePublicWebsiteContent();

    // 1. Show a loading state while content is being fetched
    if (loading) {
        return (
            <div style={{ padding: '50px', textAlign: 'center', fontSize: '24px', backgroundColor: '#f0f2f5', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p>Loading DiaBeater Website Content...</p>
                {/* You can add a more sophisticated loading spinner or skeleton UI here */}
            </div>
        );
    }

    // 2. Show an error message if fetching failed
    if (error) {
        return (
            <div style={{ padding: '50px', textAlign: 'center', color: 'darkred', backgroundColor: '#ffe0e0', borderRadius: '8px', margin: '20px', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'column' }}>
                <h1>Error Loading Website</h1>
                <p>There was a problem fetching the marketing content: {error}</p>
                <p>Please ensure your Firebase Security Rules are configured correctly for public read access!</p>
            </div>
        );
    }

    // 3. Once content is loaded, render the full website with content passed as props
    // We ensure 'content' is treated as a plain object for consistency when passing as props
    const marketingContent = content; // If MarketingContentModel has a toObject(), use content.toObject() here.

    console.log("App.js marketingContent (after loading/error checks):", marketingContent); // ADDED LOG
    console.log("App.js testimonials array (from marketingContent):", marketingContent.testimonials); // ADDED LOG

    // Prepare testimonials for the Testimonials component
    // This is the crucial part: taking the 'testimonials' array from 'content'
    // and mapping it to the testimonial1, testimonial2, testimonial3 props.
    const testimonialProps = {};
    // Ensure content.testimonials is an array before trying to map it
    if (Array.isArray(marketingContent.testimonials)) {
        marketingContent.testimonials.forEach((fb, index) => {
            if (index < 3) { // Ensure we only take up to 3 testimonials
                testimonialProps[`testimonial${index + 1}`] = {
                    id: fb.id,          // Unique ID from Firebase for React key
                    text: fb.message,   // Map Firebase 'message' to 'text' for Testimonials component
                    author: fb.userFirstName, // Map Firebase 'userFirstName' to 'author'
                    rating: fb.rating   // Pass the rating
                };
            }
        });
    }

    return (
        <Router>
            <div className="App">
                {/* Header usually stays outside Routes if it's on all pages */}
                <Header
                    logoText={marketingContent.headerLogoText}
                    navHome={marketingContent.headerNavHome}
                    navFeatures={marketingContent.headerNavFeatures}
                    navAbout={marketingContent.headerNavAbout}
                    navContact={marketingContent.headerNavContact}
                    ctaButton={marketingContent.headerCtaButton}
                    // For the hero section which is often part of the header or a separate hero component
                    // You might want to create a dedicated Hero component and pass these props to it
                    heroTitle={marketingContent.heroTitle}
                    heroSubtitle={marketingContent.heroSubtitle}
                    heroCtaText={marketingContent.heroCtaText}
                    // Add any other header-specific content you want to pass
                />

                <Routes>
                    {/* Main page route */}
                    <Route path="/" element={
                        <>
                            {/* If you have a dedicated Hero component, render it here */}
                            {/* <Hero
                                title={marketingContent.heroTitle}
                                subtitle={marketingContent.heroSubtitle}
                                ctaText={marketingContent.heroCtaText}
                            /> */}

                            {/* Pass relevant content props to your components */}
                            <Features
                                sectionTitle={marketingContent.featuresSectionTitle}
                                feature1={{ title: marketingContent.feature1Title, description: marketingContent.feature1Description }}
                                feature2={{ title: marketingContent.feature2Title, description: marketingContent.feature2Description }}
                                feature3={{ title: marketingContent.feature3Title, description: marketingContent.feature3Description }}
                                feature4={{ title: marketingContent.feature4Title, description: marketingContent.feature4Description }}
                            />
                            <Nutritionists
                                sectionTitle={marketingContent.nutritionistsSectionTitle}
                                nutritionist1={{ name: marketingContent.nutritionist1Name, bio: marketingContent.nutritionist1Bio }}
                                nutritionist2={{ name: marketingContent.nutritionist2Name, bio: marketingContent.nutritionist2Bio }}
                                nutritionist3={{ name: marketingContent.nutritionist3Name, bio: marketingContent.nutritionist3Bio }}
                            />
                            <Gamification
                                sectionTitle={marketingContent.gamificationSectionTitle}
                                description={marketingContent.gamificationDescription}
                                feature1={marketingContent.gamificationFeature1}
                                feature2={marketingContent.gamificationFeature2}
                                feature3={marketingContent.gamificationFeature3}
                            />
                            {/* Pass the dynamically generated testimonialProps to Testimonials component */}
                            <Testimonials
                                sectionTitle={marketingContent.testimonialsSectionTitle}
                                {...testimonialProps} // This is where the magic happens!
                            />
                            <FeaturesComparison
                                title={marketingContent.featuresComparisonTitle}
                                basicHeader={marketingContent.basicHeader}
                                premiumHeader={marketingContent.premiumHeader}
                                basicFeatureList={marketingContent.basicFeatureList || []}
                                premiumFeatureList={marketingContent.premiumFeatureList || []}
                                ctaText={marketingContent.comparisonCtaText}
                            />
                            {/* If you have a DownloadCTA, you might render it here or in the Footer */}
                            <DownloadCTA
                                title={marketingContent.downloadCTATitle}
                                subtitle={marketingContent.downloadCTASubtitle}
                                appStoreLink={marketingContent.appStoreLink}
                                googlePlayLink={marketingContent.googlePlayLink}
                            />
                        </>
                    } />

                    {/* Routes for sign-up and login pages */}
                    {/* These forms likely handle their own state and Firebase interactions for user authentication */}
                    <Route path="/signup" element={<SignUpForm />} />
                    <Route path="/login" element={<LoginForm />} />

                </Routes>

                {/* Footer also stays outside Routes */}
                <Footer
                    aboutText={marketingContent.footerAboutText}
                    contactEmail={marketingContent.footerContactEmail}
                    contactPhone={marketingContent.footerContactPhone}
                    address={marketingContent.footerAddress}
                    copyright={marketingContent.footerCopyright}
                    privacyPolicy={marketingContent.footerPrivacyPolicy}
                    termsOfService={marketingContent.footerTermsOfService}
                />
            </div>
        </Router>
    );
}

export default App;