import swaggerJSDoc from "swagger-jsdoc";
import { envVariables } from "../config/config.js";

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
  apis: ["../routes/*.js"], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec };
