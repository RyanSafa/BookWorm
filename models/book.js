import mongoose from "mongoose";
const { Schema } = mongoose;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    minLength: 18,
    maxLength: 150,
    required: true,
  },
  pageCount: {
    type: Number,
  },
  categories: {
    type: String,
    enum: ["Nonfiction", "Fantasy", "Biogrophies", "Other","Short Story", "Thriller", "Science Fiction", "Comedy", "Romance", "Mystery", "Classic", "Horror", "Historical Fiction","Young Adult Fiction"]
    required: true,
  },
  uploadedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Book", bookSchema);
