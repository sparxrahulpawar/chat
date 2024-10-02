import dotenv from "dotenv";

dotenv.config();

export const envVariables = {
  PORT: process.env.PORT || 5010,
  BACKENDURL: process.env.BACKENDURL,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_EXPIRE_TIME: process.env.JWT_EXPIRE_TIME || "30d",
  database: {
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
  },
};
