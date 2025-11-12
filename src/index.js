import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import movieRoutes from "./routes/movieRoutes.js";
import { errorHandler } from "./utils/errorHandler.js";

dotenv.config(); // ✅ Load .env before anything else
connectDB();     // ✅ Connect MongoDB

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/movies", movieRoutes);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("MovieMaster Pro API is running...");
});

// ✅ Error handler (must be after routes)
app.use(errorHandler);

export default app;
