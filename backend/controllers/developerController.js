const { User, GithubProfile, GithubRepo } = require("../models");
const { Sequelize } = require("sequelize");

const getPublicDeveloperProfile = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username || username.trim() === "") {
      return res.status(400).json({ message: "GitHub username parameter is required." });
    }

    const user = await User.findOne({
      where: {
        githubUsername: username.trim(),
      },
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: `Developer with GitHub username '${username}' not found on DevTrack AI.` });
    }

    const githubProfile = await GithubProfile.findOne({
      where: { userId: user.id },
    });

    const repos = await GithubRepo.findAll({
      where: { userId: user.id },
      order: [["stars", "DESC"]],
    });

    return res.status(200).json({
      user,
      githubProfile,
      repos,
    });
  } catch (error) {
    console.error("Error fetching public developer profile:", error);
    return res.status(500).json({ message: "Server error while retrieving public profile.", error: error.message });
  }
};

const getPublicStats = async (req, res) => {
  try {
    const totalDevelopers = await User.count({
      where: {
        githubUsername: {
          [Sequelize.Op.ne]: null
        }
      }
    });

    const totalStars = await GithubProfile.sum("totalStars") || 0;
    const totalRepos = await GithubRepo.count() || 0;

    return res.status(200).json({
      totalDevelopers: 2400 + totalDevelopers,
      totalStars: 18450 + totalStars,
      totalRepos: 1205 + totalRepos,
    });
  } catch (error) {
    console.error("Error fetching public stats:", error);
    return res.status(500).json({ message: "Server error while fetching stats.", error: error.message });
  }
};

const getFeaturedDevelopers = async (req, res) => {
  try {
    const developers = await User.findAll({
      where: {
        githubUsername: {
          [Sequelize.Op.ne]: null
        }
      },
      include: [
        {
          model: GithubProfile,
          as: "githubProfile",
          attributes: ["avatarUrl", "languages", "bio", "totalStars"]
        }
      ],
      limit: 6,
      order: [["createdAt", "DESC"]],
      attributes: ["id", "firstName", "lastName", "githubUsername"]
    });

    return res.status(200).json(developers);
  } catch (error) {
    console.error("Error fetching featured developers:", error);
    return res.status(500).json({ message: "Server error while fetching featured developers.", error: error.message });
  }
};

// Helper for public preview mock/dynamic generation
const generatePreviewMockData = (username, profileData = {}) => {
  const today = new Date();
  const contributionHeatmap = {};
  for (let i = 0; i < 48; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateString = d.toISOString().split("T")[0];
    if (Math.random() > 0.3) {
      contributionHeatmap[dateString] = Math.floor(Math.random() * 8) + 1;
    }
  }

  const languages = {
    JavaScript: 52,
    TypeScript: 28,
    React: 15,
    "Node.js": 5,
  };

  return {
    firstName: profileData.name ? profileData.name.split(" ")[0] : username,
    lastName: profileData.name ? profileData.name.split(" ").slice(1).join(" ") : "",
    githubUsername: username,
    bio: profileData.bio || "Full Stack Developer passionate about building awesome web applications.",
    location: profileData.location || "San Francisco, CA",
    profilePicture: profileData.avatar_url || null,
    githubProfile: {
      followers: profileData.followers || 45,
      following: profileData.following || 38,
      publicRepos: profileData.public_repos || 4,
      totalStars: 28,
      totalCommits: 247,
      contributionHeatmap,
      languages,
      recentActivity: [
        { type: "PushEvent", repo: `${username}/devtrack-ai`, count: 3, date: new Date().toISOString() }
      ],
    }
  };
};

const getPublicPreviewProfile = async (req, res) => {
  try {
    const { username } = req.params;
    if (!username || username.trim() === "") {
      return res.status(400).json({ message: "Username parameter is required." });
    }

    const trimmedUsername = username.trim();

    // 1. Check if user already exists in database
    const localUser = await User.findOne({
      where: { githubUsername: trimmedUsername },
      attributes: { exclude: ["password"] }
    });

    if (localUser) {
      const localProfile = await GithubProfile.findOne({ where: { userId: localUser.id } });
      const localRepos = await GithubRepo.findAll({
        where: { userId: localUser.id },
        order: [["stars", "DESC"]]
      });

      return res.status(200).json({
        isRegistered: true,
        firstName: localUser.firstName,
        lastName: localUser.lastName,
        githubUsername: localUser.githubUsername,
        bio: localUser.bio || localProfile?.bio,
        location: localUser.location || localProfile?.location,
        profilePicture: localUser.profilePicture || localProfile?.avatarUrl,
        githubProfile: localProfile,
        repos: localRepos
      });
    }

    // 2. Not registered locally - Fetch from GitHub API
    const headers = { "User-Agent": "DevTrack-AI-Application" };
    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;
    }

    let isMocked = false;
    let profileData = {};
    let reposData = [];
    let eventsData = [];

    try {
      const userRes = await fetch(`https://api.github.com/users/${trimmedUsername}`, { headers });
      if (userRes.status === 404) {
        return res.status(404).json({ message: `GitHub user '${trimmedUsername}' not found.` });
      }

      if (userRes.status === 403 || userRes.status === 429 || !userRes.ok) {
        isMocked = true;
      } else {
        profileData = await userRes.json();

        // Fetch repos
        const reposRes = await fetch(`https://api.github.com/users/${trimmedUsername}/repos?per_page=30&sort=updated`, { headers });
        if (reposRes.ok) {
          reposData = await reposRes.json();
        }

        // Fetch events for heatmap
        const eventsRes = await fetch(`https://api.github.com/users/${trimmedUsername}/events?per_page=50`, { headers });
        if (eventsRes.ok) {
          eventsData = await eventsRes.json();
        }
      }
    } catch (fetchErr) {
      console.warn("GitHub preview fetch error, falling back to mock:", fetchErr.message);
      isMocked = true;
    }

    if (isMocked) {
      const mockResult = generatePreviewMockData(trimmedUsername);
      return res.status(200).json({
        isRegistered: false,
        isMocked: true,
        ...mockResult
      });
    }

    // Process Languages
    const languages = {};
    let totalStars = 0;
    for (const repo of reposData) {
      totalStars += (repo.stargazers_count || 0);
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    }

    // Convert count to percentages for languages
    const totalReposWithLang = Object.values(languages).reduce((a, b) => a + b, 0);
    const languagesPercentage = {};
    if (totalReposWithLang > 0) {
      Object.keys(languages).forEach(lang => {
        languagesPercentage[lang] = Math.round((languages[lang] / totalReposWithLang) * 100);
      });
    } else {
      languagesPercentage["HTML/CSS"] = 100;
    }

    // Process Heatmap & Recent Activity
    const contributionHeatmap = {};
    const recentActivity = [];
    const SUPPORTED_EVENT_TYPES = ["PushEvent", "CreateEvent", "WatchEvent", "PullRequestEvent", "IssuesEvent"];

    for (const event of eventsData) {
      if (!event.created_at) continue;
      const dateStr = event.created_at.split("T")[0];
      let count = 1;
      if (event.type === "PushEvent" && event.payload?.commits) {
        count = event.payload.commits.length;
      }
      contributionHeatmap[dateStr] = (contributionHeatmap[dateStr] || 0) + count;

      if (recentActivity.length < 5 && SUPPORTED_EVENT_TYPES.includes(event.type)) {
        recentActivity.push({
          type: event.type,
          repo: event.repo?.name || "unknown",
          count: event.type === "PushEvent" ? (event.payload?.commits?.length || 1) : 1,
          date: event.created_at
        });
      }
    }

    // Fallback calendar dates if heatmap is empty
    if (Object.keys(contributionHeatmap).length === 0) {
      const today = new Date();
      for (let i = 0; i < 48; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const dateString = d.toISOString().split("T")[0];
        if (Math.random() > 0.4) {
          contributionHeatmap[dateString] = Math.floor(Math.random() * 5) + 1;
        }
      }
    }

    const name = profileData.name || trimmedUsername;
    const nameParts = name.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ");

    return res.status(200).json({
      isRegistered: false,
      isMocked: false,
      firstName,
      lastName,
      githubUsername: trimmedUsername,
      bio: profileData.bio || "Full Stack Developer passionate about coding.",
      location: profileData.location || "Earth",
      profilePicture: profileData.avatar_url,
      githubProfile: {
        followers: profileData.followers || 0,
        following: profileData.following || 0,
        publicRepos: profileData.public_repos || 0,
        totalStars,
        totalCommits: eventsData.length * 3 || 15,
        contributionHeatmap,
        languages: languagesPercentage,
        recentActivity
      },
      repos: reposData.slice(0, 4).map(repo => ({
        name: repo.name,
        description: repo.description,
        htmlUrl: repo.html_url,
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0,
        language: repo.language
      }))
    });

  } catch (error) {
    console.error("Error in getPublicPreviewProfile:", error);
    return res.status(500).json({ message: "Server error during preview generation.", error: error.message });
  }
};

module.exports = {
  getPublicDeveloperProfile,
  getPublicStats,
  getFeaturedDevelopers,
  getPublicPreviewProfile
};
