const express = require("express");
const router = express.Router();

const {
  getCurrentUser,
  updateGitHubUsername,
  updateUserProfile,
  changePassword,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

router.get("/me", authMiddleware, getCurrentUser);
router.put("/me/github", authMiddleware, updateGitHubUsername);
router.put("/profile", authMiddleware, updateUserProfile);
router.put("/change-password", authMiddleware, changePassword);

module.exports = router;
