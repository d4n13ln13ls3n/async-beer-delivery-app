const { Product } = require('../database/models');

class ProductService {
  static async listAll() {
    const allProducts = await Product.findAll({ raw: true });

    return allProducts;
  }
}

module.exports = ProductService;
