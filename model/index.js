const dbConfig = require('../config/dbConfig.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
  
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.modal.js')(sequelize, Sequelize);
db.message = require('./message.modal')(sequelize,Sequelize);
db.rooms = require('./rooms.modal')(sequelize,Sequelize);

module.exports = db;