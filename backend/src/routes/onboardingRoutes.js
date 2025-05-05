const express = require('express');
const { saveOnboardingData, getOnboardingStatus } = require('../controllers/onboardingController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Get onboarding status
router.get('/status', protect, getOnboardingStatus);

// Save onboarding data
router.post('/save', protect, saveOnboardingData);

module.exports = router; 