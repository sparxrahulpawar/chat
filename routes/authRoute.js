import express from "express";
import { register, login, forgotPassword } from "../controllers/authController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// Register New user in Users table
router.post("/register", upload.single("profilePic"), register);

// Login via email/username and password
router.post("/login", login);

// Forgot password via otp
router.post("/forgot-password", forgotPassword);

export default router;
