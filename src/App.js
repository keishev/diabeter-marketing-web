import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import usePublicWebsiteContent from './hooks/usePublicWebsiteContent';
// Removed the redundant import: useMarketingFeedbacks
import Header from './components/Header';
import Features from './components/Features';
import Nutritionists from './components/Nutritionists';
import Gamification from './components/Gamification';
import FeaturesComparison from './components/FeaturesComparison';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import DownloadCTA from './components/DownloadCTA';
import MarketingVideo from './components/MarketingVideo'; 

import './App.css';

// A component to render all the content for the marketing homepage
const HomeContent = ({ marketingContent, testimonialsForComponent }) => (
    <>
        <MarketingVideo
            title={marketingContent.marketingVideoTitle}
            videoUrl={marketingContent.youtubeVideoLink} 
        />
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
        <Testimonials
            sectionTitle={marketingContent.testimonialsSectionTitle}
            testimonials={testimonialsForComponent} // Use the fetched testimonials here
        />
        <FeaturesComparison
            title={marketingContent.featuresComparisonTitle}
            basicHeader={marketingContent.basicHeader}
            premiumHeader={marketingContent.premiumHeader}
            basicFeatureList={marketingContent.basicFeatureList || []}
            premiumFeatureList={marketingContent.premiumFeatureList || []}
            ctaText={marketingContent.comparisonCtaText}
        />
        <DownloadCTA
            title={marketingContent.downloadCTATitle}
            subtitle={marketingContent.downloadCTASubtitle}
            appStoreLink={marketingContent.appStoreLink}
            googlePlayLink={marketingContent.googlePlayLink}
        />
    </>
);

function App() {
    // Fetch all public content, which now includes testimonials
    const { content, loading, error } = usePublicWebsiteContent();

    if (loading) {
        return (
            <div style={{ padding: '50px', textAlign: 'center', fontSize: '24px', backgroundColor: '#f0f2f5', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p>Loading DiaBeater Website Content...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: '50px', textAlign: 'center', color: 'darkred', backgroundColor: '#ffe0e0', borderRadius: '8px', margin: '20px', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'column' }}>
                <h1>Error Loading Website</h1>
                <p>There was a problem fetching the marketing content: {error}</p>
                <p>Please ensure your Firebase Security Rules are configured correctly for public read access!</p>
            </div>
        );
    }

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={
                        <>
                            <Header
                                logoText={content.headerLogoText}
                                navHome={content.headerNavHome}
                                navFeatures={content.headerNavFeatures}
                                navAbout={content.headerNavAbout}
                                navContact={content.headerNavContact}
                                ctaButton={content.headerCtaButton}
                                heroTitle={content.heroTitle}
                                heroSubtitle={content.heroSubtitle}
                                heroCtaText={content.heroCtaText}
                            />
                            <HomeContent
                                marketingContent={content}
                                testimonialsForComponent={content.testimonials} // Use testimonials from the 'content' object
                            />
                            <Footer
                                aboutText={content.footerAboutText}
                                contactEmail={content.footerContactEmail}
                                contactPhone={content.footerContactPhone}
                                address={content.footerAddress}
                                copyright={content.footerCopyright}
                                privacyPolicy={content.footerPrivacyPolicy}
                                termsOfService={content.footerTermsOfService}
                            />
                        </>
                    } />
                    <Route path="/signup" element={
                        <>
                            <Header
                                logoText={content.headerLogoText}
                                navHome={content.headerNavHome}
                                navFeatures={content.headerNavFeatures}
                                navAbout={content.headerNavAbout}
                                navContact={content.headerNavContact}
                                ctaButton={content.headerCtaButton}
                            />
                            <SignUpForm />
                            <Footer
                                aboutText={content.footerAboutText}
                                contactEmail={content.footerContactEmail}
                                contactPhone={content.footerContactPhone}
                                address={content.footerAddress}
                                copyright={content.footerCopyright}
                                privacyPolicy={content.footerPrivacyPolicy}
                                termsOfService={content.footerTermsOfService}
                            />
                        </>
                    } />
                    <Route path="/login" element={
                        <>
                            <Header
                                logoText={content.headerLogoText}
                                navHome={content.headerNavHome}
                                navFeatures={content.headerNavFeatures}
                                navAbout={content.headerNavAbout}
                                navContact={content.footerContactEmail}
                                ctaButton={content.headerCtaButton}
                            />
                            <LoginForm />
                            <Footer
                                aboutText={content.footerAboutText}
                                contactEmail={content.footerContactEmail}
                                contactPhone={content.footerContactPhone}
                                address={content.footerAddress}
                                copyright={content.footerCopyright}
                                privacyPolicy={content.footerPrivacyPolicy}
                                termsOfService={content.footerTermsOfService}
                            />
                        </>
                    } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;