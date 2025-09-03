import app from "./app.js";
import { connectDB } from "./config/db.js";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import projectRoutes from "./routes/projectAndBid.route.js";
import cors from "cors";
import morgan from "morgan";

dotenv.config(); // Load environment variables from .env file

const PORT = process.env.PORT || 5000;

app.use(express.json()); // Middleware to parse JSON requests
app.use(cookieParser()); // Middleware to parse cookies
app.use(cors());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes); // Use auth routes
app.use("/api/projects", projectRoutes); // Use project and bid routes

// Define a simple route

app.get("/", async (req, res) => {
  res.send("Welcome to HireHaven Backend!");
});

// Start the server

app.listen(PORT, () => {
  connectDB(); // Connect to MongoDB
  console.log(`Server is running on port ${PORT}`);
});
