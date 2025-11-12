import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    genre: { type: String, trim: true },
    releaseYear: { type: Number, min: 1888 },
    director: { type: String, trim: true },
    cast: { type: String, trim: true },
    rating: { type: Number, min: 0, max: 10 },
    duration: { type: Number, min: 1 },
    plotSummary: { type: String, trim: true },
    posterUrl: { type: String, trim: true },
    language: { type: String, trim: true },
    country: { type: String, trim: true },

    // 👤 Ownership
    userId: { type: String, required: true, trim: true },
    addedBy: { type: String, trim: true },
  },
  { timestamps: true }
);

// Optional: index for faster user-specific queries
movieSchema.index({ userId: 1 });

export default mongoose.model("Movie", movieSchema);
