const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    averageCycleLength: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 28
    },
    averagePeriodLength: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 5
    },
    conditions: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastPeriodStartDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  });

  User.associate = (models) => {
    User.hasMany(models.CycleRecord, {
      foreignKey: 'userId',
      as: 'cycleRecords'
    });
    User.hasMany(models.SymptomLog, {
      foreignKey: 'userId',
      as: 'symptomLogs'
    });
  };

  return User;
}; 