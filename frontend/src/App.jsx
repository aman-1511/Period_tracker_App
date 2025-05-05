import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';


import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Symptoms from './pages/Symptoms/Symptoms';
import Statistics from './pages/Statistics/Statistics';
import Blogs from './pages/Blogs/Blogs';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/symptoms" element={<Symptoms />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/blogs" element={<Blogs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
