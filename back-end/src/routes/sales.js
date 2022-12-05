const express = require('express');
const SaleController = require('../controllers/SaleController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, (req, res) => SaleController.register(req, res));
router.get('/', auth, (req, res) => SaleController.listAllByUserId(req, res));
router.get('/:saleId', auth, (req, res) => SaleController.listProductsBySale(req, res));

module.exports = router;