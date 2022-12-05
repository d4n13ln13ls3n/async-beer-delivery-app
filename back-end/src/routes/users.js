const express = require('express');
const UserController = require('../controllers/UserController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/sellers', auth, (req, res) => UserController.getAllSellers(req, res));

module.exports = router;