import catchAsyncError from "../utils/catchAsyncError.js";
import { default as ApiError } from "../utils/ApiError.js";
import { default as Book } from "../models/book.js";
import { formatBufferTo64 } from "../utils/multer.js";
import { uploader } from "../utils/cloudinaryConfig.js";
export const renderNewBookForm = (req, res) => {
  res.render("books/new");
};

export const createNewBook = catchAsyncError(async (req, res, next) => {
  const file = formatBufferTo64(req.file);
  const result = await uploader.upload(file.content, { folder: "BookWorm/" });
  const cloudinaryImage = result.url;
  const { book } = req.body;
  const newBook = new Book(book);
  newBook.uploadedBy = req.user._id;
  newBook.image = cloudinaryImage;
  await newBook.save();
  return res.redirect(`/books/${newBook._id}`);
});

export const indexPage = catchAsyncError(async (req, res, next) => {
  const books = await Book.find({});
  res.render("books/index", { books });
});

export const showPage = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id).populate("uploadedBy", "username");
  res.render("books/show", { book });
});

export const renderEditBookForm = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  res.render("books/edit", { book });
});

export const updateBook = catchAsyncError(async (req, res, next) => {
  const { book } = req.body;
  const { id } = req.params;
  const updatedBook = await Book.findByIdAndUpdate(id, { ...book });
  await updatedBook.save();
  res.redirect(`/books/${updatedBook._id}`);
});

export const deleteBook = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  await Book.findByIdAndDelete(id);
  res.redirect("/books");
});
