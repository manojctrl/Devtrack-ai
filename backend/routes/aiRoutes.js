const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getAiRecommendations, generateAiRecommendations, handleAiChat } = require("../controllers/aiController");

router.get("/recommendations", authMiddleware, getAiRecommendations);
router.post("/recommendations", authMiddleware, generateAiRecommendations);
router.post("/chat", authMiddleware, handleAiChat);


module.exports = router;
