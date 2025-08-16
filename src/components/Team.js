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