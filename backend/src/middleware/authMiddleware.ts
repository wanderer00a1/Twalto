import jwt, { JwtPayload } from "jsonwebtoken.js";
import { Request, Response, NextFunction } from "express.js";
import User from "../models/userModel.js";

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (!decoded || typeof decoded === "string") {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in protectRoute middleware", error.message);
    }
    res.status(500).json({ message: "Internal server error" });
  }
};
