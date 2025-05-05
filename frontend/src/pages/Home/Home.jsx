import React from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import CycleTracker from '../../components/CycleTracker/CycleTracker';

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      <div className="home-content">
        <CycleTracker />
      </div>
    </div>
  );
};

export default Home; 