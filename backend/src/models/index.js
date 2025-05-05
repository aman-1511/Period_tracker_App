const { Sequelize } = require('sequelize');
const config = require('../config/database.js');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig);

const User = require('./User')(sequelize);
const CycleRecord = require('./CycleRecord')(sequelize);
const SymptomLog = require('./SymptomLog')(sequelize);

const db = {
  sequelize,
  Sequelize,
  User,
  CycleRecord,
  SymptomLog
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db; 