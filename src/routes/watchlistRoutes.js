import express from "express";
import Watchlist from "../models/Watchlist.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    const { movieId } = req.body;
    const userId = req.user.uid;

    const exists = await Watchlist.findOne({ movieId, userId });
    if (exists) return res.status(400).json({ message: "Already in watchlist" });

    const item = await Watchlist.create({ movieId, userId });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    const items = await Watchlist.find({ userId }).populate("movieId");
    const formatted = items.map(i => ({
      _id: i._id,
      movie: i.movieId,
      createdAt: i.createdAt,
      updatedAt: i.updatedAt,
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const item = await Watchlist.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.uid,
    });
    if (!item) return res.status(404).json({ message: "Not found or not authorized" });
    res.json({ message: "Removed from watchlist" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
