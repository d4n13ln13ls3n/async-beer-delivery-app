const SaleService = require('../services/SaleService');

class SaleController {
  static async register(req, res) {
    const { id: userId } = req.user;
    const newSaleId = await SaleService.register({ userId, ...req.body });
    return res.status(201).json({ newSaleId });
  }

  static async listAllByUserId(req, res) {
    const { id: userId, role } = req.user;
    const ordersList = await SaleService.listAllByUserId(userId, role);
    return res.status(200).json(ordersList);
  }

  static async listAllBySellerId(req, res) {
    const { id: sellerId, role } = req.user;
    const ordersList = await SaleService.listAllBySellerId(sellerId, role);
    return res.status(200).json(ordersList);
  }

  static async listProductsByCustomer(req, res) {
    const { id: userId } = req.user;
    const result = await SaleService.listProductsByCustomer(userId, req.params.saleId);
    return res.status(200).json(result);
  }

  static async listProductsBySeller(req, res) {
    const { id: sellerId } = req.user;
    const result = await SaleService.listProductsBySeller(sellerId, req.params.saleId);
    return res.status(200).json(result);
  }
}

module.exports = SaleController;
