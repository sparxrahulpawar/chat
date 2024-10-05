// /middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import AppError from "../utility/AppError.js";
import { envVariables } from "../config/config.js";

export const authorizeUser = (req, res, next) => {
  // Get the token from the headers
  const token =
    req.headers.authorization && req.headers.authorization.startsWith("Bearer")
      ? req.headers.authorization.split(" ")[1]
      : null;

  // If no token, return an error
  if (!token) {
    return next(
      new AppError(
        "You are not logged in! Please log in to access this route.",
        401
      )
    );
  }

  // Verify the token
  jwt.verify(token, envVariables.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return next(new AppError("Invalid token. Please log in again.", 401));
    }

    // Store user information in the request object
    req.user = {
      id: decoded.id,
      email: decoded.email,
      username: decoded.username,
    };

    next(); // Proceed to the next middleware or route handler
  });
};
