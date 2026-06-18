import { User, FileText } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const WelcomeHero = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const displayName = user?.firstName || user?.name?.split(" ")[0] || "Developer";

  if (loading) {
    return (
      <div className="w-full h-48 bg-slate-900 border border-slate-800 rounded-2xl animate-pulse" />
    );
  }

  const getInitials = (user) => {
    if (!user) return "DV";
    if (user.firstName || user.lastName) {
      const first = user.firstName ? user.firstName[0] : "";
      const last = user.lastName ? user.lastName[0] : "";
      return (first + last).toUpperCase();
    }
    if (user.name) {
      return user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return "DV";
  };

  return (
    <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-7 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 overflow-hidden shadow-xl bg-[radial-gradient(ellipse_at_80%_50%,rgba(99,102,241,0.12),transparent_60%)]">
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
          👋 Welcome Back, {displayName}
        </h1>
        <p className="text-sm font-light text-slate-400 leading-relaxed max-w-lg mb-5">
          Track your coding journey, analyze your skills, and grow your
          developer career.
        </p>

        <div className="flex items-center justify-center md:justify-start gap-3">
          <button
            onClick={() => navigate("/settings")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white cursor-pointer transition-all duration-200 bg-gradient-to-r from-indigo-600 to-purple-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30"
          >
            <User size={15} />
            View Profile
          </button>

          <button
            onClick={() => navigate("/resume")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-medium text-slate-300 cursor-pointer transition-all duration-200 bg-white/5 border border-slate-800 hover:bg-white/10 hover:text-white"
          >
            <FileText size={15} />
            Generate Resume
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 shrink-0">
        <div className="relative w-24 h-24">
          <svg
            className="absolute top-0 left-0 w-full h-full -rotate-90"
            viewBox="0 0 88 88"
          >
            <defs>
              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
            </defs>
            <circle
              className="fill-none stroke-white/5 stroke-[3px]"
              cx="44"
              cy="44"
              r="40"
            />
            <circle
              className="fill-none stroke-[url(#ringGrad)] stroke-[3px] stroke-linecap-round transition-all duration-500"
              cx="44"
              cy="44"
              r="40"
              strokeDasharray="251.2"
              strokeDashoffset="50"
            />
          </svg>

          <div className="absolute inset-2 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-inner bg-gradient-to-br from-indigo-500 to-purple-600">
            {getInitials(user)}
          </div>
        </div>

        <div className="flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10">
          <span className="text-xs font-bold text-indigo-400">
            {user?.level ? `Level ${user.level}` : "Level 1"}
          </span>
          <span className="text-[9px] font-mono tracking-wider uppercase text-slate-500">
            {user?.role || "Developer"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHero;
