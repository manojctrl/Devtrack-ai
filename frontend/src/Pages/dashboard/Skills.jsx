import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/dashboard/Navbar";
import Sidebar from "../../components/dashboard/sidebar";
import AIRecommendations from "../../components/Skill/AIRecommendations";
import LearningRoadmap from "../../components/Skill/LearningRoadmap";
import PieChart from "../../components/Skill/PieChart";
import SkillCategories from "../../components/Skill/SkillCategories";
import SkillOverview from "../../components/Skill/SkillOverview";
import SkillProficiency from "../../components/Skill/SkillProficiency";
import TechnologyRadar from "../../components/Skill/TechnologyRadar";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { RefreshCw, Bot } from "lucide-react";

const Skills = () => {
  const { user } = useAuth();
  const [githubData, setGithubData] = useState(null);
  const [aiRecommendations, setAiRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");

  const fetchSkillsData = async (showLoader = true) => {
    if (showLoader) setLoading(true);
    setError("");
    try {
      const ghRes = await API.get("/github/data");
      setGithubData(ghRes.data);
    } catch (err) {
      console.warn("No GitHub stats found:", err);
      setGithubData(null);
    }

    try {
      const aiRes = await API.get("/ai/recommendations");
      setAiRecommendations(aiRes.data.recommendations);
    } catch (err) {
      console.warn("No AI recommendations found:", err);
      setAiRecommendations(null);
    }
    if (showLoader) setLoading(false);
  };

  useEffect(() => {
    fetchSkillsData();
  }, [user?.githubUsername]);

  const handleGenerateRecommendations = async () => {
    if (!githubData?.profile) {
      setError("Please sync your GitHub profile before generating AI recommendations.");
      return;
    }
    setAnalyzing(true);
    setError("");
    try {
      const res = await API.post("/ai/recommendations");
      setAiRecommendations(res.data.recommendations);
    } catch (err) {
      console.error("Failed to generate AI recommendations:", err);
      setError(err.response?.data?.message || "Generation failed. Please make sure GEMINI_API_KEY is configured.");
    } finally {
      setAnalyzing(false);
    }
  };

  const isConnected = Boolean(user?.githubUsername);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111625] flex text-slate-800 dark:text-gray-105 dark:text-gray-100 font-sans transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 pl-64">
        <Navbar />
        <main className="p-8 pt-24 max-w-7xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Skills Matrix</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Real-time technology distributions and career roadmaps.</p>
            </div>
            {isConnected && (
              <button
                disabled={analyzing}
                onClick={handleGenerateRecommendations}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-purple-600 rounded-xl hover:bg-purple-500 disabled:opacity-50 transition-all cursor-pointer shadow-md shadow-purple-600/15"
              >
                <Bot size={14} className={analyzing ? "animate-pulse" : ""} />
                {analyzing ? "Analyzing Stack..." : "Run AI Career Coach"}
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
              <Bot size={40} className="text-indigo-400 opacity-60" />
              <h3 className="text-lg font-bold text-white">GitHub Connection Required</h3>
              <p className="text-sm text-slate-400 max-w-md">Sync your GitHub username in Settings to view technology strength charts, stack distributions, and dynamic AI career roadmaps.</p>
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
              <p className="text-xs text-slate-500 font-mono">Calculating skill proficiencies...</p>
            </div>
          ) : (
            <>
              <SkillOverview profile={githubData?.profile} />
              
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2">
                  <SkillProficiency profile={githubData?.profile} />
                </div>
                <div className="lg:col-span-3">
                  <PieChart languages={githubData?.profile?.languages} />
                </div>
              </div>

              <SkillCategories profile={githubData?.profile} />
              <TechnologyRadar profile={githubData?.profile} aiRecommendations={aiRecommendations} />

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2">
                  <LearningRoadmap learningRoadmap={aiRecommendations?.learningRoadmap} profile={githubData?.profile} />
                </div>
                <div className="lg:col-span-3">
                  <AIRecommendations aiRecommendations={aiRecommendations} />
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Skills;
