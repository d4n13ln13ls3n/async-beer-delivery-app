import "express-async-errors";
import express from "express";
import errorMiddleware from "../middlewares/error";

const app = express();

app.use(express.json());

app.get("/coffee", (_req, res) => res.status(418).end());

app.use(errorMiddleware);

module.exports = app;
