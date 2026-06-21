import { useState, useEffect, useRef } from "react";
import Sidebar from "../../components/dashboard/sidebar";
import Navbar from "../../components/dashboard/Navbar";
import WelcomHero from "../../components/dashboard/WelcomHero";
import StatesFlex from "../../components/dashboard/StatesFlex";
import GitHubOnboarding from "../../components/dashboard/GitHubOnboarding";
import Heatmap from "../../components/dashboard/Heatmap";
import SkillsAiInsigts from "../../components/dashboard/SkillsAiInsigts";
import ActivityAndProjects from "../../components/dashboard/ActivityAndProjects";
import LearningRoadMapAndRecentActivity from "../../components/dashboard/LearningRoadMapAndRecentActivity";
import DeveloperLevelAndQuickActions from "../../components/dashboard/DeveloperLevelAndQuickActions";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useSocket } from "../../context/SocketContext";
import { RefreshCw, Wifi, WifiOff } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const socket = useSocket();
  const [githubData, setGithubData] = useState(null);
  const [aiRecommendations, setAiRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState("");
  const [error, setError] = useState("");
  const hasAutoSynced = useRef(false);

  useEffect(() => {
    if (!socket) return;

    const handleSyncProgress = (data) => {
      setSyncing(true);
      setError("");
      if (data.message) {
        setSyncMessage(data.message);
      }

      if (data.status === "completed" && data.type === "github") {
        if (data.data) {
          setGithubData(data.data);
        }
      } else if (data.status === "ai_completed" && data.type === "ai") {
        if (data.data?.recommendations) {
          setAiRecommendations(data.data.recommendations);
        }
        setSyncMessage("✓ Profile & career insights synced!");
        setTimeout(() => {
          setSyncMessage("");
          setSyncing(false);
        }, 3000);
      } else if (data.status === "failed" || data.status === "ai_failed") {
        setError(data.message || "Synchronization failed.");
        setSyncMessage("");
        setSyncing(false);
      }
    };

    socket.on("sync:progress", handleSyncProgress);

    return () => {
      socket.off("sync:progress", handleSyncProgress);
    };
  }, [socket]);

  const triggerAutoSync = async () => {
    setSyncing(true);
    setSyncMessage("Initializing auto-sync...");
    try {
      await API.post("/github/sync");
      await API.post("/ai/recommendations");
    } catch (err) {
      console.error("Auto sync failed:", err);
      setSyncMessage("");
      setSyncing(false);
    }
  };

  const fetchDashboardData = async (showLoader = true) => {
    if (showLoader) setLoading(true);
    setError("");
    let fetchedProfile = null;
    try {
      const ghRes = await API.get("/github/data");
      setGithubData(ghRes.data);
      fetchedProfile = ghRes.data?.profile;
    } catch (err) {
      console.warn("No cached GitHub profile found:", err);
      setGithubData(null);
    }

    try {
      const aiRes = await API.get("/ai/recommendations");
      setAiRecommendations(aiRes.data.recommendations);
    } catch (err) {
      console.warn("No cached AI recommendations found:", err);
      setAiRecommendations(null);
    }

    if (showLoader) setLoading(false);

    // Auto sync on first dashboard load if GitHub is connected but no DB cache exists
    if (user?.githubUsername && !fetchedProfile && !hasAutoSynced.current) {
      hasAutoSynced.current = true;
      triggerAutoSync();
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user?.githubUsername]);

  const handleSyncAll = async () => {
    if (!user?.githubUsername) {
      setError("Please connect your GitHub account in settings first.");
      return;
    }
    setSyncing(true);
    setSyncMessage("Initializing sync...");
    setError("");
    try {
      await API.post("/github/sync");
      await API.post("/ai/recommendations");
    } catch (err) {
      console.error("Sync failed:", err);
      setError(err.response?.data?.message || "Sync failed. Please try again.");
      setSyncMessage("");
      setSyncing(false);
    }
  };

  const isGitHubConnected = Boolean(user?.githubUsername);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111625] flex text-slate-800 dark:text-gray-100 font-sans transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 pl-64">
        <Navbar />

        {/* Syncing Banner */}
        {syncing && (
          <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-2.5 bg-indigo-600/95 backdrop-blur-sm text-white text-xs font-semibold py-2.5 shadow-lg shadow-indigo-900/30">
            <RefreshCw size={13} className="animate-spin" />
            <span>{syncMessage || "Syncing data…"}</span>
          </div>
        )}

        {/* Sync Success Toast */}
        {!syncing && syncMessage && (
          <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-2.5 bg-emerald-600/95 backdrop-blur-sm text-white text-xs font-semibold py-2.5 shadow-lg">
            <Wifi size={13} />
            <span>{syncMessage}</span>
          </div>
        )}

        <main className="p-8 pt-24 max-w-7xl mx-auto space-y-8">
          {/* Dashboard Title & Sync Button */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Dashboard Overview
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-450 mt-0.5">
                Real-time stats and developer insights.
              </p>
            </div>
            {isGitHubConnected && (
              <button
                disabled={syncing}
                onClick={handleSyncAll}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 disabled:opacity-50 transition-all cursor-pointer shadow-md shadow-indigo-600/15"
              >
                <RefreshCw size={14} className={syncing ? "animate-spin" : ""} />
                {syncing ? "Syncing..." : "Sync Profile"}
              </button>
            )}
          </div>

          {error && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs font-medium flex items-center gap-2">
              <WifiOff size={14} />
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
              <p className="text-xs text-slate-500 font-mono">
                Loading dashboard metrics...
              </p>
            </div>
          ) : (
            <>
              <WelcomHero />

              {!isGitHubConnected ? (
                <GitHubOnboarding />
              ) : (
                <>
                  {/* Live sync overlay when data is loading for first time */}
                  {syncing && !githubData && (
                    <div className="bg-[#1a2035] border border-indigo-500/20 rounded-2xl p-12 text-center flex flex-col items-center gap-4">
                      <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
                      <p className="text-sm text-slate-300 font-medium">
                        Fetching your GitHub data for the first time…
                      </p>
                      <p className="text-xs text-slate-500 font-mono">
                        This only takes a few seconds
                      </p>
                    </div>
                  )}

                  {/* Dashboard components — shown only when data exists */}
                  {(githubData || !syncing) && (
                    <>
                      <StatesFlex profile={githubData?.profile} />
                      <Heatmap profile={githubData?.profile} />
                      <SkillsAiInsigts
                        profile={githubData?.profile}
                        aiRecommendations={aiRecommendations}
                        onTriggerAnalysis={handleSyncAll}
                      />
                      <ActivityAndProjects
                        profile={githubData?.profile}
                        repos={githubData?.repos}
                      />
                      <LearningRoadMapAndRecentActivity
                        profile={githubData?.profile}
                        aiRecommendations={aiRecommendations}
                      />
                      <DeveloperLevelAndQuickActions
                        profile={githubData?.profile}
                      />
                    </>
                  )}
                </>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
