const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const GithubProfile = sequelize.define("GithubProfile", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },

  followers: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  following: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  publicRepos: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  totalStars: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  totalCommits: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  avatarUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  htmlUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  company: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  contributionHeatmap: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {},
  },

  languages: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {},
  },

  recentActivity: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },

  lastSyncedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = GithubProfile;
