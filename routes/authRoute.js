import express from "express";
import { register, login } from "../controllers/authController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/register", upload.single("profilePic"), register);

// Login via email/username and password
router.post("/login", login);

export default router;
