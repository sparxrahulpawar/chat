// /routes/messageRoutes.js
import express from "express";
import { createMessage, getMessages } from "../controllers/messageController.js";

const router = express.Router();

// POST /api/messages - Create a new message
router.post("/", createMessage);

// GET /api/messages/:userId - Get messages for a user
router.get("/:userId", getMessages);

export default router;
