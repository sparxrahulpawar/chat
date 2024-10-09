import Message from "../models/Message.js";

// Save a message to the database
export const saveMessages = async (data) => {
  const { senderId, receiverId, text } = data;

  try {
    // Create and save the new message
    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
    });

    return newMessage; // Return the saved message
  } catch (error) {
    console.error("Error saving message:", error.message);
    throw new Error("Failed to save message");
  }
};
