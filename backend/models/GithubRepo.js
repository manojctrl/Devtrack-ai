const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const GithubRepo = sequelize.define("GithubRepo", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  htmlUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  stars: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  forks: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  language: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = GithubRepo;
