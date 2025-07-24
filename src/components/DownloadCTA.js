// src/components/DownloadCTA.js
import React from 'react';
import styles from '../styles/DownloadCTA.module.css';

// Accept props here
const DownloadCTA = ({ title, subtitle, appStoreLink, googlePlayLink }) => {
  return (
    <section id="download" className="section-cta">
      <h2>{title}</h2> {/* Use prop */}
      <p>{subtitle}</p> {/* Use prop */}
      <div className={styles.appStores}>
        <a href={appStoreLink} className={styles.appStoreButton} target="_blank" rel="noopener noreferrer"> {/* Use prop and add target/rel for external links */}
          <img src="/images/placeholder-app-store.png" alt="Download on App Store" />
        </a>
        <a href={googlePlayLink} className={styles.appStoreButton} target="_blank" rel="noopener noreferrer"> {/* Use prop and add target/rel */}
          <img src="/images/placeholder-google-play.png" alt="Get it on Google Play" />
        </a>
      </div>
    </section>
  );
};

export default DownloadCTA;