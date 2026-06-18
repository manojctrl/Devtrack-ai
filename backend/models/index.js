const User = require("./User");
const GithubProfile = require("./GithubProfile");
const GithubRepo = require("./GithubRepo");
const AiRecommendation = require("./AiRecommendation");

// Define Associations
User.hasOne(GithubProfile, { foreignKey: "userId", as: "githubProfile", onDelete: "CASCADE" });
GithubProfile.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasMany(GithubRepo, { foreignKey: "userId", as: "githubRepos", onDelete: "CASCADE" });
GithubRepo.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasOne(AiRecommendation, { foreignKey: "userId", as: "aiRecommendation", onDelete: "CASCADE" });
AiRecommendation.belongsTo(User, { foreignKey: "userId", as: "user" });

module.exports = {
  User,
  GithubProfile,
  GithubRepo,
  AiRecommendation,
};
