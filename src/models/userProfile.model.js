// models/userProfile.js
module.exports = (sequelize, DataTypes) => {
  const UserProfile = sequelize.define(
    "UserProfile",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "user", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      // Personal Info
      personal_info: {
        type: DataTypes.JSON, // flexible object
        allowNull: true,
        defaultValue: {},
      },

      // Arrays stored as JSON
      work_experience: { type: DataTypes.JSON, allowNull: true, defaultValue: [] },
      education: { type: DataTypes.JSON, allowNull: true, defaultValue: [] },
      skills: { type: DataTypes.JSON, allowNull: true, defaultValue: [] }, // ✅ FIXED
      projects: { type: DataTypes.JSON, allowNull: true, defaultValue: [] },
    },
    {
      tableName: "user_profile",
      timestamps: true,
      underscored: true,
    }
  );


  return UserProfile;
};
