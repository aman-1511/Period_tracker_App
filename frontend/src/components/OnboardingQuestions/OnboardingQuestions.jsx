import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OnboardingQuestions.css';

// Import icons
import periodIcon from '../../assets/period-icon.svg';
import cycleIcon from '../../assets/cycle-icon.svg';
import durationIcon from '../../assets/duration-icon.svg';
import conditionsIcon from '../../assets/conditions-icon.svg';

const OnboardingQuestions = ({ onClose }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    lastPeriod: '2',
    cycleLength: '28',
    periodLength: '5',
    conditions: []
  });
  
  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(2); // Default to day 2
  
  const questions = [
    {
      id: 'lastPeriod',
      title: 'When did your last period start?',
      subtitle: 'We can predict your next period',
      icon: periodIcon,
      type: 'calendar'
    },
    {
      id: 'cycleLength',
      title: 'How long is your average cycle?',
      subtitle: 'A little hint- cycles usually last 15-30 days',
      icon: cycleIcon,
      type: 'numberRange',
      min: 15,
      max: 30,
      step: 1
    },
    {
      id: 'periodLength',
      title: 'How long does your period last?',
      subtitle: 'Most periods last 1-30 days, but it varies!',
      icon: durationIcon,
      type: 'numberRange',
      min: 1,
      max: 30,
      step: 1
    },
    {
      id: 'conditions',
      title: 'Any conditions affecting your cycle?',
      subtitle: 'Sharing helps your doctor care better.',
      icon: conditionsIcon,
      type: 'multiSelect',
      options: [
        'None',
        'PCOS',
        'Endometriosis',
        'UTI',
        'Perimenopause/Menopause',
        'Uterine Fibroids',
        'Anemia',
        'Bleeding Disorder',
        'Fibromyalgia',
        'IBS (Irritable Bowel Syndrome)',
        'Pregnancy',
        'Postpartum/breastfeeding'
      ]
    }
  ];

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit answers and navigate to dashboard
      const finalAnswers = {
        ...answers,
        lastPeriod: answers.lastPeriod || '2',
        cycleLength: answers.cycleLength || '28',
        periodLength: answers.periodLength || '5'
      };
      
      // Save to localStorage for persistence
      localStorage.setItem('cycleTrackerUserData', JSON.stringify(finalAnswers));
      
      // Navigate to dashboard with state
      navigate('/dashboard', { 
        state: { 
          fromOnboarding: true,
          userData: finalAnswers
        } 
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onClose();
    }
  };

  const handleAnswer = (value) => {
    const currentQuestion = questions[currentStep];
    setAnswers({
      ...answers,
      [currentQuestion.id]: value
    });
  };

  const handleConditionToggle = (condition) => {
    const currentConditions = answers.conditions || [];
    
    // If "None" is selected, clear other selections
    if (condition === 'None') {
      setAnswers({
        ...answers,
        conditions: currentConditions.includes('None') ? [] : ['None']
      });
      return;
    }
    
    // If other condition is selected, remove "None" if present
    let newConditions = currentConditions.filter(c => c !== 'None');
    
    // Toggle the selected condition
    if (newConditions.includes(condition)) {
      newConditions = newConditions.filter(c => c !== condition);
    } else {
      newConditions = [...newConditions, condition];
    }
    
    setAnswers({
      ...answers,
      conditions: newConditions
    });
  };
  
  const handleDateClick = (day) => {
    setSelectedDate(day);
    setAnswers(prev => ({
      ...prev,
      lastPeriod: day.toString()
    }));
  };
  
  const nextMonth = () => {
    const next = new Date(currentMonth);
    next.setMonth(next.getMonth() + 1);
    setCurrentMonth(next);
  };
  
  const prevMonth = () => {
    const prev = new Date(currentMonth);
    prev.setMonth(prev.getMonth() - 1);
    setCurrentMonth(prev);
  };
  
  const renderCalendar = () => {
    const monthName = currentMonth.toLocaleString('default', { month: 'long' });
    const year = currentMonth.getFullYear();
    const daysInMonth = new Date(year, currentMonth.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, currentMonth.getMonth(), 1).getDay();
    
    // Create day headers
    const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    
    // Create blank spaces for days before the first day of month
    const blanks = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      blanks.push(<div key={`blank-${i}`} className="calendar-day empty"></div>);
    }
    
    // Create days
    const days = [];
    for (let d = 1; d <= daysInMonth; d++) {
      const isSelected = d === parseInt(answers.lastPeriod, 10);
      days.push(
        <div
          key={`day-${d}`}
          className={`calendar-day${isSelected ? ' selected' : ''}`}
          onClick={() => handleDateClick(d)}
        >
          {d}
        </div>
      );
    }
    
    return (
      <>
        <div className="month-selector">
          <button className="month-nav" onClick={prevMonth}>&lt;</button>
          <span>{monthName} {year}</span>
          <button className="month-nav" onClick={nextMonth}>&gt;</button>
        </div>
        <div className="calendar-days-header">
          {dayNames.map((day, index) => (
            <div key={index} className="calendar-day-header">{day}</div>
          ))}
        </div>
        <div className="calendar-grid">
          {blanks}
          {days}
        </div>
      </>
    );
  };

  const renderQuestionContent = () => {
    const currentQuestion = questions[currentStep];
    
    switch (currentQuestion.type) {
      case 'calendar':
        return (
          <div className="calendar-input">
            {renderCalendar()}
          </div>
        );
      
      case 'numberRange':
        return (
          <div className="number-range-container">
            <input
              type="range"
              min={currentQuestion.min}
              max={currentQuestion.max}
              step={currentQuestion.step}
              value={answers[currentQuestion.id]}
              onChange={(e) => handleAnswer(e.target.value)}
              className="range-input"
            />
            <div className="range-value">
              <span>{answers[currentQuestion.id]}</span>
              <span className="unit">days</span>
            </div>
          </div>
        );
      
      case 'multiSelect':
        return (
          <div className="conditions-grid">
            {currentQuestion.options.map((condition) => (
              <button
                key={condition}
                className={`condition-btn ${answers.conditions.includes(condition) ? 'selected' : ''}`}
                onClick={() => handleConditionToggle(condition)}
              >
                {condition}
              </button>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  // Check if current question has a valid answer
  const isCurrentQuestionAnswered = () => {
    const currentQuestion = questions[currentStep];
    
    if (currentQuestion.type === 'multiSelect') {
      return true; // Allow empty selection for conditions
    }
    
    return !!answers[currentQuestion.id];
  };
  
  // Render progress dots
  const renderProgressDots = () => {
    return (
      <div className="question-progress">
        {questions.map((_, index) => (
          <div 
            key={index} 
            className={`progress-dot ${index === currentStep ? 'active' : ''}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-modal">
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <div className="question-container">
          {renderProgressDots()}
          
          <div className="question-icon">
            <img src={questions[currentStep].icon} alt="" />
          </div>
          
          <h2 className="question-title">{questions[currentStep].title}</h2>
          <p className="question-subtitle">{questions[currentStep].subtitle}</p>
          
          <div className="question-content">
            {renderQuestionContent()}
          </div>
          
          <div className="question-actions">
            {currentStep > 0 && (
              <button className="back-btn" onClick={handleBack}>
                Back
              </button>
            )}
            <button 
              className="next-btn" 
              onClick={handleNext}
              disabled={!isCurrentQuestionAnswered()}
            >
              {currentStep === questions.length - 1 ? 'Submit' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingQuestions; 