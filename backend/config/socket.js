const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const { User, GithubProfile } = require("../models");

let io = null;

const generateFallbackChatResponse = (user, messages) => {
  const lastMessage = messages[messages.length - 1]?.text || "";
  const query = lastMessage.toLowerCase();

  let reply = "";

  if (query.includes("hello") || query.includes("hi") || query.includes("hey") || query.includes("namaste")) {
    reply = `Hello ${user.firstName || "Developer"}! I am your DevTrack AI Assistant, running in fallback mode because I couldn't connect to the Gemini API. How can I help you today?`;
  } else if (query.includes("portfolio") || query.includes("website") || query.includes("showcase")) {
    reply = `To build a stellar developer portfolio:\n1. Synchronize your GitHub profile.\n2. Complete your settings, bio, and skills list.\n3. Make your profile public so you can share your custom DevTrack link with recruiters!`;
  } else if (query.includes("git") || query.includes("github")) {
    reply = `By linking GitHub, DevTrack parses your commit histories, stars, and pull requests to build an automated skill cloud, heatmaps, and repository analytics.`;
  } else if (query.includes("resume")) {
    reply = `Go to the Resume tab in the dashboard side panel. You can select from Professional, Modern, or Minimal templates and export your CV directly.`;
  } else if (query.includes("skills") || query.includes("road") || query.includes("career")) {
    reply = `I recommend expanding your knowledge of Full-Stack development (React/Next.js, Node.js/Express, databases like Postgres/Mongo) and setting up CI/CD pipelines on GitHub. Check out the Skills tab for complete learning roadmaps!`;
  } else {
    reply = `Hi ${user.firstName || "Developer"}, I am running in offline mode as the Gemini API key is missing or invalid. Please configure a valid \`GEMINI_API_KEY\` starting with \`AIzaSy\` in your backend \`.env\` file to unlock full generative AI capabilities.`;
  }

  return reply;
};

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

    // Chat Message Listener for Streaming Chatbot Responses
    socket.on("chat:message", async (data) => {
      try {
        const { messages } = data;
        if (!messages || !Array.isArray(messages) || messages.length === 0) {
          socket.emit("chat:error", { message: "Chat messages are required." });
          return;
        }

        const user = await User.findByPk(socket.userId);
        if (!user) {
          socket.emit("chat:error", { message: "User not found." });
          return;
        }

        const profile = await GithubProfile.findOne({ where: { userId: user.id } });
        const apiKey = process.env.GEMINI_API_KEY;

        let reply = "";
        let isMocked = false;

        if (!apiKey || apiKey === "your_gemini_api_key_here" || apiKey.trim() === "" || !apiKey.startsWith("AIzaSy")) {
          reply = generateFallbackChatResponse(user, messages);
          isMocked = true;
        } else {
          try {
            const topLangs = profile?.languages 
              ? Object.keys(profile.languages).join(", ") 
              : "";
            
            const systemPrompt = `You are DevTrack AI Assistant, an elite technical career coach, programming mentor, and portfolio advisor integrated into the DevTrack AI platform.
You are chatting with ${user.firstName} ${user.lastName}.
Here is their profile info:
- Name: ${user.firstName} ${user.lastName}
- Bio: ${user.bio || "None provided"}
- Location: ${user.location || "None provided"}
- GitHub: ${user.githubUsername || "Not connected"}
${profile ? `- GitHub Stats: ${profile.publicRepos} public repos, ${profile.totalStars} stars, ${profile.totalCommits} commits` : ""}
${topLangs ? `- Top Languages: ${topLangs}` : ""}

Be helpful, technically precise, encouraging, and brief in your responses. Answer code queries, project ideas, portfolio tips, or career guidance. You can speak in English or Nepali based on what language they ask you in.`;

            const geminiContents = messages.map(msg => {
              const role = msg.sender === 'user' ? 'user' : 'model';
              return {
                role: role,
                parts: [{ text: msg.text }]
              };
            });

            const requestBody = {
              systemInstruction: {
                parts: [{ text: systemPrompt }]
              },
              contents: geminiContents
            };

            const response = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
              }
            );

            if (!response.ok) {
              throw new Error(`Gemini API status ${response.status}`);
            }

            const responseJson = await response.json();
            reply = responseJson.candidates[0].content.parts[0].text;
          } catch (error) {
            console.error("Gemini socket error, falling back:", error);
            reply = generateFallbackChatResponse(user, messages) + "\n\n*(Note: Running in offline fallback mode. Gemini API connection error)*";
            isMocked = true;
          }
        }

        if (isMocked && !reply.includes("offline fallback mode")) {
          reply += "\n\n*(Note: Running in offline fallback mode. Please configure a valid GEMINI_API_KEY starting with 'AIzaSy' in backend/.env)*";
        }

        // Stream the reply back to client
        socket.emit("chat:start");

        const words = reply.split(" ");
        let currentText = "";
        
        for (let i = 0; i < words.length; i++) {
          currentText += (i === 0 ? "" : " ") + words[i];
          socket.emit("chat:chunk", { text: currentText });
          // Control the speed of the typing effect
          await new Promise((resolve) => setTimeout(resolve, 35));
        }

        socket.emit("chat:end");
      } catch (err) {
        console.error("Socket chat error:", err);
        socket.emit("chat:error", { message: "Server error during chat processing." });
      }
    });

    socket.on("disconnect", () => {
      console.log(`Socket client disconnected: User ID ${socket.userId} (Socket ID: ${socket.id})`);
    });
  });

  return io;
};

const getIO = () => {
  return io;
};

module.exports = {
  initSocket,
  getIO
};
