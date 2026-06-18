import { 
  GitBranch, 
  Globe, 
  GitFork, 
  Star, 
  TrendingUp 
} from "lucide-react";
import { useMemo } from "react";

const RepoStatsGrid = ({ profile, repos }) => {
  const forksCount = useMemo(() => {
    if (!repos) return 0;
    return repos.reduce((acc, repo) => acc + (repo.forks || 0), 0);
  }, [repos]);

  const cards = [
    {
      val: profile ? profile.publicRepos : "0",
      label: "Total Repositories",
      sub: "All repositories",
      trend: "Active",
      colorClass: "text-indigo-400",
      bgColor: "bg-indigo-600/10",
      borderColor: "border-indigo-500/20",
      icon: <GitBranch className="w-5 h-5 text-indigo-400" />
    },
    {
      val: profile ? profile.publicRepos : "0",
      label: "Public Repositories",
      sub: "Visible to public",
      trend: "Synced",
      colorClass: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
      icon: <Globe className="w-5 h-5 text-emerald-400" />
    },
    {
      val: forksCount.toString(),
      label: "Total Repository Forks",
      sub: "Forks received",
      trend: "Popular",
      colorClass: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      icon: <GitFork className="w-5 h-5 text-purple-400" />
    },
    {
      val: profile ? profile.totalStars : "0",
      label: "Total Stars",
      sub: "Across all repos",
      trend: "Earned",
      colorClass: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
      icon: <Star className="w-5 h-5 text-amber-400" />
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => (
        <div 
          key={idx} 
          className="bg-[#1a2035] rounded-xl p-5 border border-slate-800 flex flex-col gap-3 shadow-md transition-all hover:border-slate-700"
        >
          <div className="flex items-center justify-between">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${card.bgColor} ${card.borderColor}`}>
              {card.icon}
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{card.trend}</span>
            </div>
          </div>

          <div className="space-y-0.5">
            <div className={`text-2xl font-bold tracking-tight ${card.colorClass}`}>
              {card.val}
            </div>
            <div className="text-sm font-semibold text-gray-200 tracking-wide">
              {card.label}
            </div>
            <div className="text-xs text-gray-400 font-medium">
              {card.sub}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RepoStatsGrid;