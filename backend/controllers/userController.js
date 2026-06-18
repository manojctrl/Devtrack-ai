const User = require("../models/User");
const bcrypt = require("bcryptjs");

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching current user", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

const updateGitHubUsername = async (req, res) => {
  try {
    const { githubUsername } = req.body;

    if (!githubUsername || !githubUsername.trim()) {
      return res.status(400).json({
        message: "GitHub username is required",
      });
    }

    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.githubUsername = githubUsername.trim();
    await user.save();

    const safeUser = user.toJSON();
    delete safeUser.password;

    return res.status(200).json({
      message: "GitHub username connected successfully",
      user: safeUser,
    });
  } catch (error) {
    console.error("Error updating GitHub username", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const allowedFields = [
      "firstName",
      "lastName",
      "bio",
      "location",
      "linkedin",
      "website",
      "profilePicture",
      "githubUsername",
    ];

    const updates = {};

    allowedFields.forEach((field) => {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        const value = req.body[field];
        updates[field] = typeof value === "string" ? value.trim() : value;
      }
    });

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "No profile fields provided",
      });
    }

    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await user.update(updates);

    const safeUser = user.toJSON();
    delete safeUser.password;

    return res.status(200).json({
      message: "Profile updated successfully",
      user: safeUser,
    });
  } catch (error) {
    console.error("Error updating user profile", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current password and new password are required",
      });
    }

    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect current password",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Error changing password", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = { getCurrentUser, updateGitHubUsername, updateUserProfile, changePassword };
