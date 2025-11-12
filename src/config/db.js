import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Prefer the environment variable, fallback to local only if not set
    const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/moviemasterpro";

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
