import { saveMessages } from "../services/saveMessages.js";

export const handleUserRegistration = (socket, userSockets, userStatus, io) => {
  socket.on("register_user", (userId) => {
    userSockets[userId] = socket.id;
    userStatus[userId] = { status: "online", lastOnline: null };
    console.log(`User ${userId} registered with socket ID: ${socket.id}`);
    // Notify all users about the updated status
    io.emit("user_status", { userId, status: "online", lastOnline: null });
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

export const handleDisconnection = (socket, userSockets, userStatus, io) => {
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);

    // Find the user associated with the disconnected socket
    for (let userId in userSockets) {
      if (userSockets[userId] === socket.id) {
        // Remove user from userSockets
        delete userSockets[userId];

        // Set user as offline and record lastOnline timestamp
        userStatus[userId] = { status: "offline", lastOnline: new Date().toISOString() };

        console.log(`User ${userId} disconnected and is now offline`);

        // Notify all users about the updated status
        io.emit("user_status", {
          userId,
          status: "offline",
          lastOnline: userStatus[userId].lastOnline,
        });
        
        break;
      }
    }
  });
};

