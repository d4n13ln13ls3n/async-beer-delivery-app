const { Product } = require('../database/models');

class ProductService {
  static async listAll() {
    const allProducts = await Product.findAll({ raw: true });

    return allProducts;
  }

  static async getProductIdByName(name) {
    const product = await Product.findOne({ where: { name } });
    return product.dataValues.id;
  }
}

module.exports = ProductService;
