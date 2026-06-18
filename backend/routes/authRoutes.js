const express = require("express");

const router = express.Router();

const { registerUser, githubAuth } = require("../controllers/authController");
const { login } = require("../controllers/loginController");

router.post("/register", registerUser);
router.post("/login", login);
router.post("/github", githubAuth);

module.exports = router;
