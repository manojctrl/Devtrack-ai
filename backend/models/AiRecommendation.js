const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const AiRecommendation = sequelize.define("AiRecommendation", {
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

  roleSuggestions: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },

  learningRoadmap: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },

  skillGaps: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },

  recommendations: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },
});

module.exports = AiRecommendation;
