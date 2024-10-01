import express from "express";
import authRoutes from "./authRoute.js";

const router = express.Router();

// Mount routes
router.use("/auth", authRoutes);

export default router;