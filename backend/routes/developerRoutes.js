const express = require("express");
const router = express.Router();
const { getPublicDeveloperProfile } = require("../controllers/developerController");

router.get("/:username", getPublicDeveloperProfile);

module.exports = router;
