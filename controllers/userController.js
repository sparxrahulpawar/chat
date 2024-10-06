import User from "../models/User.js";

export const getAllUser = async (req, res, next) => {
  try {
    const users = await User.findAll();

    return res.status(200).json({
      status: "success",
      message: "Fetched all users successfully",
      data: { users },
    });
  } catch (error) {
    next(new AppError(error.message || "Error fetching users", 500));
  }
};
