// ONE Sequelize instance (one connection pool) for the whole API.
const { Sequelize, DataTypes } = require('sequelize');
const env = require('../config/env');
const dbConfig = require('../config/database')[env.nodeEnv];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

// Load the models used by the Week 11 modules.
const User = require('./user')(sequelize, DataTypes);
const QuestionSet = require('./question-set')(sequelize, DataTypes);
const Session = require('./session')(sequelize, DataTypes);
const Seat = require('./seat')(sequelize, DataTypes);

// Relationships from the Campus Escape schema.
User.hasMany(QuestionSet, { foreignKey: 'user_id', as: 'questionSets' });
QuestionSet.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

QuestionSet.hasMany(Session, { foreignKey: 'question_set_id', as: 'sessions' });
Session.belongsTo(QuestionSet, { foreignKey: 'question_set_id', as: 'questionSet' });

Session.hasMany(Seat, { foreignKey: 'session_id', as: 'seats' });
Seat.belongsTo(Session, { foreignKey: 'session_id', as: 'session' });

User.hasMany(Seat, { foreignKey: 'user_id', as: 'seats' });
Seat.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = {
  sequelize,
  Sequelize,
  DataTypes,
  User,
  QuestionSet,
  Session,
  Seat,
};