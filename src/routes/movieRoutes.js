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

router.get("/", getAllMovies);

router.get("/my", verifyToken, getMyMovies);

router.get("/:id", getMovieById);

router.post("/", verifyToken, addMovie);
router.put("/:id", verifyToken, updateMovie);
router.delete("/:id", verifyToken, deleteMovie);

export default router;
