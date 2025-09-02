module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define(
    "Company",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

      // Basic Info
      name: { type: DataTypes.STRING, allowNull: false },
      about: { type: DataTypes.TEXT, allowNull: true },
      logo: { type: DataTypes.STRING, allowNull: true },
      back_cover: { type: DataTypes.STRING, allowNull: true },

      // Contact & Online Presence
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      phone: { type: DataTypes.STRING, allowNull: true },
      website: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: { isUrl: true },
      },
      social_profiles: { type: DataTypes.JSON, allowNull: true },
      // Example: [{label: "facebook", url: "..."}, {label: "linkedin", url: "..."}]

      // Location
      address: { type: DataTypes.STRING, allowNull: true },
      headquarters: { type: DataTypes.STRING, allowNull: true },

      // Company Info
      industry_type: { type: DataTypes.STRING, allowNull: true },
      company_size: { type: DataTypes.STRING, allowNull: true }, // e.g. "51-200 employees"
      founded: { type: DataTypes.DATEONLY, allowNull: true },

      // Job Portal Specific
      verification_status: {
        type: DataTypes.ENUM("pending", "verified", "rejected"),
        defaultValue: "pending",
      },
      company_type: {
        type: DataTypes.ENUM(
          "Private",
          "Public",
          "Startup",
          "Nonprofit",
          "Government"
        ),
        allowNull: true,
      },
      // recruiter_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: true,
      //   references: {
      //     model: "users", // Assuming you have a "users" table
      //     key: "id",
      //   },
      //   onUpdate: "CASCADE",
      //   onDelete: "SET NULL",
      // },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      tags: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      // Example: ["Software", "AI", "E-commerce"]
    },
    {
      tableName: "company",
      timestamps: true,
      underscored: true,
      paranoid: true, // soft delete
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
     
    }
  );

  return Company;
};
