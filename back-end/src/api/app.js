const express = require('express');
require('express-async-errors');
const errorMiddleware = require('../middlewares/error');
const cors = require('cors');

const loginRoute = require('../routes/login');

const app = express();

app.use(express.json());
app.use(cors());

app.get("/coffee", (_req, res) => res.status(418).end());

app.use('/login', loginRoute);

app.use(errorMiddleware);

module.exports = app;
