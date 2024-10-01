import swaggerJSDoc from "swagger-jsdoc";
import { envVariables } from "../config/config.js";
import { fileURLToPath } from "url";
import path from "path";

// Get the filename and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { BACKENDURL } = envVariables;

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Chat Application API",
    version: "1.0.0",
    description: "API documentation for the Real-Time Chat Application",
  },
  servers: [
    {
      url: BACKENDURL, // Replace with your server URL if deployed
    },
  ],
};

// Options for swagger-jsdoc
const options = {
  swaggerDefinition,
  apis: [path.resolve(__dirname, "./docs/*.js")],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec };
