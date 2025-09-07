const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.Company = require("./company.model")(sequelize, Sequelize.DataTypes);
db.Job = require("./job.model")(sequelize, Sequelize.DataTypes);
db.AppliedJob = require("./appliedJob.model")(sequelize, Sequelize.DataTypes);


db.Company.hasMany(db.Job, { foreignKey: "company_id", as: "jobs" });
db.Job.belongsTo(db.Company, { foreignKey: "company_id", as: "company" });
db.Job.hasMany(db.AppliedJob, { foreignKey: "job_id", as: "applications" });
db.AppliedJob.belongsTo(db.Job, { foreignKey: "job_id", as: "job" });

// Apply associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
