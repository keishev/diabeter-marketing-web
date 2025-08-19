// src/components/Footer.js
import React from 'react';
import styles from '../styles/Footer.module.css';

const Footer = ({
    logoText,
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
                    <span>{logoText}</span>
                </div>
                <div className={styles.footerLinks}>
                    <ul>
                        <li><a href="#">{privacyPolicy}</a></li>
                        <li><a href="#">{termsOfService}</a></li>
                        <li><a href={`mailto:${contactEmail}`}>{contactEmail}</a></li>
                    </ul>
                </div>
                <div className={styles.socialMedia}>
                    <a href="#"><img src="/images/placeholder-facebook.png" alt="Facebook" /></a>
                    <a href="#"><img src="/images/placeholder-instagram.png" alt="Instagram" /></a>
                    <a href="#"><img src="/images/placeholder-twitter.png" alt="Twitter" /></a>
                </div>
            </div>
            <p className={styles.copyrightText}>
                {copyright}
            </p>
        </footer>
    );
};

export default Footer;