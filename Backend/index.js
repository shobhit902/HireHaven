import app from "./app.js";
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file


// Start the server
const PORT = process.env.PORT || 5000;

app.get("/", async (req, res) => {
  res.send("Welcome to HireHaven Backend!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
