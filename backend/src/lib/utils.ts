import jwt from "jsonwebtoken.js";
import { Response } from "express.js";
import { Types } from "mongoose.js";

export const generateToken = (
  userId: string | Types.ObjectId,
  res: Response
) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
  return token;
};
