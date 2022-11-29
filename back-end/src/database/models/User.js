module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'users',
      timestamps: false,
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Sale, { foreignKey: 'userId', as: 'sales' });
  };

  User.associate = (models) => {
    User.hasMany(models.Sale, { foreignKey: 'sellerId', as: 'sales' });
  };

  return User;
};