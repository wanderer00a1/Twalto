import mongoose from "mongoose.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL!);
    console.log(`MONGODB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error: ", error);
  }
};
