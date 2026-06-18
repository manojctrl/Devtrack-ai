const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getGithubData, syncGithubData } = require("../controllers/githubController");

router.get("/data", authMiddleware, getGithubData);
router.post("/sync", authMiddleware, syncGithubData);

module.exports = router;
