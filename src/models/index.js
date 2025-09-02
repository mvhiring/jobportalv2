const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.Company = require("./company.model")(sequelize, Sequelize.DataTypes);
db.Job = require("./job.model")(sequelize, Sequelize.DataTypes);

db.Company.hasMany(db.Job, { foreignKey: "company_id" });
db.Job.belongsTo(db.Company, { foreignKey: "company_id" });

// Apply associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
