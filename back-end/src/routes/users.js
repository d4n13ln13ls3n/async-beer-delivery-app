const express = require('express');
const UserController = require('../controllers/UserController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', auth, (req, res) => UserController.getAllCustomersAndUsers(req, res));
router.get('/sellers', auth, (req, res) => UserController.getAllSellers(req, res));

module.exports = router;