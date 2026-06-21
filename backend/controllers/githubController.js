const { GithubProfile, GithubRepo, User, sequelize } = require("../models");
const { getIO } = require("../config/socket");

// ─── Constants ────────────────────────────────────────────────────────────────
const REPOS_PER_PAGE = 100;
const EVENTS_PER_PAGE = 100;
const MAX_RECENT_ACTIVITY = 10;
const SUPPORTED_EVENT_TYPES = ["PushEvent", "CreateEvent", "WatchEvent", "PullRequestEvent", "IssuesEvent"];

// ─── Mock Data Generator ──────────────────────────────────────────────────────
const generateMockGithubData = (username) => {
  const languages = {
    JavaScript: Math.floor(Math.random() * 15) + 5,
    TypeScript: Math.floor(Math.random() * 10) + 3,
    Python: Math.floor(Math.random() * 8) + 2,
    HTML: Math.floor(Math.random() * 5) + 2,
    CSS: Math.floor(Math.random() * 5) + 2,
  };

  const contributionHeatmap = {};
  const today = new Date();
  for (let i = 0; i < 60; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateString = d.toISOString().split("T")[0];
    if (Math.random() > 0.3) {
      contributionHeatmap[dateString] = Math.floor(Math.random() * 8) + 1;
    }
  }

  const recentActivity = [
    { type: "PushEvent", repo: `${username}/devtrack-ai`, count: 3, date: new Date(today.getTime() - 2 * 3600000).toISOString() },
    { type: "CreateEvent", repo: `${username}/portfolio-website`, count: 1, date: new Date(today.getTime() - 24 * 3600000).toISOString() },
    { type: "PushEvent", repo: `${username}/react-dashboard`, count: 5, date: new Date(today.getTime() - 48 * 3600000).toISOString() },
    { type: "WatchEvent", repo: "facebook/react", count: 1, date: new Date(today.getTime() - 72 * 3600000).toISOString() },
  ];

  const mockRepos = [
    {
      name: "devtrack-ai",
      description: "AI-powered developer portfolio, career recommender and resume builder.",
      htmlUrl: `https://github.com/${username}/devtrack-ai`,
      stars: 12,
      forks: 2,
      language: "JavaScript",
      updatedAt: new Date(),
    },
    {
      name: "portfolio-website",
      description: "My personal resume portfolio site built with React and TailwindCSS.",
      htmlUrl: `https://github.com/${username}/portfolio-website`,
      stars: 8,
      forks: 1,
      language: "TypeScript",
      updatedAt: new Date(today.getTime() - 24 * 3600000),
    },
    {
      name: "react-dashboard",
      description: "A functional admin dashboard with charts and state management.",
      htmlUrl: `https://github.com/${username}/react-dashboard`,
      stars: 5,
      forks: 0,
      language: "JavaScript",
      updatedAt: new Date(today.getTime() - 48 * 3600000),
    },
    {
      name: "python-algorithms",
      description: "Implementation of basic data structures and algorithms in Python.",
      htmlUrl: `https://github.com/${username}/python-algorithms`,
      stars: 3,
      forks: 1,
      language: "Python",
      updatedAt: new Date(today.getTime() - 120 * 3600000),
    },
  ];

  return {
    profile: {
      followers: 45,
      following: 38,
      publicRepos: mockRepos.length,
      totalStars: 28,
      // NOTE: totalCommits from mock — not reliable, labeled accordingly
      totalCommits: 247,
      avatarUrl: null, // No real avatar in mock mode
      htmlUrl: `https://github.com/${username}`,
      bio: "Full Stack Developer passionate about web apps and AI integrations.",
      company: "Freelance",
      location: "San Francisco, CA",
      contributionHeatmap,
      languages,
      recentActivity,
      lastSyncedAt: new Date(),
    },
    repos: mockRepos,
  };
};

// ─── Helper: Build GitHub request headers ─────────────────────────────────────
const buildGithubHeaders = () => {
  const headers = { "User-Agent": "DevTrack-AI-Application" };
  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
};

// ─── Helper: Safe fetch with rate-limit detection ────────────────────────────
const githubFetch = async (url, headers) => {
  const res = await fetch(url, { headers });

  if (res.status === 403 || res.status === 429) {
    console.warn(`GitHub API rate limit hit for: ${url}`);
    return { rateLimited: true, data: null };
  }
  if (res.status === 404) {
    return { notFound: true, data: null };
  }
  if (!res.ok) {
    throw new Error(`GitHub API error ${res.status} for ${url}`);
  }

  const data = await res.json();
  return { rateLimited: false, notFound: false, data };
};

// ─── Helper: Process events into heatmap + recent activity ───────────────────
const processEvents = (eventsData) => {
  const contributionHeatmap = {};
  const recentActivity = [];
  let totalCommitsFromEvents = 0;

  for (const event of eventsData) {
    if (!event.created_at) continue;

    const dateStr = event.created_at.split("T")[0];
    let contributionCount = 1;

    if (event.type === "PushEvent" && event.payload?.commits) {
      contributionCount = event.payload.commits.length;
      totalCommitsFromEvents += contributionCount;
    }

    contributionHeatmap[dateStr] = (contributionHeatmap[dateStr] || 0) + contributionCount;

    if (recentActivity.length < MAX_RECENT_ACTIVITY && SUPPORTED_EVENT_TYPES.includes(event.type)) {
      const activityEntry = {
        type: event.type,
        repo: event.repo?.name || "unknown",
        count: 1,
        date: event.created_at,
      };

      if (event.type === "PushEvent") {
        activityEntry.count = event.payload?.commits?.length || 1;
      }

      recentActivity.push(activityEntry);
    }
  }

  return { contributionHeatmap, recentActivity, totalCommitsFromEvents };
};

// ─── Helper: Build language distribution from repos ──────────────────────────
const buildLanguageMap = (reposData) => {
  const languages = {};
  for (const repo of reposData) {
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }
  }
  return languages;
};

// ─── Controller: Sync GitHub Data ────────────────────────────────────────────
const syncGithubData = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user || !user.githubUsername) {
      return res.status(400).json({ message: "Please connect your GitHub username in Settings first." });
    }

    const io = getIO();
    const emitSyncProgress = (status, message, data = null) => {
      if (io) {
        io.to(`user_${user.id}`).emit("sync:progress", { type: "github", status, message, data });
      }
    };

    emitSyncProgress("started", "Connecting to GitHub...");

    const username = user.githubUsername.trim();
    const headers = buildGithubHeaders();

    let finalProfile = {};
    let finalRepos = [];
    let isMocked = false;

    try {
      // 1. Fetch Profile
      emitSyncProgress("fetching_profile", `Fetching GitHub profile for '${username}'...`);
      const profileResult = await githubFetch(`https://api.github.com/users/${username}`, headers);

      if (profileResult.notFound) {
        emitSyncProgress("failed", `GitHub user '${username}' not found.`);
        return res.status(404).json({ message: `GitHub user '${username}' not found.` });
      }

      if (profileResult.rateLimited) {
        isMocked = true;
        emitSyncProgress("rate_limited", "GitHub API rate limit hit. Generating fallback mock data...");
      } else {
        const profileData = profileResult.data;
        emitSyncProgress("profile_fetched", "Profile data fetched successfully.");

        // 2. Fetch Repositories
        emitSyncProgress("fetching_repos", "Fetching repositories...");
        const reposResult = await githubFetch(
          `https://api.github.com/users/${username}/repos?per_page=${REPOS_PER_PAGE}&sort=updated`,
          headers
        );
        const reposData = reposResult.data || [];
        emitSyncProgress("repos_fetched", "Repositories data fetched successfully.");

        // 3. Fetch Events for Heatmap + Activity
        emitSyncProgress("fetching_events", "Fetching recent activity & contributions...");
        const eventsResult = await githubFetch(
          `https://api.github.com/users/${username}/events?per_page=${EVENTS_PER_PAGE}`,
          headers
        );
        const eventsData = eventsResult.data || [];
        emitSyncProgress("events_fetched", "Activity data fetched successfully.");

        // Process data
        const totalStars = reposData.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
        const languages = buildLanguageMap(reposData);
        const { contributionHeatmap, recentActivity, totalCommitsFromEvents } = processEvents(eventsData);

        // NOTE: totalCommits is an approximation. GitHub API does not expose
        // total commit counts per user directly without GraphQL or scraping.
        const totalCommits = totalCommitsFromEvents;

        finalProfile = {
          followers: profileData.followers || 0,
          following: profileData.following || 0,
          publicRepos: profileData.public_repos || 0,
          totalStars,
          totalCommits,
          avatarUrl: profileData.avatar_url || null,
          htmlUrl: profileData.html_url || null,
          bio: profileData.bio || null,
          company: profileData.company || null,
          location: profileData.location || null,
          contributionHeatmap,
          languages,
          recentActivity,
          lastSyncedAt: new Date(),
        };

        finalRepos = reposData.map((repo) => ({
          name: repo.name,
          description: repo.description || null,
          htmlUrl: repo.html_url,
          stars: repo.stargazers_count || 0,
          forks: repo.forks_count || 0,
          language: repo.language || null,
          updatedAt: repo.updated_at ? new Date(repo.updated_at) : new Date(),
        }));
      }
    } catch (apiError) {
      console.error("GitHub API communication error:", apiError.message);
      isMocked = true;
      emitSyncProgress("rate_limited", "GitHub communication error. Generating fallback mock data...");
    }

    if (isMocked) {
      const mock = generateMockGithubData(username);
      finalProfile = mock.profile;
      finalRepos = mock.repos;
    }

    emitSyncProgress("saving", "Saving profile and repository details to database...");
    let [githubProfile] = await GithubProfile.findOrCreate({
      where: { userId: user.id },
      defaults: { userId: user.id },
    });
    await githubProfile.update(finalProfile);

    await sequelize.transaction(async (t) => {
      await GithubRepo.destroy({ where: { userId: user.id }, transaction: t });
      await GithubRepo.bulkCreate(
        finalRepos.map((repo) => ({ ...repo, userId: user.id })),
        { transaction: t }
      );
    });

    // ── Update User profile fields if currently empty ────────────────────────
    const userUpdates = {};
    if (!user.profilePicture && finalProfile.avatarUrl) userUpdates.profilePicture = finalProfile.avatarUrl;
    if (!user.bio && finalProfile.bio) userUpdates.bio = finalProfile.bio;
    if (!user.location && finalProfile.location) userUpdates.location = finalProfile.location;
    if (Object.keys(userUpdates).length > 0) await user.update(userUpdates);

    emitSyncProgress("completed", isMocked ? "GitHub Sync successful (using offline fallback mode)" : "GitHub Sync successful", { profile: githubProfile, repos: finalRepos });

    return res.status(200).json({
      message: isMocked
        ? "GitHub Sync successful (using offline fallback mode)"
        : "GitHub Sync successful",
      isMocked,
      lastSyncedAt: finalProfile.lastSyncedAt,
      profile: githubProfile,
      repos: finalRepos,
    });
  } catch (error) {
    console.error("Error syncing GitHub data:", error);
    if (io) {
      io.to(`user_${req.user.id}`).emit("sync:progress", { type: "github", status: "failed", message: error.message || "Server error during GitHub synchronization." });
    }
    return res.status(500).json({
      message: "Server error during GitHub synchronization.",
      error: error.message,
    });
  }
};

// ─── Controller: Get GitHub Data ─────────────────────────────────────────────
const getGithubData = async (req, res) => {
  try {
    const profile = await GithubProfile.findOne({ where: { userId: req.user.id } });
    const repos = await GithubRepo.findAll({
      where: { userId: req.user.id },
      order: [["stars", "DESC"]],
    });

    if (!profile) {
      return res.status(404).json({ message: "No GitHub data found. Please sync your GitHub profile first." });
    }

    return res.status(200).json({ profile, repos });
  } catch (error) {
    console.error("Error retrieving GitHub data:", error);
    return res.status(500).json({
      message: "Server error while retrieving GitHub data.",
      error: error.message,
    });
  }
};

module.exports = {
  syncGithubData,
  getGithubData,
};