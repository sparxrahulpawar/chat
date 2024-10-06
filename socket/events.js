import { saveMessages } from "../services/saveMessages.js";

export const handleMessageEvent = (socket, io) => {
  socket.on("message", async (data) => {
    console.log("Message received:", data);

    try {
      const newMessage = await saveMessages(data);

      // Emit the message only to the intended recipient
      io.to(data.receiverId).emit("receiveMessage", newMessage);

      // Optionally, emit to the sender for immediate feedback
      socket.emit("receiveMessage", newMessage);
    } catch (error) {
      console.error("Error saving message:", error.message);
      socket.emit("error", { message: error.message });
    }
  });

  // Handle typing event
  socket.on("typing", (data) => {
    console.log("User is typing:", data);
    socket.to(data.receiverId).emit("userTyping", { userId: data.senderId }); // Notify the receiver
  });

  // Handle stop typing event
  socket.on("stopTyping", (data) => {
    console.log("User stopped typing:", data);
    socket
      .to(data.receiverId)
      .emit("userStopTyping", { userId: data.senderId }); // Notify the receiver
  });
};

export const handleDisconnection = (socket) => {
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
};
