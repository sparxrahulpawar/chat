// Custom event handlers for Socket.IO

export const handleMessageEvent = (socket, io) => {
  socket.on("message", (data) => {
    console.log("Message received:", data);
    io.emit("broadcastMessage", data); // Broadcasting to all clients
  });
};

export const handleDisconnection = (socket) => {
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
};
