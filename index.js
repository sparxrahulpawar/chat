import express from "express";
import cors from "cors";
import { envVariables } from "./config/config.js";
import sequelize from "./connections/db.js";
import setupSwagger from "./swagger/api-docs.js";
import helmet from "helmet";
import { landing } from "./utility/template.js";

const app = express();
const { PORT } = envVariables;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies
app.use(helmet());

// Swagger documentation setup
setupSwagger(app);

// Routes
app.get("/", (req, res) => {
  res.send(landing);
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
