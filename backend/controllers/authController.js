const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, githubUsername, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: "Please fill in all required fields",
      });
    }

    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      githubUsername,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        githubUsername: user.githubUsername,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const githubAuth = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ message: "Authorization code is required" });
    }

    // Exchange code for token
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return res.status(400).json({
        message: "GitHub authentication failed",
        error: tokenData.error_description || tokenData.error,
      });
    }

    const accessToken = tokenData.access_token;

    // Fetch user profile
    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "User-Agent": "DevTrack-App",
      },
    });

    const githubProfile = await userResponse.json();

    if (!githubProfile.login) {
      return res.status(400).json({ message: "Failed to retrieve GitHub profile" });
    }

    // Fetch user emails (required to get primary/verified emails if email is private)
    const emailsResponse = await fetch("https://api.github.com/user/emails", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "User-Agent": "DevTrack-App",
      },
    });

    let email = githubProfile.email;
    if (emailsResponse.ok) {
      const emails = await emailsResponse.json();
      if (Array.isArray(emails)) {
        const primaryEmail = emails.find((e) => e.primary && e.verified) || emails.find((e) => e.primary) || emails[0];
        if (primaryEmail) {
          email = primaryEmail.email;
        }
      }
    }

    if (!email) {
      // If still no email, we can generate a fallback email using their github username
      email = `${githubProfile.login}@github.devtrack.local`;
    }

    // Find user by email or githubUsername
    let user = await User.findOne({
      where: { email },
    });

    if (!user) {
      user = await User.findOne({
        where: { githubUsername: githubProfile.login },
      });
    }

    // Split name
    let firstName = githubProfile.name || githubProfile.login;
    let lastName = "";
    if (githubProfile.name) {
      const nameParts = githubProfile.name.trim().split(/\s+/);
      if (nameParts.length > 1) {
        firstName = nameParts[0];
        lastName = nameParts.slice(1).join(" ");
      } else {
        firstName = nameParts[0];
      }
    }

    if (!user) {
      // Create new user
      const randomPassword = await bcrypt.hash(Math.random().toString(36), 10);
      user = await User.create({
        firstName,
        lastName: lastName || "Developer",
        email,
        githubUsername: githubProfile.login,
        profilePicture: githubProfile.avatar_url,
        bio: githubProfile.bio || "",
        location: githubProfile.location || "",
        website: githubProfile.blog || "",
        password: randomPassword,
      });
    } else {
      // Update existing user's GitHub details if empty
      const updates = {};
      if (!user.githubUsername) updates.githubUsername = githubProfile.login;
      if (!user.profilePicture) updates.profilePicture = githubProfile.avatar_url;
      if (!user.bio && githubProfile.bio) updates.bio = githubProfile.bio;
      if (!user.location && githubProfile.location) updates.location = githubProfile.location;
      if (!user.website && githubProfile.blog) updates.website = githubProfile.blog;

      if (Object.keys(updates).length > 0) {
        await user.update(updates);
      }
    }

    // Sign JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      message: "GitHub login successful",
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        githubUsername: user.githubUsername,
      },
    });
  } catch (error) {
    console.error("GitHub Auth Error:", error);
    return res.status(500).json({
      message: "Internal server error during GitHub authentication",
      error: error.message,
    });
  }
};

module.exports = { registerUser, githubAuth };

