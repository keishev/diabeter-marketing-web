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
    <section id="download" className={styles.downloadSection}>
      <div className={styles.container}>
        <h2 className={styles.downloadTitle}>{title}</h2>
        <p className={styles.downloadSubtitle}>{subtitle}</p>
        <div className={styles.appStores}>
          <a 
            href={googlePlayLink} 
            className={styles.appStoreButton} 
            onClick={handleRedirectToSignUp} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <img src="/images/placeholder-google-play.png" alt="Get it on Google Play" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default DownloadCTA;