import express from "express";
import { login, logout, signup, verifyEmail , forgetPassword, resetPassword} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup); // Route for user registration
router.post("/login", login); // Route for user login
router.post("/logout", logout); // Route for user logout\
router.post("/verify-email", verifyEmail); // Route for email verification
router.post("/forgot-password", forgetPassword) // Route for forget password 
router.post("/reset-password/:token", resetPassword) // Route for reset password 


export default router;
