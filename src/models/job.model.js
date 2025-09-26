module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define(
    "Job",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

      // Basic Info
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },

      // Location
      location: { type: DataTypes.STRING, allowNull: true },

      // Job Type & Work Mode
      job_type: {
        type: DataTypes.ENUM("Full-time", "Part-time", "Contract", "Internship", "Freelance"),
        allowNull: false,
        defaultValue: "Full-time",
      },
      work_mode: {
        type: DataTypes.ENUM("On-site", "Remote", "Hybrid"),
        allowNull: false,
        defaultValue: "On-site",
      },

      // Experience & Salary
      experience: {
        type: DataTypes.STRING, // Eg: "2+ years", "Fresher"
        allowNull: true,
      },
      salary: { type: DataTypes.STRING, allowNull: true }, 

      // Extra Job Details
      requirements: { type: DataTypes.JSON, allowNull: true }, 
      responsibilities: { type: DataTypes.JSON, allowNull: true }, 
      benefits: { type: DataTypes.JSON, allowNull: true }, 
      skills: { type: DataTypes.JSON, allowNull: true }, 
      category: { type: DataTypes.STRING, allowNull: true },
      pre_questions: { type: DataTypes.JSON, allowNull: true }, 

      // Dates
      application_deadline: { type: DataTypes.DATEONLY, allowNull: true },

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
