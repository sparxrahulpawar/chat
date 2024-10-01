import User from "../models/User.js";
import AppError from "../utility/AppError.js";
import bcrypt from "bcryptjs";

// POST || Save new user into the users table
export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return next(new AppError("Fill all the required fields.", 400));

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return next(new AppError("Email already in use", 400));
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const newUser = await User.create({
      username,
      email,
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
    next(new AppError("Registration failed", 500));
  }
};

export const login = async (req, res, next) => {
  try {
  } catch (error) {}
};
