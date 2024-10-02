import jwt from "jsonwebtoken";
import { envVariables } from "../config/config.js";

const { JWT_SECRET_KEY, JWT_EXPIRE_TIME } = envVariables;

export const generateJWTToken = (id, email, username) => {
  return jwt.sign({ id, email, username }, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRE_TIME,
  });
};
