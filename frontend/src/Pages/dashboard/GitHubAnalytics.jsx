import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/dashboard/Navbar";
import Sidebar from "../../components/dashboard/sidebar";
import CommitActivity from "../../components/githubAnalytics/CommitActivity";
import ContributionOverview from "../../components/githubAnalytics/ContributionOverview";
import LanguageDistribution from "../../components/githubAnalytics/LanguageDistribution";
import ProfileSummary from "../../components/githubAnalytics/ProfileSummary";
import RepositoryTable from "../../components/githubAnalytics/RepositoryTable";
import RepoStats from "../../components/githubAnalytics/RepoStats";
import TopRepositories from "../../components/githubAnalytics/TopRepositories";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { RefreshCw } from "lucide-react";

const GitHubAnalytics = () => {
  const { user } = useAuth();
  const [githubData, setGithubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState("");

  const fetchGithubAnalytics = async (showLoader = true) => {
    if (showLoader) setLoading(true);
    setError("");
    try {
      const res = await API.get("/github/data");
      setGithubData(res.data);
    } catch (err) {
      console.warn("No GitHub analytics cached:", err);
      setGithubData(null);
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  useEffect(() => {
    fetchGithubAnalytics();
  }, [user?.githubUsername]);

  const handleSync = async () => {
    if (!user?.githubUsername) {
      setError("Please connect your GitHub username in Settings first.");
      return;
    }
    setSyncing(true);
    setError("");
    try {
      const res = await API.post("/github/sync");
      setGithubData(res.data);
    } catch (err) {
      console.error("Failed to sync GitHub profile:", err);
      setError(err.response?.data?.message || "GitHub Sync failed. Please try again.");
    } finally {
      setSyncing(false);
    }
  };

  const isConnected = Boolean(user?.githubUsername);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111625] flex text-slate-800 dark:text-gray-100 font-sans transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 pl-64">
        <Navbar />
        <main className="p-8 pt-24 max-w-7xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">GitHub Analytics</h1>
              <p className="text-xs text-slate-550 dark:text-slate-400 mt-0.5">Explore your coding commit habits and languages breakdown.</p>
            </div>
            {isConnected && (
              <button
                disabled={syncing}
                onClick={handleSync}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 disabled:opacity-50 transition-all cursor-pointer shadow-md shadow-indigo-600/15"
              >
                <RefreshCw size={14} className={syncing ? "animate-spin" : ""} />
                {syncing ? "Syncing..." : "Sync GitHub Data"}
              </button>
            )}
          </div>

          {error && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-450 text-rose-400 text-xs font-semibold">
              {error}
            </div>
          )}

          {!isConnected ? (
            <div className="bg-[#1a2035] border border-slate-800 rounded-xl p-12 text-center flex flex-col items-center justify-center gap-4">
              <RefreshCw size={40} className="text-indigo-400 opacity-60" />
              <h3 className="text-lg font-bold text-white">GitHub Connection Required</h3>
              <p className="text-sm text-slate-400 max-w-md">Connect your GitHub username in Settings to view dynamic code statistics, repos, languages distribution, and streak heatmaps.</p>
              <Link 
                to="/settings"
                className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 cursor-pointer"
              >
                Go to Settings
              </Link>
            </div>
          ) : loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
              <p className="text-xs text-slate-500 font-mono">Loading analytics dashboard...</p>
            </div>
          ) : (
            <>
              <ProfileSummary 
                profile={githubData?.profile} 
                user={user} 
                onSync={handleSync} 
                syncing={syncing} 
              />
              <RepoStats profile={githubData?.profile} repos={githubData?.repos} />
              
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2">
                  <LanguageDistribution languages={githubData?.profile?.languages} />
                </div>
                <div className="lg:col-span-3">
                  <ContributionOverview profile={githubData?.profile} />
                </div>
              </div>

              <TopRepositories repos={githubData?.repos} />
              <CommitActivity profile={githubData?.profile} />
              <RepositoryTable repos={githubData?.repos} />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default GitHubAnalytics;
