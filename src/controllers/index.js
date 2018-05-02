const express = require("express");
const router = express.Router();
const home = require("./home");
const signup = require("./signup");
const login = require("./login");
router.get("/", home.get);
router.get("/login", login.get);
router.get("/signup", signup.get);

module.exports = router;
