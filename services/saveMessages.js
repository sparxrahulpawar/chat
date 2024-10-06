import Message from "../models/Message.js";

// Save a message to the database
export const saveMessages = async (data) => {
  const { senderId, receiverId, text } = data;

  // Create and save the new message
  const newMessage = await Message.create({
    senderId,
    receiverId,
    text,
  });

  return newMessage; // Return the saved message
};
