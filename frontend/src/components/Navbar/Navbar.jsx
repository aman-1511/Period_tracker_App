import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo.svg';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} alt="Cycle Tracker Logo" />
            <span>CycleTracker</span>
          </Link>
        </div>
        
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/symptoms" className="nav-link">Symptoms</Link>
          <Link to="/statistics" className="nav-link">Statistics</Link>
          <Link to="/blogs" className="nav-link">Blogs</Link>
        </div>
        
        <div className="navbar-buttons">
          <Link to="/demo" className="btn btn-secondary">Book Demo</Link>
          <Link to="/login" className="btn btn-text">Login</Link>
          <Link to="/signup" className="btn btn-primary">Try it free</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 