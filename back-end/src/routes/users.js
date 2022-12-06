const express = require('express');
const UserController = require('../controllers/UserController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', auth, (req, res) => UserController.getAllCustomersAndUsers(req, res));
router.get('/sellers', auth, (req, res) => UserController.getAllSellers(req, res));

router.post('/', auth, (req, res) => UserController.registerByAdmin(req, res));

router.delete('/:userId', auth, (req, res) => UserController.delete(req, res));

module.exports = router;