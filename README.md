# 🚀 DevTrack AI

DevTrack AI is a full-stack developer analytics platform that helps developers showcase their coding journey through GitHub insights, skill analytics, resume generation, and AI-powered career recommendations.

The platform provides a centralized dashboard where developers can monitor their GitHub activity, track technical growth, generate professional resumes, and share a public profile with recruiters.

---

## 🌟 Features

### 🔐 Authentication
* User Registration & Login
* Secure JWT Authentication
* Protected Routes

### 🐙 GitHub Integration
* Connect GitHub Account
* Fetch User Profile
* Repository Analytics
* Contribution Tracking
* Language Statistics

### 📊 Analytics Dashboard
* Total Repositories
* Total Commits
* Stars & Followers
* Coding Activity Overview
* Contribution Heatmap

### 🧠 Skill Analytics
* Automatic Skill Detection
* Technology Usage Analysis
* Skill Strength Visualization
* Learning Gap Identification

### 🤖 AI Career Coach
* Career Recommendations
* Role Suggestions
* Learning Roadmaps
* Skill Improvement Guidance

### 📄 Resume Generator
* Auto-generated Resume
* Downloadable PDF
* Project Showcase
* Skill Summary

### 🌐 Public Developer Profile
* Shareable Portfolio Link
* Recruiter-Friendly View
* GitHub Statistics
* Skills & Projects Showcase

---

## 🏗️ Tech Stack

### Frontend
* React.js
* Tailwind CSS
* React Router
* Axios
* Recharts
* Socket.io-client

### Backend
* Node.js
* Express.js
* Sequelize ORM
* MySQL
* JWT Authentication & Bcrypt.js
* Socket.io

### APIs
* GitHub REST API
* Gemini AI API

---

## ⚙️ Getting Started

Follow these steps to set up and run DevTrack AI locally on your system.

### Prerequisites
* **Node.js** (v16 or higher recommended)
* **npm** or **yarn**
* **MySQL Server** running locally

---

### 1. Database Setup
1. Open your MySQL client (e.g., MySQL Workbench or CLI).
2. Create a database named `devtrack_ai`:
   ```sql
   CREATE DATABASE devtrack_ai;
   ```

---

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder and populate it with your local configurations:
   ```env
   PORT=5000
   DB_NAME=devtrack_ai
   DB_USER=your_mysql_username (e.g., root)
   DB_PASSWORD=your_mysql_password
   DB_HOST=localhost
   JWT_SECRET=your_jwt_secret_key
   GEMINI_API_KEY=your_gemini_api_key
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *Note: Databases and tables will be auto-synced upon starting the server via Sequelize.*

---

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` folder:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_GITHUB_CLIENT_ID=your_github_client_id
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
5. Open your browser and go to `http://localhost:5173`.

---

## 📂 Project Structure

```bash
DevTrack-AI
│
├── frontend
│   ├── src
│   │   ├── Pages       # Components for full pages
│   │   ├── components  # Reusable UI components
│   │   ├── context     # Auth, Socket, and Theme React Contexts
│   │   ├── services    # Axios API client setup
│   │   └── router      # React Router settings
│   └── public
│
├── backend
│   ├── config          # Database & Socket configurations
│   ├── controllers     # Express Route Handlers
│   ├── middleware      # JWT & error middlewares
│   ├── models          # Sequelize models
│   ├── routes          # Express API route declarations
│   └── server.js       # Main server entrypoint
│
└── README.md
```

---

## 🔄 Workflow

1. User creates an account.
2. User connects GitHub profile.
3. System fetches GitHub repositories and statistics.
4. Analytics dashboard displays coding activity.
5. Skills are automatically analyzed.
6. AI generates career recommendations.
7. Resume can be generated and downloaded.
8. Public profile can be shared with recruiters.

---

## 👨‍💻 Author

**Manoj Katwal**

Aspiring Full-Stack Developer passionate about building modern web applications, solving real-world problems, and continuously learning new technologies.

---

## 📜 License

This project is licensed under the MIT License.
