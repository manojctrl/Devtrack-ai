const { User, GithubProfile, GithubRepo } = require("../models");
const { Sequelize } = require("sequelize");

const getPublicDeveloperProfile = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username || username.trim() === "") {
      return res.status(400).json({ message: "GitHub username parameter is required." });
    }

    const user = await User.findOne({
      where: {
        githubUsername: username.trim(),
      },
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: `Developer with GitHub username '${username}' not found on DevTrack AI.` });
    }

    const githubProfile = await GithubProfile.findOne({
      where: { userId: user.id },
    });

    const repos = await GithubRepo.findAll({
      where: { userId: user.id },
      order: [["stars", "DESC"]],
    });

    return res.status(200).json({
      user,
      githubProfile,
      repos,
    });
  } catch (error) {
    console.error("Error fetching public developer profile:", error);
    return res.status(500).json({ message: "Server error while retrieving public profile.", error: error.message });
  }
};

module.exports = {
  getPublicDeveloperProfile,
};
