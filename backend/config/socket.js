const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

let io = null;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  // Authentication Middleware
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) {
      return next(new Error("Authentication error: No token provided"));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      next();
    } catch (err) {
      return next(new Error("Authentication error: Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`Socket client connected: User ID ${socket.userId} (Socket ID: ${socket.id})`);
    
    // Join a room unique to the user
    socket.join(`user_${socket.userId}`);

    socket.on("disconnect", () => {
      console.log(`Socket client disconnected: User ID ${socket.userId} (Socket ID: ${socket.id})`);
    });
  });

  return io;
};

const getIO = () => {
  return io; // Returns null if not initialized yet, handlers check for this
};

module.exports = {
  initSocket,
  getIO
};
