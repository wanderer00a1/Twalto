import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

export function getReceiverSocketId(userId:string) {
  return userSocketMap[userId];
}

//store online users
const userSocketMap: { [userId: string]: string } = {};

io.on("connection", (socket) => {
  console.log("A user connected ", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId && typeof userId === "string") {
    userSocketMap[userId] = socket.id;

    //emit to send events to all connected clients
    socket.emit("getOnlineUsers", Object.keys(userSocketMap));
  }
  //to all clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    if (userId && typeof userId === "string") delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
