import { Op } from "sequelize";
import Message from "../models/Message.js";
import AppError from "../utility/AppError.js";
import User from "../models/User.js";

// Create a new message (This api is for demo only we can also create this if don't use realtime communication)
export const createMessage = async (req, res) => {
  try {
    const { senderId, receiverId, text } = req.body;
    if (!senderId || !receiverId || !text) {
      return next(new AppError("All fields are required", 400));
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
    });

    return res.status(201).json({
      status: "success",
      message: "Message Crated successfully",
      data: { newMessage },
    });
  } catch (error) {
    next(new AppError(error.message || "Error creating messages", 500));
  }
};

// Get messages for a user
export const getMessages = async (req, res, next) => {
  const { userId } = req.params;

  try {
    if (!userId) {
      return next(new AppError("UserID is required", 400));
    }

    const messages = await Message.findAll({
      where: {
        [Op.or]: [{ senderId: userId }, { receiverId: userId }],
      },
      include: [
        {
          model: User,
          as: "sender", // Adjust if you have a different alias
          attributes: ["username"], // Specify the attributes you want
        },
        {
          model: User,
          as: "receiver", // Adjust if you have a different alias
          attributes: ["username"], // Specify the attributes you want
        },
      ],
      order: [["createdAt", "ASC"]],
    });

    return res.status(200).json({
      status: "success",
      message: `Fetched all messages of this user ${userId} successfully`,
      data: {
        messages: messages.map((message) => ({
          id: message.id,
          text: message.text,
          createdAt: message.createdAt,
          sender: message.sender.username,
          receiver: message.receiver.username,
          senderId: message.senderId,
          receiverId: message.receiverId,
        })),
      },
    });
  } catch (error) {
    next(new AppError(error.message || "Error fetching messages", 500));
  }
};
