const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.Company = require("./company.model")(sequelize, Sequelize.DataTypes);
db.Job = require("./job.model")(sequelize, Sequelize.DataTypes);
db.AppliedJob = require("./appliedJob.model")(sequelize, Sequelize.DataTypes);
db.User = require("./user.model")(sequelize, Sequelize.DataTypes);
db.Role = require("./roles.model")(sequelize, Sequelize.DataTypes);
db.UserProfile = require("./userProfile.model")(sequelize, Sequelize.DataTypes);

// Associations
db.Company.hasMany(db.Job, { foreignKey: "company_id", as: "jobs" });
db.Job.belongsTo(db.Company, { foreignKey: "company_id", as: "company" });

db.Job.hasMany(db.AppliedJob, { foreignKey: "job_id", as: "applications" });
db.AppliedJob.belongsTo(db.Job, { foreignKey: "job_id", as: "job" });

db.Role.hasMany(db.User, { foreignKey: "role_id", as: "users" });
db.User.belongsTo(db.Role, { foreignKey: "role_id", as: "role" });
db.User.hasOne(db.UserProfile, {
  foreignKey: "user_id",
  as: "profile",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.UserProfile.belongsTo(db.User, {
  foreignKey: "user_id",
  as: "user",
});
module.exports = db;
