import User from "../models/User.js";
import AppError from "../utility/AppError.js";
import bcrypt from "bcryptjs";
import { generateJWTToken } from "../utility/generateJWT.js";
import { envVariables } from "../config/config.js";

// POST || Save new user into the users table
export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return next(new AppError("Fill all the required fields.", 400));
    }

    let trimmedEmail = email.trim().toLowerCase();

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email: trimmedEmail } });
    if (existingUser) {
      return next(new AppError("Email already in use", 400));
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const newUser = await User.create({
      username,
      email: trimmedEmail,
      password: hashedPassword,
      profilePic: req.file ? req.file.path : null, // If profilePic is uploaded
    });

    // Respond to the client
    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        profilePic: newUser.profilePic,
      },
    });
  } catch (error) {
    next(new AppError(error.message || "Registration failed", 500));
  }
};

// POST || Log in user via email and password
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("Fill all the required fields.", 400));
    }

    let trimmedEmail = email.trim().toLowerCase();

    // Check if user exists
    const user = await User.findOne({ where: { email: trimmedEmail } });
    if (!user) {
      return next(new AppError("Invalid email or password", 401));
    }
    // Check if password is correct
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return next(new AppError("Invalid email or password", 401));
    }

    // Generate JWT token
    const token = generateJWTToken(user.id, user.email, user.username);

    if (!token) {
      return next(new AppError("Failed to generate token", 500));
    }

    // Respond to the client
    res.status(200).json({
      status: "success",
      message: "Logged in successfully",
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        token: token,
        tokenExpiredIn: envVariables.JWT_EXPIRE_TIME,
      },
    });
  } catch (error) {
    next(new AppError(error.message || "Login failed", 500));
  }
};
