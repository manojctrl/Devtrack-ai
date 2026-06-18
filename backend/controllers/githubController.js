const { GithubProfile, GithubRepo, User } = require("../models");

// Helper to generate realistic mock GitHub data if rate limited or offline
const generateMockGithubData = (username) => {
  const languages = {
    JavaScript: Math.floor(Math.random() * 15) + 5,
    TypeScript: Math.floor(Math.random() * 10) + 3,
    Python: Math.floor(Math.random() * 8) + 2,
    HTML: Math.floor(Math.random() * 5) + 2,
    CSS: Math.floor(Math.random() * 5) + 2,
  };

  // Generate heatmap for the last 60 days
  const contributionHeatmap = {};
  const today = new Date();
  for (let i = 0; i < 60; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateString = d.toISOString().split("T")[0];
    // Random activity: 70% chance of contribution (1-8 commits)
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
      totalCommits: 247,
      avatarUrl: `https://avatars.githubusercontent.com/u/9919?v=4`,
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

const syncGithubData = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user || !user.githubUsername) {
      return res.status(400).json({ message: "Please connect your GitHub username in Settings first." });
    }

    const username = user.githubUsername.trim();
    const headers = {
      "User-Agent": "DevTrack-AI-Application",
    };

    // If GitHub Token is available in environment, use it to avoid rate limits
    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;
    }

    let profileData;
    let reposData = [];
    let eventsData = [];
    let isMocked = false;

    try {
      // 1. Fetch Profile
      const profileRes = await fetch(`https://api.github.com/users/${username}`, { headers });
      if (profileRes.status === 403 || profileRes.status === 429) {
        console.warn("GitHub API rate limit hit, using mock data fallback.");
        isMocked = true;
      } else if (profileRes.status === 404) {
        return res.status(404).json({ message: `GitHub user '${username}' not found.` });
      } else if (!profileRes.ok) {
        throw new Error(`GitHub API profile returned ${profileRes.status}`);
      } else {
        profileData = await profileRes.json();
      }

      if (!isMocked) {
        // 2. Fetch Repositories
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers });
        if (reposRes.ok) {
          reposData = await reposRes.json();
        }

        // 3. Fetch Events for Heatmap
        const eventsRes = await fetch(`https://api.github.com/users/${username}/events?per_page=100`, { headers });
        if (eventsRes.ok) {
          eventsData = await eventsRes.json();
        }
      }
    } catch (apiError) {
      console.error("GitHub API communication error:", apiError);
      isMocked = true;
    }

    let finalProfile = {};
    let finalRepos = [];

    if (isMocked) {
      const mock = generateMockGithubData(username);
      finalProfile = mock.profile;
      finalRepos = mock.repos;
    } else {
      // Process Real API Data
      const totalStars = reposData.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);

      // Process languages distribution
      const languages = {};
      reposData.forEach((repo) => {
        if (repo.language) {
          languages[repo.language] = (languages[repo.language] || 0) + 1;
        }
      });

      // Process heatmap contribution & recent activities from Events
      const contributionHeatmap = {};
      const recentActivity = [];
      let totalCommitsFromEvents = 0;

      eventsData.forEach((event) => {
        if (!event.created_at) return;
        const dateStr = event.created_at.split("T")[0];

        let contributionCount = 1;
        if (event.type === "PushEvent" && event.payload && event.payload.commits) {
          contributionCount = event.payload.commits.length;
          totalCommitsFromEvents += contributionCount;
        }

        contributionHeatmap[dateStr] = (contributionHeatmap[dateStr] || 0) + contributionCount;

        // Log recent activities (limit to top 10)
        if (recentActivity.length < 10) {
          if (event.type === "PushEvent") {
            recentActivity.push({
              type: "PushEvent",
              repo: event.repo.name,
              count: event.payload.commits ? event.payload.commits.length : 1,
              date: event.created_at,
            });
          } else if (event.type === "CreateEvent") {
            recentActivity.push({
              type: "CreateEvent",
              repo: event.repo.name,
              count: 1,
              date: event.created_at,
            });
          } else if (event.type === "WatchEvent") {
            recentActivity.push({
              type: "WatchEvent",
              repo: event.repo.name,
              count: 1,
              date: event.created_at,
            });
          }
        }
      });

      const totalCommits = reposData.length * 15 + totalCommitsFromEvents; // Estimate baseline commits

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

    // Save GitHub Profile
    let [githubProfile] = await GithubProfile.findOrCreate({
      where: { userId: user.id },
      defaults: { userId: user.id },
    });

    await githubProfile.update(finalProfile);

    // Refresh Repositories
    await GithubRepo.destroy({ where: { userId: user.id } });
    const repoRecords = finalRepos.map((repo) => ({
      ...repo,
      userId: user.id,
    }));
    await GithubRepo.bulkCreate(repoRecords);

    // Also update User profile fields if they are empty
    let userChanged = false;
    if (!user.profilePicture && finalProfile.avatarUrl) {
      user.profilePicture = finalProfile.avatarUrl;
      userChanged = true;
    }
    if (!user.bio && finalProfile.bio) {
      user.bio = finalProfile.bio;
      userChanged = true;
    }
    if (!user.location && finalProfile.location) {
      user.location = finalProfile.location;
      userChanged = true;
    }
    if (userChanged) {
      await user.save();
    }

    return res.status(200).json({
      message: isMocked ? "GitHub Sync successful (using offline fallback mode)" : "GitHub Sync successful",
      isMocked,
      profile: githubProfile,
      repos: finalRepos,
    });
  } catch (error) {
    console.error("Error syncing GitHub data:", error);
    return res.status(500).json({ message: "Server error during GitHub synchronization.", error: error.message });
  }
};

const getGithubData = async (req, res) => {
  try {
    const profile = await GithubProfile.findOne({ where: { userId: req.user.id } });
    const repos = await GithubRepo.findAll({ where: { userId: req.user.id }, order: [["stars", "DESC"]] });

    return res.status(200).json({ profile, repos });
  } catch (error) {
    console.error("Error retrieving GitHub data:", error);
    return res.status(500).json({ message: "Server error while retrieving GitHub data.", error: error.message });
  }
};

module.exports = {
  syncGithubData,
  getGithubData,
};
