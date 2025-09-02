const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    pool: {
      max: 10,      // max connections
      min: 0,       // min connections
      acquire: 30000, // max time in ms to get a connection
      idle: 10000   // max idle time before releasing
    },
    logging: false // set true if you want raw SQL logs
  }
);

module.exports = sequelize;
