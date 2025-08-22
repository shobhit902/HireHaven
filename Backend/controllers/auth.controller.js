import { User } from "../models/user.model.js";
import { generateTokenANdSetCookie } from "../utils/generateTokenAndSetCookie.js";

import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      console.log("Missing fields:", { username, email, password });
      
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    // Generate a 6-digit verification token
    const user = new User({
      username,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 3600000 * 24, // 24 hours
    });

    await user.save();
    //jwt 
    
    generateTokenANdSetCookie( res,user._id);
    res.status(201).json({ success: true, message: "User created successfully", user:{
      ...user._doc, password: undefined, verificationToken: undefined, verificationTokenExpiresAt: undefined
    } });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  res.send("login route");
};

export const logout = async (req, res) => {
  res.send("logout route");
};
