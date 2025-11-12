import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import movieRoutes from "./routes/movieRoutes.js";
import { errorHandler } from "./utils/errorHandler.js";

dotenv.config(); 
connectDB();     

const app = express();


app.use(cors());
app.use(express.json());


app.use("/api/movies", movieRoutes);


app.get("/", (req, res) => {
  res.send("MovieMaster Pro API is running...");
});


app.use(errorHandler);

export default app;
