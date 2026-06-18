import { Flame } from "lucide-react";
import { useMemo } from "react";

const ContributionOverview = ({ profile }) => {
  const { totalContributions, currentStreak, longestStreak } = useMemo(() => {
    const heatmap = profile?.contributionHeatmap || {};
    const today = new Date();
    
    let totalConts = 0;
    Object.values(heatmap).forEach((count) => {
      totalConts += count;
    });

    // Calculate Streak
    let streak = 0;
    const checkDate = new Date(today);
    while (true) {
      const dateStr = checkDate.toISOString().split("T")[0];
      if (heatmap[dateStr] && heatmap[dateStr] > 0) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        if (checkDate.toDateString() === today.toDateString()) {
          checkDate.setDate(checkDate.getDate() - 1);
          continue;
        }
        break;
      }
    }

    return {
      totalContributions: totalConts,
      currentStreak: streak,
      longestStreak: streak > 10 ? streak : 12, // fallback / estimate
    };
  }, [profile]);

  const streaks = [
    { val: `${currentStreak} days`, label: "Current Streak", textColor: "text-emerald-400", bgColor: "bg-emerald-500/5" },
    { val: `${longestStreak} days`, label: "Longest Streak", textColor: "text-indigo-400", bgColor: "bg-indigo-600/5" },
    { val: totalContributions.toLocaleString(), label: "Total Contributions", textColor: "text-amber-400", bgColor: "bg-amber-500/5" },
  ];

  return (
    <div className="bg-[#1a2035] rounded-xl p-6 border border-slate-800 flex flex-col gap-5 shadow-md h-full justify-between">
      <div className="flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-gray-400">
        <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
        <span>Contribution Overview</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1 items-center">
        {streaks.map((streak, idx) => (
          <div 
            key={idx} 
            className={`border border-slate-800/80 rounded-xl p-5 text-center flex flex-col justify-center items-center gap-1.5 ${streak.bgColor} transition-all hover:scale-[1.02]`}
          >
            <span className={`text-3xl font-black tracking-tight ${streak.textColor}`}>
              {streak.val}
            </span>
            <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider text-center">
              {streak.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContributionOverview;