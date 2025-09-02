module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(55),
        unique: true,
        allowNull: false,
      },
    },
    {
      tableName: "role",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  //   User.associate = (models) => {
  //     User.hasMany(models.Post, { foreignKey: "userId", as: "posts" });
  //   };

  return Role;
};
