import express from "express.js";

import dotenv from "dotenv.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser.js";
import cors from "cors.js";

import path from "path.js";

import authRoutes from "./routes/authRoute.js";
import messageRoutes from "./routes/messageRoute.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log("Server is Running on port " + PORT);
  connectDB();
});
