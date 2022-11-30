module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    "Sale",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
      sellerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
      totalPrice: {
        type: DataTypes.DECIMAL(9, 2),
        allowNull: false,
      },
      deliveryAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deliveryNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      saleDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "sales",
      timestamps: false,
      underscored: true,
    }
  );

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, { foreignKey: "userId", as: "user" });
  };

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, { foreignKey: "sellerId", as: "user" });
  };

  return Sale;
};
