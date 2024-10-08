import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swaggerOptions.js";

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;
