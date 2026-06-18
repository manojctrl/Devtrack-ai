import { useContext, useState } from "react";
import {
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Code2,
  Flame,
  FolderGit2,
  GitBranch,
  Globe,
  Image,
  Link2,
  MapPin,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";

const FEATURES = [
  { icon: Flame, label: "Contribution Heatmap", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
  { icon: BarChart3, label: "Activity Charts", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
  { icon: FolderGit2, label: "Repository Analytics", color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
  { icon: Flame, label: "Coding Streak", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  { icon: Code2, label: "Language Usage", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  { icon: GitBranch, label: "Recent Repositories", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  { icon: Globe, label: "Public Portfolio Analytics", color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20" },
];

const PROFILE_FIELDS = [
  { key: "profilePicture", icon: Image, label: "Profile Picture" },
  { key: "bio", icon: User, label: "Bio" },
  { key: "location", icon: MapPin, label: "Location" },
  { key: "linkedin", icon: FaLinkedin, label: "LinkedIn Profile" },
  { key: "website", icon: Link2, label: "Website" },
  { key: "githubUsername", icon: FaGithub, label: "GitHub Connection" },
];

const hasProfileValue = (value) => {
  if (typeof value === "string") return value.trim().length > 0;
  return Boolean(value);
};

const getProfileCompletion = (user) => {
  const completedCount = PROFILE_FIELDS.filter(({ key }) =>
    hasProfileValue(user?.[key]),
  ).length;

  return {
    percentage: Math.round((completedCount / PROFILE_FIELDS.length) * 100),
    missingItems: PROFILE_FIELDS.filter(({ key }) => !hasProfileValue(user?.[key])),
  };
};

const ConnectModal = ({ isOpen, onClose, onConnected }) => {
  const [githubUsername, setGithubUsername] = useState("");
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleConnect = async () => {
    if (!githubUsername.trim()) return;

    setConnecting(true);
    setError("");

    try {
      const response = await api.put("/user/profile", {
        githubUsername: githubUsername.trim(),
      });

      onConnected(response.data.user);
      setGithubUsername("");
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to connect GitHub right now.");
    } finally {
      setConnecting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md bg-[#1a2035] border border-slate-700/60 rounded-2xl shadow-2xl shadow-indigo-900/20 overflow-hidden animate-fadeUp">
        <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />

        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <FaGithub className="text-indigo-400 w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Connect GitHub</h3>
                <p className="text-xs text-slate-400">Link your account to unlock analytics</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-2 mb-8">
            <label className="text-sm font-medium text-slate-300">GitHub Username</label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                <FaGithub className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="manojkatwal"
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-900/60 border border-slate-700/60 rounded-xl text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200"
              />
            </div>
            {error && <p className="text-xs text-rose-400">{error}</p>}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-5 py-3 rounded-xl text-sm font-medium text-slate-300 bg-white/5 border border-slate-700/60 hover:bg-white/10 hover:text-white transition-all duration-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConnect}
              disabled={connecting || !githubUsername.trim()}
              className="flex-1 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
            >
              {connecting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <FaGithub className="w-4 h-4" />
                  Connect
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileCompletionCard = ({ completionPercent, missingItems }) => (
  <div className="w-full bg-slate-900/50 border border-slate-800/60 rounded-2xl p-5 sm:p-6 space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-bold text-white flex items-center gap-2">
        <User size={14} className="text-indigo-400" />
        Profile Completion
      </h3>
      <span className="text-lg font-bold font-mono bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
        {completionPercent}%
      </span>
    </div>

    <div className="relative w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
      <div
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${completionPercent}%` }}
      />
    </div>

    <div className="space-y-2 pt-1">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Missing Items</p>
      <div className="space-y-1.5">
        {missingItems.length > 0 ? (
          missingItems.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/[0.02] border border-slate-800/40 hover:border-slate-700/60 hover:bg-white/[0.04] transition-all duration-200"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500/80 shrink-0" />
              <Icon size={13} className="text-slate-500 shrink-0" />
              <span className="text-xs text-slate-400 font-medium">{label}</span>
            </div>
          ))
        ) : (
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
            <span className="text-xs text-emerald-300 font-medium">Profile complete</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

const GitHubConnectCard = ({ hoveredFeature, setHoveredFeature, onOpenModal }) => (
  <div className="flex-1 min-w-0 space-y-8">
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-1">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400">
          <Sparkles size={12} />
          Setup Required
        </span>
      </div>
      <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
        Connect your GitHub account
      </h2>
      <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
        Connect your GitHub username to unlock:
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      {FEATURES.map((feature, index) => {
        const Icon = feature.icon;

        return (
          <div
            key={feature.label}
            onMouseEnter={() => setHoveredFeature(index)}
            onMouseLeave={() => setHoveredFeature(null)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 cursor-default ${
              hoveredFeature === index
                ? `${feature.bg} ${feature.border} shadow-lg`
                : "bg-white/[0.02] border-slate-800/60 hover:border-slate-700/60"
            }`}
          >
            <div className={`p-1.5 rounded-lg ${feature.bg} border ${feature.border} shrink-0`}>
              <Icon size={14} className={feature.color} />
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2
                size={14}
                className={`shrink-0 transition-colors duration-200 ${
                  hoveredFeature === index ? "text-emerald-400" : "text-slate-600"
                }`}
              />
              <span className="text-sm text-slate-300 font-medium">{feature.label}</span>
            </div>
          </div>
        );
      })}
    </div>

    <button
      type="button"
      onClick={onOpenModal}
      className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30 active:translate-y-0 transition-all duration-200 cursor-pointer"
    >
      <FaGithub className="w-[18px] h-[18px]" />
      Connect GitHub
      <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-200" />
    </button>
  </div>
);

const GitHubOnboarding = () => {
  const { user, setUser } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const isGitHubConnected = hasProfileValue(user?.githubUsername);
  const { percentage, missingItems } = getProfileCompletion(user);

  return (
    <>
      <div className="w-full bg-[#1a2035]/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl shadow-black/10">
        <div className="h-[2px] w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {!isGitHubConnected && (
              <GitHubConnectCard
                hoveredFeature={hoveredFeature}
                setHoveredFeature={setHoveredFeature}
                onOpenModal={() => setShowModal(true)}
              />
            )}

            <div className={`${isGitHubConnected ? "w-full" : "w-full lg:w-auto lg:max-w-[420px]"} shrink-0`}>
              <ProfileCompletionCard
                completionPercent={percentage}
                missingItems={missingItems}
              />
            </div>
          </div>
        </div>
      </div>

      <ConnectModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConnected={setUser}
      />
    </>
  );
};

export default GitHubOnboarding;
