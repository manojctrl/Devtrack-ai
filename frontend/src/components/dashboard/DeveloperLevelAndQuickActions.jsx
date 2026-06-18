import { Bolt, FileText, User, Brain, ArrowRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const DeveloperLevelAndQuickActions = ({ profile }) => {
  const navigate = useNavigate();

  // 1. Calculate XP and Level System
  const xp = useMemo(() => {
    if (!profile) return 100;
    return (profile.totalCommits * 5) + (profile.totalStars * 50) + (profile.publicRepos * 100);
  }, [profile]);

  const level = useMemo(() => {
    if (xp === 0) return 1;
    return Math.floor(Math.sqrt(xp / 100)) + 1;
  }, [xp]);

  const nextLevelXp = useMemo(() => {
    return Math.pow(level, 2) * 100;
  }, [level]);

  const currentLevelXp = useMemo(() => {
    return Math.pow(level - 1, 2) * 100;
  }, [level]);

  const progressPct = useMemo(() => {
    const totalRequiredForNext = nextLevelXp - currentLevelXp;
    const currentProgress = xp - currentLevelXp;
    return Math.min(Math.max(Math.round((currentProgress / totalRequiredForNext) * 100), 0), 100);
  }, [xp, level, currentLevelXp, nextLevelXp]);

  const xpRemaining = useMemo(() => {
    return Math.max(nextLevelXp - xp, 0);
  }, [nextLevelXp, xp]);

  const levelRole = useMemo(() => {
    if (level <= 2) return "Novice Contributor";
    if (level <= 5) return "Active Contributor";
    if (level <= 8) return "Senior Contributor";
    return "Elite Contributor";
  }, [level]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full text-slate-100 mt-6">
      {/* Developer Level System Card */}
      <div className="flex-[2] bg-[#1a2035] border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-bold tracking-tight text-white">Developer Level System</h2>
            <p className="text-sm text-slate-400 mt-1">Calculated from GitHub activity & commits</p>
          </div>

          <div className="flex justify-between items-center bg-slate-900/40 border border-slate-700/30 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex flex-col items-center justify-center text-indigo-400">
                <span className="text-2xl font-bold leading-none">{level}</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">{levelRole}</h3>
                <p className="text-xs font-mono text-slate-400 mt-0.5">{xp.toLocaleString()} / {nextLevelXp.toLocaleString()} XP</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-0.5">next level</span>
              <span className="text-base font-bold text-indigo-300">Level {level + 1}</span>
            </div>
          </div>

          {/* XP Progress Bar Section */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400">Progress to Level {level + 1}</span>
              <span className="font-semibold text-indigo-400">{progressPct}%</span>
            </div>
            
            {/* Progress Track */}
            <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(99,102,241,0.3)]"
                style={{ width: `${progressPct}%` }}
              ></div>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 pt-1">
              <Bolt className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span>{xpRemaining.toLocaleString()} XP remaining to reach Level {level + 1}</span>
            </div>
          </div>
        </div>

        {/* Level Milestones Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
          {[
            { value: profile ? profile.totalCommits.toLocaleString() : "0", label: "commits", color: "text-indigo-400", bg: "bg-indigo-500/5" },
            { value: profile ? profile.publicRepos.toLocaleString() : "0", label: "repos", color: "text-emerald-400", bg: "bg-emerald-500/5" },
            { value: profile ? profile.totalStars.toLocaleString() : "0", label: "stars", color: "text-amber-400", bg: "bg-amber-500/5" },
            { value: profile ? `${profile.publicRepos * 3}d` : "0d", label: "est. streak", color: "text-purple-400", bg: "bg-purple-500/5" },
          ].map((milestone, idx) => (
            <div key={idx} className={`${milestone.bg} border border-slate-700/30 rounded-xl p-3 text-center`}>
              <div className={`text-xl font-bold tracking-tight ${milestone.color}`}>
                {milestone.value}
              </div>
              <div className="text-xs text-slate-400 mt-0.5 font-medium tracking-wide">
                {milestone.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions Card */}
      <div className="flex-1 bg-[#1a2035] border border-white/5 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Bolt className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-bold tracking-tight text-white">Quick Actions</h2>
          </div>

          <div className="space-y-3">
            {[
              { label: "Generate Resume", icon: FileText, color: "text-indigo-400", bg: "bg-indigo-500/10", path: "/resume" },
              { label: "View GitHub Analytics", icon: FaGithub, color: "text-slate-300", bg: "bg-slate-700/20", path: "/github-analytics" },
              { label: "Edit Profile", icon: User, color: "text-emerald-400", bg: "bg-emerald-500/10", path: "/settings" },
              { label: "Analyze Skills", icon: Brain, color: "text-purple-400", bg: "bg-purple-500/10", path: "/skills" },
            ].map((action, idx) => {
              const IconComponent = action.icon;
              return (
                <button
                  key={idx}
                  onClick={() => navigate(action.path)}
                  className="w-full flex items-center justify-between p-3.5 bg-slate-900/40 hover:bg-slate-800 border border-slate-700/40 hover:border-slate-600 rounded-xl group transition-all duration-200 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg ${action.bg} ${action.color} flex items-center justify-center`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                      {action.label}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-1 transition-all" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperLevelAndQuickActions;
