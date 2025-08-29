import express from "express";
import { login, logout, signup, verifyEmail , forgetPassword, resetPassword, checkAuth} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth); // Route to check if user is authenticated

router.post("/signup", signup); // Route for user registration
router.post("/login", login); // Route for user login
router.post("/logout", logout); // Route for user logout\
router.post("/verify-email", verifyEmail); // Route for email verification
router.post("/forgot-password", forgetPassword) // Route for forget password 
router.post("/reset-password/:token", resetPassword) // Route for reset password 


export default router;
