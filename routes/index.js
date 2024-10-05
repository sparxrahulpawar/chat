import express from "express";
import authRoutes from "./authRoute.js";
import messageRoutes from "./messageRoutes.js";
import { authorizeUser } from "../middleware/authMiddleware.js";

const router = express.Router();

// Mount routes
router.use("/auth", authRoutes);
router.use("/message", authorizeUser, messageRoutes);

export default router;
