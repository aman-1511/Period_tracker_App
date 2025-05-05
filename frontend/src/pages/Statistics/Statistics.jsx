import React from 'react';
import './Statistics.css';
import Navbar from '../../components/Navbar/Navbar';

const Statistics = () => {
  
  const cycleData = {
    averageCycleLength: 28,
    averagePeriodLength: 5,
    cycleRegularity: 85,
    lastSixCycles: [
      { month: 'Sep', length: 28, periodLength: 5 },
      { month: 'Aug', length: 29, periodLength: 4 },
      { month: 'Jul', length: 27, periodLength: 5 },
      { month: 'Jun', length: 28, periodLength: 6 },
      { month: 'May', length: 30, periodLength: 5 },
      { month: 'Apr', length: 27, periodLength: 4 }
    ],
    symptomFrequency: [
      { name: 'Cramps', frequency: 80 },
      { name: 'Headache', frequency: 45 },
      { name: 'Bloating', frequency: 65 },
      { name: 'Fatigue', frequency: 70 },
      { name: 'Mood swings', frequency: 60 }
    ]
  };

  return (
    <div className="statistics-page">
      <Navbar />
      <div className="statistics-content">
        <div className="statistics-header">
          <h1>Your Cycle Statistics</h1>
          <p>Understand your patterns and trends</p>
        </div>
        
        <div className="statistics-summary">
          <div className="stat-card">
            <h3>Average Cycle Length</h3>
            <div className="stat-value">{cycleData.averageCycleLength} days</div>
          </div>
          
          <div className="stat-card">
            <h3>Average Period Length</h3>
            <div className="stat-value">{cycleData.averagePeriodLength} days</div>
          </div>
          
          <div className="stat-card">
            <h3>Cycle Regularity</h3>
            <div className="stat-value">{cycleData.cycleRegularity}%</div>
          </div>
        </div>
        
        <div className="statistics-charts">
          <div className="chart-container">
            <h3>Cycle Length History</h3>
            <div className="bar-chart">
              {cycleData.lastSixCycles.map((cycle, index) => (
                <div key={index} className="bar-group">
                  <div className="bar-container">
                    <div 
                      className="bar" 
                      style={{ height: `${(cycle.length / 35) * 100}%` }}
                      title={`${cycle.length} days`}
                    >
                      <span className="bar-value">{cycle.length}</span>
                    </div>
                  </div>
                  <div className="bar-label">{cycle.month}</div>
                </div>
              )).reverse()}
            </div>
          </div>
          
          <div className="chart-container">
            <h3>Most Common Symptoms</h3>
            <div className="horizontal-bar-chart">
              {cycleData.symptomFrequency.map((symptom, index) => (
                <div key={index} className="horizontal-bar-group">
                  <div className="horizontal-bar-label">{symptom.name}</div>
                  <div className="horizontal-bar-container">
                    <div 
                      className="horizontal-bar" 
                      style={{ width: `${symptom.frequency}%` }}
                    ></div>
                    <span className="horizontal-bar-value">{symptom.frequency}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="statistics-insights">
          <h3>Insights</h3>
          <div className="insights-container">
            <div className="insight-card">
              <div className="insight-icon">📊</div>
              <h4>Cycle Regularity</h4>
              <p>Your cycles are relatively regular. 85% of your cycles are within 2 days of your average cycle length.</p>
              <div className="insight-animation">
                <div className="pulse-circle"></div>
              </div>
            </div>
            
            <div className="insight-card">
              <div className="insight-icon">🩸</div>
              <h4>Symptom Patterns</h4>
              <p>Cramps and fatigue are your most consistent symptoms, appearing in more than 70% of your cycles.</p>
              <div className="insight-animation">
                <div className="wave-animation"></div>
              </div>
            </div>
            
            <div className="insight-card">
              <div className="insight-icon">💡</div>
              <h4>Recommendations</h4>
              <p>Based on your cycle data, consider preparing for PMS symptoms approximately 3 days before your period is due.</p>
              <div className="insight-animation">
                <div className="checkmark-animation"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics; 