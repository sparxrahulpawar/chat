import { saveMessages } from "../services/saveMessages.js";

export const handleUserRegistration = (socket, userSockets) => {
  socket.on("register_user", (userId) => {
    userSockets[userId] = socket.id;
    console.log(`User ${userId} registered with socket ID: ${socket.id}`);
  });
};

export const handleMessageEvent = (socket, io, userSockets) => {
  socket.on("send_message", async (messageData) => {
    try {
      // Save the message
      const newMessage = await saveMessages(messageData);

      // Find the receiver's socket ID
      const receiverSocketId = userSockets[messageData.receiverId];

      if (receiverSocketId) {
        // Emit the message to the specific receiver's socket ID
        io.to(receiverSocketId).emit("receive_message", newMessage);
      }

      // Optionally, emit to the sender for confirmation
      socket.emit("message_sent", newMessage);
    } catch (error) {
      console.error("Error sending message:", error);
      socket.emit("error", { message: error.message });
    }
  });
};

export const handleDisconnection = (socket, userSockets) => {
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);

    // Optionally remove the disconnected user from userSockets
    for (let userId in userSockets) {
      if (userSockets[userId] === socket.id) {
        delete userSockets[userId];
        console.log(`User ${userId} disconnected`);
        break;
      }
    }
  });
};
