// /routes/messageRoutes.js
import express from "express";
import { getAllUser } from "../controllers/userController.js";

const router = express.Router();

// GET All the users form Users table
router.get("/", getAllUser);

export default router;
