import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String },
  rating: { type: Number },
  year: { type: Number },
  userId: { type: String, required: true },
});

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
