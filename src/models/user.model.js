module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

      first_name: { type: DataTypes.STRING, allowNull: false },
      last_name: { type: DataTypes.STRING, allowNull: true },


      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },

      password: { type: DataTypes.STRING, allowNull: false },

      // Verification
      is_verified: { type: DataTypes.BOOLEAN, defaultValue: false },
      verification_token: { type: DataTypes.STRING, allowNull: true },
      verification_token_expiry: { type: DataTypes.DATE, allowNull: true },

      // Role Relation
      role_id: {
        type: DataTypes.INTEGER,
        defaultValue: 3, // default role = "user"
        references: {
          model: "role",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    },
    {
      tableName: "user",
      timestamps: true,
      underscored: true,
    }
  );

  // Associations
  User.associate = (models) => {
    User.belongsTo(models.Role, {
      foreignKey: "role_id",
      as: "role",
    });
  };

  return User;
};
