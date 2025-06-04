import { Document } from "mongoose";

interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  profilePic: string;
  createdAt: Date;
  updatedAt: Date;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export {};
