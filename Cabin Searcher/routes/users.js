const express = require("express");
const router = express.Router();
const passport = require("passport");

const catchAsync = require("../utils/catchAsync");

const userController = require("../controllers/userController");

router.route("/register")
    .get(userController.renderRegisterForm)
    .post(catchAsync(userController.registerUser))

router.route("/login")
    .get(userController.renderLoginForm)
    .post(passport.authenticate("local", { failureFlash: true, failureRedirect: "/login", keepSessionInfo: true }), userController.loginRedirect)

router.get("/logout", userController.logout);

module.exports = router;