import express from 'express';
import { login, logout, register } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', login); // Route for user login
router.post('/register', register); // Route for user registration
router.post('/logout',logout); // Route for user logout

export default router;  

