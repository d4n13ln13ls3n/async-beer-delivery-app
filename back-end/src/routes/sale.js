const express = require('express');
const SaleController = require('../controllers/SaleController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, (req, res) => SaleController.register(req, res));

module.exports = router;