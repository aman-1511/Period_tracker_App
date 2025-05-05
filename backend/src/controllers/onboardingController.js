const { User } = require('../models');

// Save onboarding data
exports.saveOnboardingData = async (req, res) => {
  try {
    const { lastPeriodStartDate, averageCycleLength, averagePeriodLength, conditions } = req.body;
    const userId = req.user.id;

    // Validate inputs
    if (!lastPeriodStartDate) {
      return res.status(400).json({ message: 'Last period start date is required' });
    }

    // Find user
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user with onboarding data
    user.lastPeriodStartDate = lastPeriodStartDate;
    user.averageCycleLength = averageCycleLength || 28;
    user.averagePeriodLength = averagePeriodLength || 5;
    user.conditions = Array.isArray(conditions) ? JSON.stringify(conditions) : conditions;

    await user.save();

    return res.status(200).json({
      message: 'Onboarding data saved successfully',
      user: {
        id: user.id,
        lastPeriodStartDate: user.lastPeriodStartDate,
        averageCycleLength: user.averageCycleLength,
        averagePeriodLength: user.averagePeriodLength,
        conditions: user.conditions
      }
    });
  } catch (error) {
    console.error('Save onboarding data error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get onboarding status
exports.getOnboardingStatus = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId, {
      attributes: ['lastPeriodStartDate', 'averageCycleLength', 'averagePeriodLength', 'conditions']
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isOnboarded = !!user.lastPeriodStartDate;

    return res.status(200).json({
      isOnboarded,
      onboardingData: isOnboarded ? {
        lastPeriodStartDate: user.lastPeriodStartDate,
        averageCycleLength: user.averageCycleLength,
        averagePeriodLength: user.averagePeriodLength,
        conditions: user.conditions ? JSON.parse(user.conditions) : []
      } : null
    });
  } catch (error) {
    console.error('Get onboarding status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 