import express from "express";
import {register,login} from "../controllers/authController.js"

const router = express.Router();

// Register to the new user
router.post("/register", register);

// Login via email/username and password
router.post("/login", login);

export default router;
