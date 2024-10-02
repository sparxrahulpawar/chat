import { Server } from "socket.io";
import { handleMessageEvent, handleDisconnection } from "./events.js";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  // Global error handling for the Socket.IO server
  io.on("error", (err) => {
    console.error("Socket.IO Server Error:", err);
  });

  io.on("connection", (socket) => {
    try {
      console.log(`New client connected: ${socket.id}`);

      // Attach event handlers
      handleMessageEvent(socket, io);
      handleDisconnection(socket);

      // Error handling specific to a single socket connection
      socket.on("error", (err) => {
        console.error(`Socket error from client ${socket.id}:`, err);
      });
    } catch (err) {
      console.error("Error during socket connection handling:", err);
    }
  });
};
