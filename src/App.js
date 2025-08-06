// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import usePublicWebsiteContent from './hooks/usePublicWebsiteContent';
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

import './App.css';

// A component to render all the content for the marketing homepage
const HomeContent = ({ marketingContent, testimonialsForComponent }) => (
    <>
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
            testimonials={testimonialsForComponent}
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

    const marketingContent = content;
    const testimonialsForComponent = Array.isArray(marketingContent.testimonials)
        ? marketingContent.testimonials.map(fb => ({
              id: fb.id,
              text: fb.message,
              author: fb.userFirstName,
              rating: fb.rating
          }))
        : [];

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={
                        <>
                            <Header
                                logoText={marketingContent.headerLogoText}
                                navHome={marketingContent.headerNavHome}
                                navFeatures={marketingContent.headerNavFeatures}
                                navAbout={marketingContent.headerNavAbout}
                                navContact={marketingContent.headerNavContact}
                                ctaButton={marketingContent.headerCtaButton}
                                heroTitle={marketingContent.heroTitle}
                                heroSubtitle={marketingContent.heroSubtitle}
                                heroCtaText={marketingContent.heroCtaText}
                            />
                            <HomeContent
                                marketingContent={marketingContent}
                                testimonialsForComponent={testimonialsForComponent}
                            />
                            <Footer
                                aboutText={marketingContent.footerAboutText}
                                contactEmail={marketingContent.footerContactEmail}
                                contactPhone={marketingContent.footerContactPhone}
                                address={marketingContent.footerAddress}
                                copyright={marketingContent.footerCopyright}
                                privacyPolicy={marketingContent.footerPrivacyPolicy}
                                termsOfService={marketingContent.footerTermsOfService}
                            />
                        </>
                    } />
                    <Route path="/signup" element={
                        <>
                            <Header
                                logoText={marketingContent.headerLogoText}
                                navHome={marketingContent.headerNavHome}
                                navFeatures={marketingContent.headerNavFeatures}
                                navAbout={marketingContent.headerNavAbout}
                                navContact={marketingContent.headerNavContact}
                                ctaButton={marketingContent.headerCtaButton}
                            />
                            <SignUpForm />
                            <Footer
                                aboutText={marketingContent.footerAboutText}
                                contactEmail={marketingContent.footerContactEmail}
                                contactPhone={marketingContent.footerContactPhone}
                                address={marketingContent.footerAddress}
                                copyright={marketingContent.footerCopyright}
                                privacyPolicy={marketingContent.footerPrivacyPolicy}
                                termsOfService={marketingContent.footerTermsOfService}
                            />
                        </>
                    } />
                    <Route path="/login" element={
                        <>
                             <Header
                                logoText={marketingContent.headerLogoText}
                                navHome={marketingContent.headerNavHome}
                                navFeatures={marketingContent.headerNavFeatures}
                                navAbout={marketingContent.headerNavAbout}
                                navContact={marketingContent.headerNavContact}
                                ctaButton={marketingContent.headerCtaButton}
                            />
                            <LoginForm />
                            <Footer
                                aboutText={marketingContent.footerAboutText}
                                contactEmail={marketingContent.footerContactEmail}
                                contactPhone={marketingContent.footerContactPhone}
                                address={marketingContent.footerAddress}
                                copyright={marketingContent.footerCopyright}
                                privacyPolicy={marketingContent.footerPrivacyPolicy}
                                termsOfService={marketingContent.footerTermsOfService}
                            />
                        </>
                    } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;