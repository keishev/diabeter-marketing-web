// src/components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/Header.module.css';

const Header = ({
    logoText,
    navHome,
    navFeatures,
    navAbout,
    navContact,
    ctaButton,
    heroTitle, // These hero props are now optional
    heroSubtitle,
    heroCtaText
}) => {
    const navigate = useNavigate();

    const handleDownloadNowClick = (e) => {
        e.preventDefault();
        navigate('/signup');
    };

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.logo}>
                    <Link to="/" className={styles.logoLink}>
                        <img src="/images/placeholder-logo.png" alt={`${logoText} Logo`} />
                        <span>{logoText}</span>
                    </Link>
                </div>
                <ul className={styles.navList}>
                    <li><a href="/#features">{navFeatures}</a></li>
                    <li><a href="/#testimonials">{navContact}</a></li>
                    <li><a href="/#nutritionists">{navAbout}</a></li>
                    <li><a href="/#gamification">{navHome}</a></li>
                    <li><a href="/#features-comparison">{navContact}</a></li>
                    <li><Link to="/signup">{ctaButton}</Link></li>
                </ul>
            </nav>
            {/* Conditionally render the hero section */}
            {heroTitle && (
                <div className={styles.hero}>
                    <h1>{heroTitle}</h1>
                    <img src="/images/placeholder-app-screenshot.png" alt="Diabeter App Screenshot" className={styles.heroImage} />
                    <p>{heroSubtitle}</p>
                    <button onClick={handleDownloadNowClick} className="button-primary">{heroCtaText}</button>
                </div>
            )}
        </header>
    );
};

export default Header;