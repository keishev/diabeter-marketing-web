// src/components/Footer.js
import React from 'react';
import styles from '../styles/Footer.module.css';

// Accept props here
const Footer = ({
    logoText, // New prop for logo text
    aboutText,
    contactEmail,
    contactPhone,
    address,
    copyright,
    privacyPolicy,
    termsOfService
}) => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.footerLogo}>
                    <img src="/images/placeholder-logo.png" alt={`${logoText} Logo`} />
                    <span>{logoText}</span> {/* Use prop */}
                </div>
                <div className={styles.footerLinks}>
                    <ul>
                        <li><a href="#">{privacyPolicy}</a></li> {/* Use prop */}
                        <li><a href="#">{termsOfService}</a></li> {/* Use prop */}
                        <li><a href={`mailto:${contactEmail}`}>{contactEmail}</a></li> {/* Use prop */}
                        {/* If you want "Contact Us" to be a separate link text that's not the email itself: */}
                        {/* <li><a href={`mailto:${contactEmail}`}>Contact Us</a></li> */}
                    </ul>
                </div>
                <div className={styles.socialMedia}>
                    {/* These are currently hardcoded. You could make these dynamic with props as well if needed. */}
                    <a href="#"><img src="/images/placeholder-facebook.png" alt="Facebook" /></a>
                    <a href="#"><img src="/images/placeholder-instagram.png" alt="Instagram" /></a>
                    <a href="#"><img src="/images/placeholder-twitter.png" alt="Twitter" /></a>
                </div>
            </div>
            <p className={styles.copyrightText}>
                {copyright} {/* Use prop */}
            </p>
        </footer>
    );
};

export default Footer;