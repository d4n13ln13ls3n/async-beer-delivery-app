const express = require('express');
const SaleController = require('../controllers/SaleController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, (req, res) => SaleController.register(req, res));
router.get('/customers', auth, (req, res) =>
  SaleController.listAllByUserId(req, res));
router.get('/sellers', auth, (req, res) =>
  SaleController.listAllBySellerId(req, res));
router.get('/:saleId/customers', auth, (req, res) =>
  SaleController.listProductsByCustomer(req, res));
router.get('/:saleId/sellers', auth, (req, res) =>
  SaleController.listProductsBySeller(req, res));

module.exports = router;
