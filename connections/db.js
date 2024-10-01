import { Sequelize } from "sequelize";
import { envVariables } from "../config/config.js";

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = envVariables.database;

// Create a Sequelize instance
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
  logging: false, // Set to true for debugging
});

// Test the connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database Connected with PostgreSQL successfully.");
  } catch (error) {
    console.error("Unable to connect to the PostgreSQL database:", error);
  }
};

testConnection();

export default sequelize;
