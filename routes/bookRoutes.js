import express from "express";
import {
  renderNewBookForm,
  createNewBook,
  indexPage,
  showPage,
  renderEditBookForm,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";
import { notLoggedIn } from "../utils/middleware.js";

const router = express.Router();

router.get("/new", notLoggedIn, renderNewBookForm);

router.route("/").get(indexPage).post(notLoggedIn, createNewBook);

router
  .route("/:id")
  .get(showPage)
  .patch(notLoggedIn, updateBook)
  .delete(notLoggedIn, deleteBook);

router.get("/:id/edit", notLoggedIn, renderEditBookForm);
export { router };
