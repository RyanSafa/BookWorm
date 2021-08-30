import passport from "passport";
import mongoose from "mongoose";
import { default as Book } from "../models/book.js";
export const notLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You have to be logged in to do that");
    res.redirect("/");
  } else {
    next();
  }
};

export const loggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.flash("error", "You are alreaddy logged in");
    res.redirect("/");
  } else {
    next();
  }
};

export const isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const book = await Book.findById(id).populate("uploadedBy", "username");
  if (userId === book.uploadedBy._id.toString()) {
    return next();
  } else {
    return res.redirect("/books");
  }
};
