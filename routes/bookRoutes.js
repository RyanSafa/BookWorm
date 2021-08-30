import express from "express";
import { multerUploads } from "../utils/multer.js";
import {
  renderNewBookForm,
  createNewBook,
  indexPage,
  showPage,
  renderEditBookForm,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";
import { notLoggedIn, isAuthor } from "../utils/middleware.js";

const router = express.Router();

router
  .route("/")
  .get(indexPage)
  .post(notLoggedIn, multerUploads, createNewBook);

router.get("/new", notLoggedIn, renderNewBookForm);
router
  .route("/:id")
  .get(showPage)
  .patch(notLoggedIn, isAuthor, updateBook)
  .delete(notLoggedIn, isAuthor, deleteBook);

router.get("/:id/edit", notLoggedIn, isAuthor, renderEditBookForm);
export { router };
