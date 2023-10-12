import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import env from "./util/validateEnv";
import connectDB from "./config/dbConn";
import articleRoutes from "./routes/articleRoutes";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors";
connectDB();

// Require all models
//const db = require("./models");
const PORT = env.PORT || 5000;

// Initialize Express
const app = express();

app.use(cors());

// request logger
app.use(morgan("dev"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.route("/").get((req, res) => {
  res.send("API Running!");
});
app.use("/api/articles", articleRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

//error handler
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  let errorMessage = "An unknown error occurred";
  let statusCode = 500;

  if (isHttpError(err)) {
    statusCode = err.status;
    errorMessage = err.message;
  }
  res.status(statusCode).json({ message: errorMessage });
});

mongoose.connection.on("open", () => {
  // Start the server only if connection to database is successful
  app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
  });
});
