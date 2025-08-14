// src/components/Team.js
import React from 'react';
import styles from '../styles/Team.module.css';

const Team = ({ 
    sectionTitle = "Meet Our Team",
    teamMembers = [
        {
            name: "Keisha Shevila",
            position: "Team Leader",
            bio: "Full-Stack Developer, Documentation, Tester, UI/UX Designer",
            image: "/images/placeholder-keisha.jpg"
        },
        {
            name: "Livia Pang",
            position: "Developer",
            bio: "Full-stack Developer, UI/UX Designer, Creative",
            image: "/images/placeholder-livy.jpg"
        },
        {
            name: "Jorrenmax Teo",
            position: "Lead Tester",
            bio: "Documentation, Programmer, Tester",
            image: "/images/placeholder-jorren.jpg"
        },
        {
            name: "Lim Jing Jie Ashley",
            position: "Documentation",
            bio: "Front-end Developer, Documentation",
            image: "/images/placeholder-ashley.jpg"
        },
        {
            name: "Kwong Chang Jie",
            position: "Developer",
            bio: "Programmer, Documentation, Tester",
            image: "/images/placeholder-changjie.jpg"
        }
    ]
}) => {
    return (
        <section id="team" className={styles.teamSection}>
            <div className={styles.container}>
                <h2 className={styles.sectionHeading}>{sectionTitle}</h2>
                <p className={styles.sectionDescription}>
                    Our dedicated team of healthcare professionals, developers, and designers work together 
                    to create the best diabetes management experience for you.
                </p>
                <div className={styles.teamGrid}>
                    {teamMembers.map((member, index) => (
                        <div key={index} className={styles.teamCard}>
                            <div className={styles.imageWrapper}>
                                <img 
                                    src={member.image} 
                                    alt={`${member.name} - ${member.position}`}
                                    className={styles.memberImage}
                                />
                                <div className={styles.imageOverlay}>
                                    <div className={styles.socialLinks}>
                                        <a href="#" className={styles.socialLink}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                            </svg>
                                        </a>

                                    </div>
                                </div>
                            </div>
                            <div className={styles.memberInfo}>
                                <h3 className={styles.memberName}>{member.name}</h3>
                                <p className={styles.memberPosition}>{member.position}</p>
                                <p className={styles.memberBio}>{member.bio}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;