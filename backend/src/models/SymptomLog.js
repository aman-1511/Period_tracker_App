const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const SymptomLog = sequelize.define('SymptomLog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    symptoms: {
      type: DataTypes.STRING,
      allowNull: true
    },
    mood: {
      type: DataTypes.STRING,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    energy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 10
      }
    }
  });

  SymptomLog.associate = (models) => {
    SymptomLog.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };

  return SymptomLog;
}; 