const express = require('express');
require('express-async-errors');
const cors = require('cors');
const errorMiddleware = require('../middlewares/error');

const loginRoute = require('../routes/login');
const registerRoute = require('../routes/register');
const productsRoute = require('../routes/products');
const salesRoute = require('../routes/sales');
const usersRoute = require('../routes/users');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/products', productsRoute);
app.use('/sales', salesRoute);
app.use('/users', usersRoute);

app.use(errorMiddleware);

module.exports = app;
