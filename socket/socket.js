import { Server } from "socket.io";
import { envVariables } from "../config/config.js";
import { handleDisconnection, handleMessageEvent, handleUserRegistration } from "./events.js";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: envVariables.FRONTENDURL,
      methods: ["GET", "POST"],
    },
  });

  const userSockets = {};

  // Global error handling for the Socket.IO server
  io.on("error", (err) => {
    console.error("Socket.IO Server Error:", err);
  });

  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    // Register event handlers
    handleUserRegistration(socket, userSockets);
    handleMessageEvent(socket, io, userSockets);
    handleDisconnection(socket, userSockets);

    socket.on("error", (err) => {
      console.error(`Socket error from client ${socket.id}:`, err);
    });
  });
};
