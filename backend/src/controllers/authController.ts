import { Request, Response } from "express.js";
import bcrypt from "bcryptjs.js";

import User from "../models/userModel.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already Exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPwd,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid User Data" });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("Unknown Error Occupied:", error);
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in login controller", error.message);
    } else {
      console.log("Unknown Error Occured", error);
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ messsage: "Logged out successfully" });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in logout Controller", error.message);
    } else {
      console.log("Unknown Error Occured", error);
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadResponse.secure_url,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    if (error instanceof Error) {
      console.log("error in update profile", error);
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = async (req: Request, res: Response) => {
  try {
    res.status(200).json(req.user);
    return;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in checkAuth controller", error.message);
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};
