// src/components/DownloadCTA.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/DownloadCTA.module.css';

// Accept props here
const DownloadCTA = ({ title, subtitle, googlePlayLink }) => {
  const navigate = useNavigate();

  const handleRedirectToSignUp = (e) => {
    e.preventDefault();
    navigate('/signup');
  };

  return (
    <section id="download" className="section-cta">
      <h2>{title}</h2> {/* Use prop */}
      <p>{subtitle}</p> {/* Use prop */}
      <div className={styles.appStores}>
        <a href={googlePlayLink} className={styles.appStoreButton} onClick={handleRedirectToSignUp} target="_blank" rel="noopener noreferrer"> {/* Use prop and add target/rel */}
          <img src="/images/placeholder-google-play.png" alt="Get it on Google Play" />
        </a>
      </div>
    </section>
  );
};

export default DownloadCTA;