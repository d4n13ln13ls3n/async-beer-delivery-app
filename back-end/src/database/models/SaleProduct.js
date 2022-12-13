module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define(
    "SaleProduct",
    {
      saleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "sales_products",
      timestamps: false,
      underscored: true,
    }
  );

  SaleProduct.associate = (models) => {
    models.Product.belongsToMany(models.Sale, {
      as: "sales",
      through: SaleProduct,
      foreignKey: "productId",
      otherKey: "saleId",
    });

    models.Sale.belongsToMany(models.Product, {
      as: "products",
      through: SaleProduct,
      foreignKey: "saleId",
      otherKey: "productId",
    });
  };

  return SaleProduct;
};
