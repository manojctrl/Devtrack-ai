require("dotenv").config();
const User = require("./models/User");

const app = require("./app");
const sequelize = require("./config/database");

const PORT = process.env.PORT || 5000;

sequelize
  .authenticate()
  .then(async () => {
    console.log("✅ Database Connected");

    await sequelize.sync();

    console.log("✅ Tables Synced");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ Database Error:", err);
  });