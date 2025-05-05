import React, { useState } from 'react';
import './CycleTracker.css';
import Header from '../Header/Header';
import FeatureCard from '../FeatureCard/FeatureCard';
import OnboardingQuestions from '../OnboardingQuestions/OnboardingQuestions';

// Import icons and images
import smartPredictionsIcon from '../../assets/smart-predictions.svg';
import discussWithGynecIcon from '../../assets/discuss-gynec.svg';
import listenToBodyIcon from '../../assets/listen-body.svg';
import stayPreparedIcon from '../../assets/stay-prepared.svg';
import heroImage from '../../assets/hero-image.svg';

const CycleTracker = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  const features = [
    {
      id: 1,
      title: 'Smart Predictions',
      description: 'Get personalized insights based on your cycle',
      icon: smartPredictionsIcon
    },
    {
      id: 2,
      title: 'Discuss with Gynec',
      description: 'Share accurate data with your doctor',
      icon: discussWithGynecIcon
    },
    {
      id: 3,
      title: 'Listen to Your Body',
      description: 'Track symptoms & patterns effortlessly',
      icon: listenToBodyIcon
    },
    {
      id: 4,
      title: 'Stay Prepared',
      description: 'Know when your period & ovulation are coming',
      icon: stayPreparedIcon
    }
  ];

  return (
    <div className="cycle-tracker">
      <Header />
      
      <div className="main-content">
        <div className="content-left">
          <h1 className="main-title">Track Your Menstrual Cycle with Ease</h1>
          <p className="main-description">Log your period, track symptoms, and get smart insights about your cycle.</p>
          
          <div className="features-section">
            <h2 className="features-title">What You Can Do</h2>
            <div className="features-grid">
              {features.map((feature) => (
                <FeatureCard 
                  key={feature.id}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                />
              ))}
            </div>
          </div>
          
          <div className="cta-section">
            <button className="get-started-button" onClick={() => setShowOnboarding(true)}>Get Started</button>
            <button className="learn-more-button">Learn More</button>
          </div>
          
          <div className="privacy-note">
            <p>Your data stays private and secure. You can update or delete it anytime.</p>
          </div>
        </div>
        
        <div className="content-right">
          <div className="hero-image-container">
            <img src={heroImage} alt="Woman with clock tracking cycle" className="hero-image" />
          </div>
        </div>
      </div>
      
      {showOnboarding && (
        <OnboardingQuestions onClose={() => setShowOnboarding(false)} />
      )}
    </div>
  );
};

export default CycleTracker; 