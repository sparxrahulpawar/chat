import express from "express";
import cors from "cors";
import { envVariables } from "./config/config.js";
import sequelize from "./connections/db.js";
import setupSwagger from "./swagger/api-docs.js";

const app = express();
const { PORT } = envVariables;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Swagger documentation setup
setupSwagger(app);

// Routes
app.use("/", (req, res) => {
  res.send("Hello from Express");
});

// Start the server and sync the database
const startServer = async () => {
  try {
    await sequelize.sync(); // Sync the database models
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start the server:", error);
  }
};

startServer();
