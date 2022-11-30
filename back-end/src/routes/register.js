const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.post('/', (req, res) => UserController.register(req, res));

module.exports = router;
