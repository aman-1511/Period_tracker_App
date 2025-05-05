const express = require('express');
const { 
  getDashboardData, 
  logPeriodStart, 
  logPeriodEnd, 
  logSymptoms, 
  getCycleHistory 
} = require('../controllers/cycleController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Get dashboard data
router.get('/dashboard', protect, getDashboardData);

// Log period start
router.post('/period/start', protect, logPeriodStart);

// Log period end
router.post('/period/end', protect, logPeriodEnd);

// Log symptoms
router.post('/symptoms', protect, logSymptoms);

// Get cycle history
router.get('/history', protect, getCycleHistory);

module.exports = router; 