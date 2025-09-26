// models/appliedJob.js
module.exports = (sequelize, DataTypes) => {
  const AppliedJob = sequelize.define(
    "AppliedJob",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

      job_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "job",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      pre_questions_answers: { type: DataTypes.JSON, allowNull: true }, 

      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, validate: { isEmail: true } },
      phone: { type: DataTypes.STRING, allowNull: true },

      resume: { type: DataTypes.STRING, allowNull: true }, 
      cover_letter: { type: DataTypes.TEXT, allowNull: true },

      status: {
        type: DataTypes.ENUM("applied", "shortlisted", "interview", "hired", "rejected"),
        defaultValue: "applied",
      },
    },
    {
      tableName: "applied_job",
      timestamps: true,
      underscored: true,
    }
  );

  return AppliedJob;
};
