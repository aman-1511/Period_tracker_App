const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const CycleRecord = sequelize.define('CycleRecord', {
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
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cycleLength: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });

  CycleRecord.associate = (models) => {
    CycleRecord.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };

  return CycleRecord;
}; 