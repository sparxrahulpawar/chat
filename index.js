import express from "express";
import cors from "cors";
import { envVariables } from "./config/config.js";
import sequelize from "./connections/db.js";
import setupSwagger from "./swagger/api-docs.js";
import helmet from "helmet";
import { landing, unKnownRoute } from "./utility/template.js";
import { errorHandler } from "./middleware/errorHandler.js";
import router from "./routes/index.js";

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

// Auth Route
app.use("/api", router);

// Handle non-existing routes
app.all("*", (req, res) => {
  res.send(unKnownRoute);
});

// Global error handler
app.use(errorHandler);

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
