import app from "./app.js";
import connectDB from "./config/db.js";
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";

dotenv.config(); // Load environment variables from .env file

const PORT = process.env.PORT || 5000;

app.use(express.json()); // Middleware to parse JSON requests

app.use("/api/auth", authRoutes); // Use auth routes

// Define a simple route

app.get("/", async (req, res) => {
  res.send("Welcome to HireHaven Backend!");
});

// Start the server

app.listen(PORT, () => {
  connectDB(); // Connect to MongoDB
  console.log(`Server is running on port ${PORT}`);
});
