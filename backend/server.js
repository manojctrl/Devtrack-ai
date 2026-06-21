require("dotenv").config();

const http = require("http");
const app = require("./app");
const sequelize = require("./config/database");
const { initSocket } = require("./config/socket");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
initSocket(server);

sequelize
  .authenticate()
  .then(async () => {
    console.log("Database connected");

    // Load models and relations
    require("./models");

    await sequelize.sync();

    console.log("Tables synced");

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database error:", err);
  });
