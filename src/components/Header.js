// src/components/Header.js
import React, { useEffect, useState } from 'react';
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
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleDownloadNowClick = (e) => {
        e.preventDefault();
        navigate('/signup');
    };

    const handleNavClick = (sectionId) => {
        // If we're not on the home page, navigate to home first, then scroll
        if (window.location.pathname !== '/') {
            navigate('/');
            // Wait for navigation to complete, then scroll
            setTimeout(() => {
                if (sectionId === 'top') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    const element = document.getElementById(sectionId);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }, 100);
        } else {
            // If we're already on home page, just scroll
            if (sectionId === 'top') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    };

    const scrollToFooter = () => {
        if (window.location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }, 100);
        } else {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    };

    return (
        <header className={styles.header}>
            <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}>
                <div className={styles.logo}>
                    <Link to="/" className={styles.logoLink}>
                        <img src="/images/placeholder-logo.png" alt={`${logoText} Logo`} />
                        <span>{logoText}</span>
                    </Link>
                </div>
                <ul className={styles.navList}>
                    <li>
                        <button 
                            onClick={() => handleNavClick('top')} 
                            className={styles.navButton}
                        >
                            {navHome}
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={() => handleNavClick('features')} 
                            className={styles.navButton}
                        >
                            {navFeatures}
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={() => handleNavClick('video')} 
                            className={styles.navButton}
                        >
                            {navAbout}
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={scrollToFooter} 
                            className={styles.navButton}
                        >
                            {navContact}
                        </button>
                    </li>
                    <li><Link to="/signup" className={styles.ctaLink}>{ctaButton}</Link></li>
                </ul>
            </nav>
            {/* Conditionally render the hero section */}
            {heroTitle && (
                <div className={styles.hero}>
                    <div className={styles.heroText}>
                        <h1>{heroTitle}</h1>
                        <button onClick={handleDownloadNowClick} className={styles.buttonPrimary}>{heroCtaText}</button>
                    </div>
                    <img src="/images/placeholder-app-screenshot.png" alt="Diabeater App Screenshot" className={styles.heroImage} />
                </div>
            )}
        </header>
    );
};

export default Header;