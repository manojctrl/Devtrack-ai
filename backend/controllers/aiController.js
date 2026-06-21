const { GithubProfile, GithubRepo, AiRecommendation, User } = require("../models");
const { getIO } = require("../config/socket");

// Robust fallback recommendation generator based on user's actual languages
const generateFallbackRecommendations = (user, profile, repos) => {
  const primaryLanguages = Object.keys(profile?.languages || {}).slice(0, 3);
  const mainLang = primaryLanguages[0] || "JavaScript";

  let roleSuggestions = [];
  let learningRoadmap = [];
  let skillGaps = [];
  let recommendations = [];

  if (mainLang === "JavaScript" || mainLang === "TypeScript") {
    roleSuggestions = [
      {
        role: "Frontend Developer",
        matchPercentage: 92,
        reason: `Based on your heavy usage of ${mainLang} and UI repositories, you have strong foundations in client-side engineering.`,
      },
      {
        role: "Full Stack Engineer",
        matchPercentage: 85,
        reason: "You have experience building cohesive frontend apps. Expanding into database management will make you a strong full-stack candidate.",
      },
      {
        role: "Mobile App Developer (React Native)",
        matchPercentage: 75,
        reason: "Your JavaScript/TypeScript skills translate directly to cross-platform mobile frameworks like React Native.",
      },
    ];

    learningRoadmap = [
      {
        topic: "Next.js & Server Components",
        importance: "High",
        resources: "Next.js official documentation (App Router guide), Vercel tutorials.",
      },
      {
        topic: "TypeScript Deep Dive",
        importance: "High",
        resources: "TypeScript handbook, 'Effective TypeScript' book.",
      },
      {
        topic: "System Design & State Management",
        importance: "Medium",
        resources: "Zustand / Redux Toolkit docs, Frontend Masters System Design courses.",
      },
    ];

    skillGaps = [
      {
        skill: "Backend Architecture",
        gapDescription: "Your repository history shows mostly frontend/client applications. Building robust REST/GraphQL APIs will bridge this gap.",
      },
      {
        skill: "Relational Databases",
        gapDescription: "No evidence of database schemas, SQL queries, or advanced indexing in your public repositories.",
      },
    ];

    recommendations = [
      "Create a full-stack project utilizing Next.js, PostgreSQL, and Prisma ORM to demonstrate end-to-end capabilities.",
      "Convert your existing JavaScript projects to TypeScript to show enterprise-ready code quality.",
      "Incorporate unit testing frameworks like Jest or Vitest in your next project.",
    ];
  } else if (mainLang === "Python") {
    roleSuggestions = [
      {
        role: "Backend Engineer",
        matchPercentage: 90,
        reason: "You possess strong Python foundations, which are ideal for Django/FastAPI backend API services.",
      },
      {
        role: "Data Engineer / Analyst",
        matchPercentage: 80,
        reason: "Python is the industry standard for data manipulation, ETL pipelines, and analytical processing.",
      },
      {
        role: "Machine Learning Engineer",
        matchPercentage: 70,
        reason: "Your Python codebase serves as a great starting point for integrating TensorFlow/PyTorch architectures.",
      },
    ];

    learningRoadmap = [
      {
        topic: "FastAPI / Django REST Framework",
        importance: "High",
        resources: "FastAPI official tutorial, Real Python backend courses.",
      },
      {
        topic: "Docker & Containerization",
        importance: "High",
        resources: "Docker docs, freeCodeCamp Docker containerization course.",
      },
      {
        topic: "Database Design & SQL",
        importance: "High",
        resources: "SQLBolt interactive tutorial, PostgreSQL administration guides.",
      },
    ];

    skillGaps = [
      {
        skill: "Cloud Deployment & DevOps",
        gapDescription: "Your projects are mostly run locally. Deploying apps to AWS/Render and setting up CI/CD pipelines is recommended.",
      },
      {
        skill: "Client-Side Integration",
        gapDescription: "Your repos are backend-heavy. Gaining familiarity with frontend frameworks like React will improve collaboration.",
      },
    ];

    recommendations = [
      "Build a microservice API using FastAPI, Dockerize it, and deploy it to a cloud provider with a PostgreSQL database.",
      "Integrate basic frontend capabilities into your projects or build a React dashboard that queries your Python backend.",
      "Write comprehensive test suites using pytest and configure GitHub Actions for automated testing.",
    ];
  } else {
    // General developer fallback
    roleSuggestions = [
      {
        role: "Software Engineer",
        matchPercentage: 85,
        reason: "You show solid programming structure and project organization across your public repositories.",
      },
      {
        role: "Full Stack Developer",
        matchPercentage: 78,
        reason: "Your portfolio indicates adaptable problem-solving skills across various programming scripts.",
      },
    ];

    learningRoadmap = [
      {
        topic: "Advanced Data Structures & Algorithms",
        importance: "High",
        resources: "Leetcode, 'Cracking the Coding Interview' study plan.",
      },
      {
        topic: "System Architecture & API Design",
        importance: "High",
        resources: "REST API Design principles, System Design Primer.",
      },
    ];

    skillGaps = [
      {
        skill: "Modern Frontend Web Frameworks",
        gapDescription: "Familiarity with frameworks like React, Vue, or Angular is highly valued in the industry.",
      },
    ];

    recommendations = [
      "Create a multi-tiered web application demonstrating complete client-server-database integrations.",
      "Document your repositories with detailed READMEs explaining architectural design choices.",
    ];
  }

  return {
    roleSuggestions,
    learningRoadmap,
    skillGaps,
    recommendations,
  };
};

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

const generateAiRecommendations = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const io = getIO();
    const emitSyncProgress = (status, message, data = null) => {
      if (io) {
        io.to(`user_${user.id}`).emit("sync:progress", { type: "ai", status, message, data });
      }
    };

    emitSyncProgress("ai_started", "Generating AI career insights...");

    const profile = await GithubProfile.findOne({ where: { userId: user.id } });
    const repos = await GithubRepo.findAll({ where: { userId: user.id }, order: [["stars", "DESC"]] });

    if (!profile) {
      emitSyncProgress("ai_failed", "Please sync your GitHub profile before generating recommendations.");
      return res.status(400).json({ message: "Please sync your GitHub profile before generating recommendations." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    let recommendationsData;
    let isMocked = false;

    if (!apiKey || apiKey === "your_gemini_api_key_here" || apiKey.trim() === "" || !apiKey.startsWith("AIzaSy")) {
      console.warn("GEMINI_API_KEY not set or invalid, generating fallback recommendations offline.");
      recommendationsData = generateFallbackRecommendations(user, profile, repos);
      isMocked = true;
    } else {
      try {
        const topLanguages = Object.entries(profile.languages || {})
          .map(([lang, count]) => `${lang} (${count} repos)`)
          .join(", ");

        const topRepos = repos
          .slice(0, 8)
          .map((r) => `- ${r.name}: ${r.description || "No description"}. Language: ${r.language || "Unknown"}. Stars: ${r.stars}`)
          .join("\n");

        const promptText = `
You are an expert technical career coach and resume analyst.
Analyze the following developer profile and return a detailed, professional career recommendation.

DEVELOPER PROFILE:
- Name: ${user.firstName} ${user.lastName}
- Bio: ${user.bio || "None provided"}
- Location: ${user.location || "None provided"}
- GitHub Stats: ${profile.publicRepos} public repos, ${profile.totalStars} stars, ${profile.totalCommits} commits
- Top Languages: ${topLanguages}
- Top Repositories:
${topRepos}

You MUST return a JSON response containing exactly these four properties. Do not wrap it in markdown block tags other than the JSON itself.
JSON Structure:
{
  "roleSuggestions": [
    { "role": "string", "matchPercentage": number, "reason": "string" }
  ],
  "learningRoadmap": [
    { "topic": "string", "importance": "string (High/Medium/Low)", "resources": "string" }
  ],
  "skillGaps": [
    { "skill": "string", "gapDescription": "string" }
  ],
  "recommendations": [
    "string (actionable advice item)"
  ]
}
`;

        const requestBody = {
          contents: [
            {
              parts: [
                {
                  text: promptText,
                },
              ],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json",
          },
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
          throw new Error(`Gemini API returned status code ${response.status}`);
        }

        const responseJson = await response.json();
        const jsonText = responseJson.candidates[0].content.parts[0].text;
        recommendationsData = JSON.parse(jsonText);
      } catch (geminiError) {
        console.error("Gemini AI API execution error, falling back to offline generator:", geminiError);
        recommendationsData = generateFallbackRecommendations(user, profile, repos);
        isMocked = true;
      }
    }

    // Save recommendations
    let [aiRec] = await AiRecommendation.findOrCreate({
      where: { userId: user.id },
      defaults: { userId: user.id },
    });

    await aiRec.update({
      roleSuggestions: recommendationsData.roleSuggestions || [],
      learningRoadmap: recommendationsData.learningRoadmap || [],
      skillGaps: recommendationsData.skillGaps || [],
      recommendations: recommendationsData.recommendations || [],
    });

    emitSyncProgress("ai_completed", isMocked ? "AI Career insights generated (offline fallback)" : "AI Career insights generated successfully", { recommendations: aiRec });

    return res.status(200).json({
      message: isMocked ? "Recommendations generated (offline fallback)" : "Recommendations generated successfully",
      isMocked,
      recommendations: aiRec,
    });
  } catch (error) {
    console.error("Error generating career recommendations:", error);
    if (io) {
      io.to(`user_${req.user.id}`).emit("sync:progress", { type: "ai", status: "ai_failed", message: error.message || "Error generating career recommendations." });
    }
    return res.status(500).json({ message: "Server error during recommendation analysis.", error: error.message });
  }
};

const getAiRecommendations = async (req, res) => {
  try {
    const recommendations = await AiRecommendation.findOne({ where: { userId: req.user.id } });
    return res.status(200).json({ recommendations });
  } catch (error) {
    console.error("Error retrieving recommendations:", error);
    return res.status(500).json({ message: "Server error while retrieving recommendations.", error: error.message });
  }
};

const handleAiChat = async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ message: "Chat messages are required." });
    }

    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const profile = await GithubProfile.findOne({ where: { userId: user.id } });
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === "your_gemini_api_key_here" || apiKey.trim() === "" || !apiKey.startsWith("AIzaSy")) {
      console.warn("GEMINI_API_KEY is not set or invalid, generating fallback chatbot reply.");
      const reply = generateFallbackChatResponse(user, messages);
      return res.status(200).json({
        reply: reply + "\n\n*(Note: Running in offline fallback mode. Please configure a valid GEMINI_API_KEY starting with 'AIzaSy' in backend/.env)*"
      });
    }

    // Format prompt instructions with user context
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

    // Map frontend messages into Gemini contents format
    // Frontend structure: [ { sender: 'user'/'bot', text: '...' } ]
    // We map to Gemini's format: [ { role: 'user'/'model', parts: [{ text: '...' }] } ]
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
      const errText = await response.text();
      throw new Error(`Gemini API returned status code ${response.status}: ${errText}`);
    }

    const responseJson = await response.json();
    const botResponseText = responseJson.candidates[0].content.parts[0].text;

    return res.status(200).json({
      reply: botResponseText
    });
  } catch (error) {
    console.error("Error in AI Chatbot, falling back to offline responder:", error);
    try {
      const user = await User.findByPk(req.user.id);
      const reply = generateFallbackChatResponse(user || {}, messages);
      return res.status(200).json({
        reply: reply + "\n\n*(Note: Running in offline fallback mode. There was an error connecting to the Gemini API. Please check your GEMINI_API_KEY configuration)*"
      });
    } catch (fallbackErr) {
      const reply = generateFallbackChatResponse({}, messages);
      return res.status(200).json({
        reply: reply
      });
    }
  }
};

module.exports = {
  generateAiRecommendations,
  getAiRecommendations,
  handleAiChat,
};

