// src/controllers/movieController.js
import Movie from "../models/Movie.js";

// ✅ Get all movies (public)
export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (error) {
    console.error("Error fetching all movies:", error);
    res.status(500).json({ message: "Server error fetching movies" });
  }
};

// ✅ Get single movie by ID (public)
export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (error) {
    console.error("Error fetching movie:", error);
    res.status(500).json({ message: "Server error fetching movie" });
  }
};

// ✅ Get user’s own movies (protected)
export const getMyMovies = async (req, res) => {
  try {
    const userId = req.user?.uid || req.user?.email;
    const movies = await Movie.find({ userId }).sort({ createdAt: -1 });
    res.json(movies);
  } catch (error) {
    console.error("Error fetching user's movies:", error);
    res.status(500).json({ message: "Server error fetching your movies" });
  }
};

// ✅ Add new movie (protected)
export const addMovie = async (req, res) => {
  try {
    const { title, genre, rating, year } = req.body;
    const userId = req.user?.uid || req.user?.email;

    const movie = new Movie({
      title,
      genre,
      rating,
      year,
      userId,
    });

    const savedMovie = await movie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    console.error("Error adding movie:", error);
    res.status(500).json({ message: "Server error adding movie" });
  }
};

// ✅ Update a movie (protected)
export const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    // Optional: ensure the user owns this movie
    if (movie.userId !== (req.user?.uid || req.user?.email)) {
      return res.status(403).json({ message: "Unauthorized to update this movie" });
    }

    const updated = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).json({ message: "Server error updating movie" });
  }
};

// ✅ Delete a movie (protected)
export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    // Optional: ensure user owns it
    if (movie.userId !== (req.user?.uid || req.user?.email)) {
      return res.status(403).json({ message: "Unauthorized to delete this movie" });
    }

    await movie.deleteOne();
    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.error("Error deleting movie:", error);
    res.status(500).json({ message: "Server error deleting movie" });
  }
};
