const { Product } = require('../database/models');
const HttpErrorHandler = require('../middlewares/errorHandler/HttpErrorHandler');

class ProductService {
  static async listAll() {
    const allProducts = await Product.findAll();
    return allProducts;
  }

  static async getProductIdByName(name) {
    const product = await Product.findOne({ where: { name } });
    if (!product) throw new HttpErrorHandler(404, 'Product not found');
    return product.id;
  }
}

module.exports = ProductService;
