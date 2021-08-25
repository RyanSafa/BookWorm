import User from "../models/users.js";
import passport from "passport";
import catchAsyncError from "../utils/catchAsyncError.js";

export const renderRegisterForm = (req, res) => {
  res.render("../views/users/register");
};

export const register = catchAsyncError(async (req, res, next) => {
  const { email, username, password } = req.body;
  const user = new User({ username, email });
  await User.register(user, password);
  await user.save();
  res.send("User saved");
});

export const rednerLoginForm = (req, res) => {
  res.render("../views/users/login");
};

export const logout = function (req, res) {
  req.logout();
  res.redirect("/");
};
