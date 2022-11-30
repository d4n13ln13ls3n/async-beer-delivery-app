const ProductService = require('../services/ProductService');

class ProductController {
  static async listAll(_req, res) {
    const allProducts = await ProductService.listAll();

    return res.status(200).json(allProducts);    
  }
}

module.exports = ProductController;