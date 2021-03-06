import express from "express";
import passport from "passport";
import { default as User } from "../models/user.js";
import { notLoggedIn, loggedIn } from "../utils/middleware.js";
import {
  renderRegisterForm,
  register,
  rednerLoginForm,
  logout,
} from "../controllers/userController.js";
const router = express.Router();
router
  .route("/register")
  .get(loggedIn, renderRegisterForm)
  .post(loggedIn, register);

router
  .route("/login")
  .get(loggedIn, rednerLoginForm)
  .post(
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
    })
  );

router.get(
  "/auth/google",
  loggedIn,
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  loggedIn,
  passport.authenticate("google", {
    successRedirect: "/",
    failreRedirect: "/auth/google",
  })
);

router.get("/logout", notLoggedIn, logout);

export { router };
