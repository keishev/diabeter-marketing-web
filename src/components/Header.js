// src/components/Header.js (in your PUBLIC marketing website project)
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/Header.module.css'; // Using CSS Modules

// Accept all the content props that App.js is sending
const Header = ({
    logoText,
    navHome,
    navFeatures,
    navAbout,
    navContact,
    ctaButton,
    heroTitle,
    heroSubtitle,
    heroCtaText
}) => {
    const navigate = useNavigate();

    const handleDownloadNowClick = (e) => {
        e.preventDefault();
        navigate('/signup'); // Redirect to the sign-up page
    };

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.logo}>
                    <Link to="/" className={styles.logoLink}>
                        <img src="/images/placeholder-logo.png" alt={`${logoText} Logo`} /> {/* Use logoText for alt */}
                        <span>{logoText}</span> {/* Use dynamic logoText */}
                    </Link>
                </div>
                <ul className={styles.navList}>
                    {/* Use dynamic nav items. Note: hrefs for sections are still hardcoded IDs. */}
                    <li><a href="#features">{navFeatures}</a></li>
                    <li><a href="#testimonials">{navContact}</a></li> {/* This might be a typo in your original, typically navContact is not a section link */}
                    <li><a href="#nutritionists">{navAbout}</a></li> {/* This might be a typo in your original */}
                    <li><a href="#gamification">{navHome}</a></li> {/* This might be a typo in your original */}
                    <li><a href="#features-comparison">{navContact}</a></li> {/* This might be a typo in your original */}
                    <li><Link to="/signup">{ctaButton}</Link></li> {/* Use ctaButton for the "Download App" style button */}
                </ul>
            </nav>
            <div className={styles.hero}>
                <h1>{heroTitle}</h1> {/* Use dynamic heroTitle */}
                <img src="/images/placeholder-app-screenshot.png" alt="Diabeter App Screenshot" className={styles.heroImage} />
                <p>{heroSubtitle}</p> {/* Use dynamic heroSubtitle */}
                <button onClick={handleDownloadNowClick} className="button-primary">{heroCtaText}</button> {/* Use dynamic heroCtaText */}
            </div>
        </header>
    );
};

export default Header;