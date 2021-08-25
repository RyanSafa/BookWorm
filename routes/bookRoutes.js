import dotenv from "dotenv";
dotenv.config({ silent: process.env.NODE_ENV === "production" });
import express from "express";
import {
  renderSearchForm,
  queryBookApi,
} from "../controllers/bookController.js";

const router = express.Router();

router.get("/search", renderSearchForm);

router.get("/new", queryBookApi);

export { router };
