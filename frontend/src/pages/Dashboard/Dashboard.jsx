import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import Navbar from '../../components/Navbar/Navbar';

const phaseNames = [
  'Period',
  'Follicular',
  'Fertile',
  'Ovulation',
  'Luteal',
  'Predicted'
];

const phaseColors = [
  '#e53e3e', 
  '#3182ce', 
  '#38a169', 
  '#f6ad55', 
  '#805ad5', 
  '#a0aec0'  
];

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    lastPeriod: "2",
    cycleLength: "28",
    periodLength: "5",
    conditions: []
  });
  
  const [currentDay, setCurrentDay] = useState(15);
  const [daysToNextPeriod, setDaysToNextPeriod] = useState(13);
  const [currentPhase, setCurrentPhase] = useState("Ovulation Phase");
  const [phaseInfo, setPhaseInfo] = useState({
    description: "You're in your fertile window. If you're trying to conceive, this is a good time.",
    symptoms: ["Increased energy", "Heightened senses", "Slight pelvic pain"],
    tips: ["Track your basal body temperature", "Note any changes in cervical mucus", "Stay hydrated"]
  });
  
  useEffect(() => {
    
    const savedUserData = localStorage.getItem('cycleTrackerUserData');
    if (savedUserData) {
      const parsedData = JSON.parse(savedUserData);
      setUserData(parsedData);
      
    
      calculateCycleInfo(parsedData);
    } else if (!location.state?.fromOnboarding) {
      
    }
  }, [navigate, location]);
  
  const calculateCycleInfo = (data) => {
    
    const cycleLength = parseInt(data.cycleLength || 28);
    const periodLength = parseInt(data.periodLength || 5);
    
    
    const currentDay = 15; 
    setCurrentDay(currentDay);
    

    const daysRemaining = cycleLength - currentDay;
    setDaysToNextPeriod(daysRemaining);
    
   
    let phase;
    let phaseData = {};
    
    if (currentDay <= periodLength) {
      phase = "Menstrual Phase";
      phaseData = {
        description: "This is your period. Your body is shedding the uterine lining.",
        symptoms: ["Cramps", "Fatigue", "Bloating"],
        tips: ["Stay hydrated", "Use heat for cramps", "Take time to rest"]
      };
    } else if (currentDay < 14) {
      phase = "Follicular Phase";
      phaseData = {
        description: "Your body is preparing to release an egg. Estrogen levels are rising.",
        symptoms: ["Increased energy", "Improved mood", "Heightened senses"],
        tips: ["Great time to start new projects", "Increase workout intensity", "Engage in creative activities"]
      };
    } else if (currentDay >= 14 && currentDay <= 16) {
      phase = "Ovulation Phase";
      phaseData = {
        description: "You're in your fertile window. If you're trying to conceive, this is a good time.",
        symptoms: ["Increased energy", "Heightened senses", "Slight pelvic pain"],
        tips: ["Track your basal body temperature", "Note any changes in cervical mucus", "Stay hydrated"]
      };
    } else {
      phase = "Luteal Phase";
      phaseData = {
        description: "Your body is preparing for either pregnancy or menstruation.",
        symptoms: ["Mood changes", "Breast tenderness", "Fatigue"],
        tips: ["Focus on self-care", "Reduce caffeine intake", "Get plenty of sleep"]
      };
    }
    
    setCurrentPhase(phase);
    setPhaseInfo(phaseData);
  };
  
  const renderConditionsList = () => {
    if (!userData.conditions || userData.conditions.length === 0) {
      return <li>No conditions recorded</li>;
    }
    
    return userData.conditions.map((condition, index) => (
      <li key={index}>{condition}</li>
    ));
  };

 
  const currentPhaseIndex = 3; 

  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="dashboard-content">
        {}
        <div className="cycle-phase-indicator">
          {phaseNames.map((name, idx) => (
            <div
              key={name}
              className={`cycle-phase-dot${idx === currentPhaseIndex ? ' current' : ''}`}
              style={{
                background: idx === currentPhaseIndex ? phaseColors[idx] : phaseColors[idx] + '33',
                color: idx === currentPhaseIndex ? '#fff' : phaseColors[idx],
                border: `2px solid ${phaseColors[idx]}`
              }}
            >
              {idx === currentPhaseIndex ? (
                <span className="phase-dot-label" style={{ color: phaseColors[idx] }}>{name}</span>
              ) : null}
            </div>
          ))}
        </div>
        <div className="dashboard-header">
          <h1>Your Cycle Dashboard</h1>
          <p>Track and manage your menstrual health in one place</p>
        </div>
        <div className="dashboard-overview">
          <div className="overview-card current-phase">
            <div className="phase-info">
              <h3>Current Phase: <span>{currentPhase}</span></h3>
              <p>{phaseInfo.description}</p>
            </div>
            <div className="cycle-progress-container">
              <div className="cycle-progress">
                <div 
                  className="progress-bar" 
                  style={{ 
                    width: `${(currentDay / parseInt(userData.cycleLength)) * 100}%` 
                  }}
                ></div>
              </div>
              <div className="cycle-days">
                <span>Day {currentDay} of {userData.cycleLength}</span>
                <span className="days-remaining">{daysToNextPeriod} days until next period</span>
              </div>
            </div>
          </div>
          <button className="primary-btn">Log Period</button>
        </div>
        {/* Centered Cycle Insights */}
        <div className="insights-row">
          <div className="insights-container">
            <div className="insight-card">
              <div className="insight-icon">💧</div>
              <h3>Expected Symptoms</h3>
              <ul className="insights-list">
                {phaseInfo.symptoms.map((symptom, index) => (
                  <li key={index}>{symptom}</li>
                ))}
              </ul>
            </div>
            <div className="insight-card">
              <div className="insight-icon">🌱</div>
              <h3>Recommendations</h3>
              <ul className="insights-list">
                {phaseInfo.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
            <div className="insight-card">
              <div className="insight-icon">😊</div>
              <h3>Log Today's Symptoms</h3>
              <div className="quick-log">
                <button className="symptom-tag">Cramps</button>
                <button className="symptom-tag">Headache</button>
                <button className="symptom-tag">Bloating</button>
                <button className="symptom-tag">Fatigue</button>
                <button className="symptom-tag">Mood swings</button>
                <button className="symptom-tag">+ Add more</button>
              </div>
              <button className="dashboard-btn">Save Symptoms</button>
            </div>
          </div>
        </div>
        {}
        <div className="dashboard-sidecards-row">
          <div className="sidebar-card period-tracker">
            <h3>Next Period</h3>
            <div className="period-info">
              <div className="period-days">{daysToNextPeriod}</div>
              <p>days remaining</p>
            </div>
            <div className="period-dates">
              <div className="date-item">
                <span className="date-label">Expected Start:</span>
                <span className="date-value">April 18, 2023</span>
              </div>
              <div className="date-item">
                <span className="date-label">Expected End:</span>
                <span className="date-value">April 23, 2023</span>
              </div>
            </div>
          </div>
          <div className="sidebar-card">
            <h3>Cycle Statistics</h3>
            <div className="stats-info">
              <div className="stat-item">
                <span className="stat-label">Average Cycle Length:</span>
                <span className="stat-value">{userData.cycleLength} days</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Average Period Length:</span>
                <span className="stat-value">{userData.periodLength} days</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Last Period Start:</span>
                <span className="stat-value">Day {userData.lastPeriod}</span>
              </div>
            </div>
            <button className="dashboard-btn">View Detailed Stats</button>
          </div>
          <div className="sidebar-card">
            <h3>Health Conditions</h3>
            <ul className="condition-list">
              {renderConditionsList()}
            </ul>
            <button className="dashboard-btn">Update Health Info</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 