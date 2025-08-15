import React from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import './About.css';

const About = () => {
  const teamMembers = [
    {
      name: "John Smith",
      role: "Founder & CEO",
      experience: "15+ years in PC building",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Sarah Johnson",
      role: "Lead Technician",
      experience: "10+ years hardware experience",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Mike Chen",
      role: "Custom Build Specialist",
      experience: "8+ years gaming optimization",
      image: "/api/placeholder/150/150"
    }
  ];

  const milestones = [
    { year: "2018", event: "Stack Technologies Founded" },
    { year: "2019", event: "1,000th Custom PC Built" },
    { year: "2021", event: "Expanded to Gaming Laptops" },
    { year: "2023", event: "10,000+ Satisfied Customers" },
    { year: "2025", event: "Industry Leader in Custom PCs" }
  ];

  return (
    <div className="about">
      <Header />
      
      <main className="about__main">
        <div className="about__hero">
          <div className="container">
            <h1 className="about__title">About Stack Technologies</h1>
            <p className="about__subtitle">
              Building the future of gaming, one custom PC at a time
            </p>
          </div>
        </div>

        <div className="about__content">
          <div className="container">
            {/* Company Story */}
            <section className="about__story">
              <div className="story-grid">
                <div className="story-text">
                  <h2>Our Story</h2>
                  <p>
                    Founded in 2018 by passionate gamers and tech enthusiasts, Stack Technologies 
                    began with a simple mission: to build the highest quality custom gaming PCs 
                    that deliver exceptional performance and reliability.
                  </p>
                  <p>
                    What started as a small operation in a garage has grown into a trusted name 
                    in the gaming community. We've built thousands of custom systems, each one 
                    carefully crafted to meet our customers' specific needs and budget.
                  </p>
                  <p>
                    Today, Stack Technologies continues to push the boundaries of what's possible 
                    in custom PC building, combining cutting-edge technology with meticulous 
                    attention to detail.
                  </p>
                </div>
                <div className="story-image">
                  <img src="/api/placeholder/500/400" alt="Stack Technologies workshop" />
                </div>
              </div>
            </section>

            {/* Mission & Values */}
            <section className="about__values">
              <h2>Our Mission & Values</h2>
              <div className="values-grid">
                <div className="value-card">
                  <div className="value-card__icon">🎯</div>
                  <h3>Excellence</h3>
                  <p>We strive for perfection in every build, using only premium components and rigorous testing.</p>
                </div>
                <div className="value-card">
                  <div className="value-card__icon">🤝</div>
                  <h3>Trust</h3>
                  <p>Building lasting relationships with our customers through transparency and reliable service.</p>
                </div>
                <div className="value-card">
                  <div className="value-card__icon">🚀</div>
                  <h3>Innovation</h3>
                  <p>Staying ahead of technology trends to deliver cutting-edge gaming experiences.</p>
                </div>
                <div className="value-card">
                  <div className="value-card__icon">💙</div>
                  <h3>Passion</h3>
                  <p>Our love for gaming and technology drives everything we do, from design to delivery.</p>
                </div>
              </div>
            </section>

            {/* Team */}
            <section className="about__team">
              <h2>Meet Our Team</h2>
              <div className="team-grid">
                {teamMembers.map((member, index) => (
                  <div key={index} className="team-member">
                    <img src={member.image} alt={member.name} className="team-member__photo" />
                    <h3 className="team-member__name">{member.name}</h3>
                    <p className="team-member__role">{member.role}</p>
                    <p className="team-member__experience">{member.experience}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Timeline */}
            <section className="about__timeline">
              <h2>Our Journey</h2>
              <div className="timeline">
                {milestones.map((milestone, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-item__year">{milestone.year}</div>
                    <div className="timeline-item__event">{milestone.event}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Statistics */}
            <section className="about__stats">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-card__number">10,000+</div>
                  <div className="stat-card__label">Custom PCs Built</div>
                </div>
                <div className="stat-card">
                  <div className="stat-card__number">99.8%</div>
                  <div className="stat-card__label">Customer Satisfaction</div>
                </div>
                <div className="stat-card">
                  <div className="stat-card__number">7</div>
                  <div className="stat-card__label">Years of Experience</div>
                </div>
                <div className="stat-card">
                  <div className="stat-card__number">24/7</div>
                  <div className="stat-card__label">Support Available</div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
