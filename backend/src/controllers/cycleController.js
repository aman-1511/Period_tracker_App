const { User, CycleRecord, SymptomLog } = require('../models');
const { Op } = require('sequelize');

// Calculate cycle phases
const calculateCyclePhases = (lastPeriodStart, cycleLength = 28, periodLength = 5) => {
  const today = new Date();
  const lastPeriod = new Date(lastPeriodStart);
  
  // Days since last period started
  const daysSinceLastPeriod = Math.floor((today - lastPeriod) / (1000 * 60 * 60 * 24));
  
  // Current day in cycle (1-based)
  const currentDayInCycle = (daysSinceLastPeriod % cycleLength) + 1;
  
  // Phase calculations
  const phases = {
    // Period phase (days 1-periodLength)
    period: { start: 1, end: periodLength },
    
    // Follicular phase (after period until ovulation)
    follicular: { start: periodLength + 1, end: Math.floor(cycleLength / 2) - 2 },
    
    // Fertile window (5 days before ovulation and ovulation day)
    fertile: { 
      start: Math.floor(cycleLength / 2) - 2,
      end: Math.floor(cycleLength / 2) + 3
    },
    
    // Ovulation day
    ovulation: { 
      start: Math.floor(cycleLength / 2) + 1,
      end: Math.floor(cycleLength / 2) + 1
    },
    
    // Luteal phase (after ovulation until end of cycle)
    luteal: { 
      start: Math.floor(cycleLength / 2) + 2,
      end: cycleLength
    }
  };
  
  // Determine current phase
  let currentPhase = 'period';
  if (currentDayInCycle > phases.period.end && currentDayInCycle <= phases.follicular.end) {
    currentPhase = 'follicular';
  } else if (currentDayInCycle > phases.follicular.end && currentDayInCycle < phases.ovulation.start) {
    currentPhase = 'fertile';
  } else if (currentDayInCycle === phases.ovulation.start) {
    currentPhase = 'ovulation';
  } else if (currentDayInCycle > phases.ovulation.end) {
    currentPhase = 'luteal';
  }
  
  // Next period date
  const daysUntilNextPeriod = cycleLength - currentDayInCycle + 1;
  const nextPeriodDate = new Date();
  nextPeriodDate.setDate(today.getDate() + daysUntilNextPeriod);
  
  return {
    currentDayInCycle,
    currentPhase,
    phases,
    nextPeriodDate: nextPeriodDate.toISOString().split('T')[0],
    daysUntilNextPeriod
  };
};

// Get dashboard data
exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (!user.lastPeriodStartDate) {
      return res.status(400).json({ 
        message: 'Onboarding not completed',
        isOnboarded: false
      });
    }
    
    // Get latest 3 cycle records
    const cycleRecords = await CycleRecord.findAll({
      where: { userId },
      order: [['startDate', 'DESC']],
      limit: 3
    });
    
    // Calculate cycle phases
    const cycleInfo = calculateCyclePhases(
      user.lastPeriodStartDate,
      user.averageCycleLength,
      user.averagePeriodLength
    );
    
    // Get symptoms based on cycle day
    const currentPhase = cycleInfo.currentPhase;
    
    // Phase-specific recommendations and expected symptoms
    const phaseData = {
      period: {
        symptoms: ['Cramps', 'Fatigue', 'Bloating', 'Mood changes'],
        recommendations: ['Rest when needed', 'Stay hydrated', 'Use heat for cramps', 'Take iron-rich foods']
      },
      follicular: {
        symptoms: ['Increased energy', 'Improved mood', 'Reduced bloating'],
        recommendations: ['Good time for high-intensity workouts', 'Plan important tasks', 'Focus on protein intake']
      },
      fertile: {
        symptoms: ['Increased libido', 'Clear skin', 'Cervical mucus changes', 'Slight pain on one side'],
        recommendations: ['Track ovulation signs', 'Stay hydrated', 'Consider fertility planning']
      },
      ovulation: {
        symptoms: ['Mild cramping', 'Breast tenderness', 'Increased libido', 'Spotting'],
        recommendations: ['Track body temperature', 'Note any pain on sides', 'Good day for moderate exercise']
      },
      luteal: {
        symptoms: ['Bloating', 'Mood changes', 'Breast tenderness', 'Fatigue', 'Food cravings'],
        recommendations: ['Focus on self-care', 'Manage stress', 'Gentle exercise', 'Limit caffeine and alcohol']
      }
    };
    
    // Get recent symptoms logged
    const recentSymptoms = await SymptomLog.findAll({
      where: {
        userId,
        date: {
          [Op.gte]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }
      },
      order: [['date', 'DESC']]
    });
    
    return res.json({
      cycleInfo,
      currentPhase: {
        name: currentPhase,
        day: cycleInfo.currentDayInCycle,
        expectedSymptoms: phaseData[currentPhase].symptoms,
        recommendations: phaseData[currentPhase].recommendations
      },
      nextPeriod: {
        date: cycleInfo.nextPeriodDate,
        daysUntil: cycleInfo.daysUntilNextPeriod
      },
      recentCycles: cycleRecords.map(record => ({
        id: record.id,
        startDate: record.startDate,
        endDate: record.endDate,
        duration: record.duration,
        cycleLength: record.cycleLength
      })),
      recentSymptoms: recentSymptoms.map(log => ({
        id: log.id,
        date: log.date,
        symptoms: log.symptoms ? JSON.parse(log.symptoms) : [],
        mood: log.mood
      }))
    });
  } catch (error) {
    console.error('Get dashboard data error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Log a period start
exports.logPeriodStart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { startDate = new Date().toISOString().split('T')[0], notes } = req.body;
    
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Get the previous period record to calculate cycle length
    const previousPeriod = await CycleRecord.findOne({
      where: { userId },
      order: [['startDate', 'DESC']]
    });
    
    let cycleLength = null;
    if (previousPeriod) {
      // Calculate cycle length (days between period starts)
      const prevDate = new Date(previousPeriod.startDate);
      const currentDate = new Date(startDate);
      cycleLength = Math.floor((currentDate - prevDate) / (1000 * 60 * 60 * 24));
    }
    
    // Create new cycle record
    const cycleRecord = await CycleRecord.create({
      userId,
      startDate,
      notes,
      cycleLength
    });
    
    // Update user's last period start date
    user.lastPeriodStartDate = startDate;
    if (cycleLength && cycleLength > 0 && cycleLength < 60) {
      // Update average cycle length with moving average
      const newAvg = Math.round((user.averageCycleLength + cycleLength) / 2);
      user.averageCycleLength = newAvg;
    }
    await user.save();
    
    return res.status(201).json({
      message: 'Period logged successfully',
      cycleRecord
    });
  } catch (error) {
    console.error('Log period start error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Log period end
exports.logPeriodEnd = async (req, res) => {
  try {
    const userId = req.user.id;
    const { endDate = new Date().toISOString().split('T')[0], notes } = req.body;
    
    // Find the latest period record
    const latestPeriod = await CycleRecord.findOne({
      where: { userId, endDate: null },
      order: [['startDate', 'DESC']]
    });
    
    if (!latestPeriod) {
      return res.status(400).json({ 
        message: 'No active period to end. Please log a period start first.' 
      });
    }
    
    // Calculate duration
    const startDate = new Date(latestPeriod.startDate);
    const currentDate = new Date(endDate);
    const duration = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    
    // Update period record
    latestPeriod.endDate = endDate;
    latestPeriod.duration = duration;
    latestPeriod.notes = notes || latestPeriod.notes;
    await latestPeriod.save();
    
    // Update user's average period length with moving average
    const user = await User.findByPk(userId);
    if (user && duration > 0 && duration < 15) {
      const newAvg = Math.round((user.averagePeriodLength + duration) / 2);
      user.averagePeriodLength = newAvg;
      await user.save();
    }
    
    return res.status(200).json({
      message: 'Period end logged successfully',
      cycleRecord: latestPeriod
    });
  } catch (error) {
    console.error('Log period end error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Log symptoms
exports.logSymptoms = async (req, res) => {
  try {
    const userId = req.user.id;
    const { date = new Date().toISOString().split('T')[0], symptoms, mood, notes, energy } = req.body;
    
    // Check if there's already a log for this date
    let symptomLog = await SymptomLog.findOne({
      where: { userId, date }
    });
    
    if (symptomLog) {
      // Update existing log
      symptomLog.symptoms = Array.isArray(symptoms) ? JSON.stringify(symptoms) : symptoms;
      symptomLog.mood = mood || symptomLog.mood;
      symptomLog.notes = notes || symptomLog.notes;
      symptomLog.energy = energy || symptomLog.energy;
      await symptomLog.save();
    } else {
      // Create new log
      symptomLog = await SymptomLog.create({
        userId,
        date,
        symptoms: Array.isArray(symptoms) ? JSON.stringify(symptoms) : symptoms,
        mood,
        notes,
        energy
      });
    }
    
    return res.status(200).json({
      message: 'Symptoms logged successfully',
      symptomLog
    });
  } catch (error) {
    console.error('Log symptoms error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get cycle history
exports.getCycleHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { limit = 12 } = req.query;
    
    const cycleRecords = await CycleRecord.findAll({
      where: { userId },
      order: [['startDate', 'DESC']],
      limit: parseInt(limit)
    });
    
    return res.status(200).json({
      cycleRecords: cycleRecords.map(record => ({
        id: record.id,
        startDate: record.startDate,
        endDate: record.endDate,
        duration: record.duration,
        cycleLength: record.cycleLength,
        notes: record.notes
      }))
    });
  } catch (error) {
    console.error('Get cycle history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 