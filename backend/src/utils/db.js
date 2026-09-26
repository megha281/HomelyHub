
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/homelyhub";
    await mongoose.connect(mongoUri);
    console.log("Mongogodb connected");
  } catch (error) {
    console.error("Mongodb connection failed", error.message || error);
    console.log("Continuing startup without MongoDB connection for local dev fallback.");
  }
};

export default connectDB;