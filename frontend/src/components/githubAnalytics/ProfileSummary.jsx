import React from "react";
import { RefreshCw, ExternalLink } from "lucide-react";
import { IconBrandGithub } from "@tabler/icons-react";


const ProfileSummary = ({ profile, user, onSync, syncing }) => {
  const stats = [
    { val: profile ? profile.publicRepos : "0", label: "Repositories", textColor: "text-gray-100" },
    { val: profile ? profile.followers : "0", label: "Followers", textColor: "text-gray-100" },
    { val: profile ? profile.totalStars : "0", label: "Stars", textColor: "text-gray-100" },
    { val: profile ? profile.totalCommits.toLocaleString() : "0", label: "Commits", textColor: "text-emerald-400" },
  ];

  const getInitials = () => {
    if (user) {
      const first = user.firstName ? user.firstName[0] : "";
      const last = user.lastName ? user.lastName[0] : "";
      return (first + last).toUpperCase() || "DV";
    }
    return "DV";
  };

  const timeSinceSync = () => {
    if (!profile || !profile.lastSyncedAt) return "Never synced";
    const diffMs = new Date() - new Date(profile.lastSyncedAt);
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1) return "Just synced";
    if (mins < 60) return `Synced ${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `Synced ${hrs}h ago`;
    return `Synced ${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <div className="bg-[#1a2035] rounded-xl p-6 shadow-md border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-gray-100">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
        <div className="relative shrink-0">
          {profile?.avatarUrl ? (
            <img 
              src={profile.avatarUrl} 
              alt="GitHub Avatar" 
              className="w-16 h-16 rounded-full border border-indigo-500/30 object-cover" 
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center text-xl font-bold font-mono tracking-wider">
              {getInitials()}
            </div>
          )}
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#1a2035] rounded-full"></span>
        </div>

        <div className="space-y-3 w-full">
          <div>
            <h2 className="text-xl font-bold tracking-wide text-gray-100">
              {user ? `${user.firstName} ${user.lastName}` : "Developer"}
            </h2>
            {user?.githubUsername && (
              <a 
                href={profile?.htmlUrl || `https://github.com/${user.githubUsername}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5 hover:text-indigo-400 transition-colors cursor-pointer w-fit"
              >
                <IconBrandGithub className="w-4 h-4 text-gray-400" />
                <span>{user.githubUsername}</span>
              </a>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1">
            {stats.map((stat, idx) => (
              <React.Fragment key={idx}>
                <div className="flex flex-col">
                  <div
                    className={`text-lg font-bold leading-tight ${stat.textColor}`}
                  >
                    {stat.val}
                  </div>
                  <div className="text-[11px] font-medium text-gray-400 mt-0.5 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
                {idx < stats.length - 1 && (
                  <div className="hidden sm:block h-8 w-[1px] bg-slate-800/80" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-row md:flex-col lg:flex-row items-center justify-between md:items-end lg:items-center gap-4 w-full md:w-auto border-t border-slate-800 md:border-none pt-4 md:pt-0">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 text-xs text-gray-400 font-mono">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
          {timeSinceSync()}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button 
            disabled={syncing}
            onClick={onSync}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer border-none"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncing ? "animate-spin" : ""}`} />
            <span>{syncing ? "Syncing..." : "Sync GitHub"}</span>
          </button>

          {profile?.htmlUrl && (
            <a 
              href={profile.htmlUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-gray-200 border border-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-center"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View GitHub</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSummary;
