const express = require("express");
const router = express.Router();
const {
  getPublicDeveloperProfile,
  getPublicStats,
  getFeaturedDevelopers,
  getPublicPreviewProfile
} = require("../controllers/developerController");

router.get("/public/stats", getPublicStats);
router.get("/public/featured", getFeaturedDevelopers);
router.get("/public/preview/:username", getPublicPreviewProfile);
router.get("/:username", getPublicDeveloperProfile);

module.exports = router;
