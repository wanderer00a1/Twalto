import express from "express";
import fs from "fs";
import { Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";

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

const indexHtmlPath = path.join(__dirname, "../frontend", "dist", "index.html");

if (process.env.NODE_ENV === "production" && fs.existsSync(indexHtmlPath)) {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req: Request, res: Response) => {
    res.sendFile(indexHtmlPath);
  });
}

server.listen(PORT, () => {
  console.log("Server is Running on port " + PORT);
  connectDB();
});
