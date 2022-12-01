const SaleService = require('../services/SaleService');

class SaleController {
  static async register(req, res) {
    const { id: userId } = req.user;
    await SaleService.register({ userId, ...req.body });
    return res.status(201).end();
  }
}

module.exports = SaleController;