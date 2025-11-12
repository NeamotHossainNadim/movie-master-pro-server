// src/routes/movieRoutes.js
import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  getAllMovies,
  getMovieById,
  getMyMovies,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movieController.js";

const router = express.Router();

// ✅ Public routes
router.get("/", getAllMovies);

// ✅ Protected routes (must be before /:id)
router.get("/my", verifyToken, getMyMovies);

// ✅ Dynamic routes
router.get("/:id", getMovieById);

router.post("/", verifyToken, addMovie);
router.put("/:id", verifyToken, updateMovie);
router.delete("/:id", verifyToken, deleteMovie);

export default router;
