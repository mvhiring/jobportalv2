module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define(
    "Job",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

      // Basic Info
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },

      // Location & Dates
      location: { type: DataTypes.STRING, allowNull: true },
      start_date: { type: DataTypes.DATEONLY, allowNull: true },
      end_date: { type: DataTypes.DATEONLY, allowNull: true },
      application_deadline: { type: DataTypes.DATEONLY, allowNull: true },

      // Job Type
      type: {
        type: DataTypes.ENUM("full-time", "part-time", "remote", "internship"),
        allowNull: false,
         defaultValue: "full-time"
      },

      // Salary & Perks
      salary: { type: DataTypes.STRING, allowNull: true }, // e.g. "₹8 LPA" or "50000/month"
      currency: { type: DataTypes.STRING, defaultValue: "INR" },
      benefits: { type: DataTypes.JSON, allowNull: true }, 
      // e.g. ["Health Insurance", "Work From Home", "Free Lunch"]

      // Requirements
      experience_level: { 
        type: DataTypes.ENUM("Fresher", "Junior", "Mid-level", "Senior", "Lead"),
        allowNull: true,
      },
      skills: { type: DataTypes.JSON, allowNull: true }, 
      // e.g. ["React", "Node.js", "SQL"]

      education_required: { type: DataTypes.STRING, allowNull: true }, 
      // e.g. "B.Tech in Computer Science"

      // Relations
      company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "company",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      // Job Status
      status: {
        type: DataTypes.ENUM("open", "closed", "paused", "draft"),
        defaultValue: "open",
      },
    },
    {
      tableName: "job",
      timestamps: true,
      underscored: true,
    }
  );

  return Job;
};
