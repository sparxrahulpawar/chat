import User from "../models/User.js";
import AppError from "../utility/AppError.js";
import bcrypt from "bcryptjs";
import { generateJWTToken } from "../utility/generateJWT.js";
import { envVariables } from "../config/config.js";
import { generateOTP } from "../utility/generateAll.js";
import { sendEmail } from "../services/emailService.js";
import { otpTemplate } from "../utility/template.js";

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

// POST || Forgot user password via otp
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return next(new AppError("Fill all the required fields.", 400));
    }
    let trimmedEmail = email.trim().toLowerCase();
    // Check if user exists
    const user = await User.findOne({ where: { email: trimmedEmail } });
    if (!user) {
      return next(new AppError("User not found", 404));
    }
    // Generate 6 digit OTP
    const otp = generateOTP();

    // Save OTP in user document
    user.otp = otp;
    user.otpExpires = Date.now() + 15 * 60 * 1000; // otp expires in 15 min.

    await user.save();

    let html = otpTemplate(user.username, otp, 15);

    // Send OTP via email
    await sendEmail(email, "Password Reset OTP", `Your OTP is: ${otp}`, html);

    // Respond to the client
    res.status(200).json({
      status: "success",
      message: "OTP sent successfully",
      data: {
        otp: otp,
      },
    });
  } catch (error) {
    next(new AppError(error.message || "Failed to send OTP", 500));
  }
};

// POST || Reset password uing valid otp
export const resetPassword = async (req, res, next) => {
  try {
    
    const { email, otp, newPassword } = req.body;
  
    if (!email || !otp || !newPassword) {
      return next(new AppError("Fill all the required fields.", 400));
    }
    let trimmedEmail = email.trim().toLowerCase();
  
    // Validate the OTP
    const user = await User.findOne({
      where: { email: trimmedEmail, otp: otp },
    });
  
    if (!user || user.otpExpires < Date.now()) {
      return next(new AppError("Invalid or expired OTP", 400));
    }
  
    // Update user's password
    user.password = await bcrypt.hash(newPassword, 12); // Hash the new password
    user.otp = null; // Clear the OTP
    user.otpExpires = null; // Clear the expiration
    await user.save();
  
    res.status(200).json({
      status: "success",
      message: "Password has been reset successfully",
    });
  } catch (error) {
    next(new AppError(error.message || "Failed to reset password", 500));
  }
};
