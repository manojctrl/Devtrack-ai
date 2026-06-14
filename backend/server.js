require("dotenv").config();

const app = require("./app");
const sequelize = require("./config/database");

const PORT = process.env.PORT || 5000;

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ Database Error:", err);
  });