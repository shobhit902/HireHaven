import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup); // Route for user registration
router.post("/login", login); // Route for user login
router.post("/logout", logout); // Route for user logout

export default router;
