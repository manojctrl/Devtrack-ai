import { Flame } from "lucide-react";
import { useMemo } from "react";

const ContributionOverview = ({ profile }) => {
  const { totalContributions, currentStreak, longestStreak } = useMemo(() => {
    const heatmap = profile?.contributionHeatmap || {};
    
    let totalConts = 0;
    Object.values(heatmap).forEach((count) => {
      totalConts += count;
    });

    const getUTCDateString = (date) => {
      const y = date.getUTCFullYear();
      const m = String(date.getUTCMonth() + 1).padStart(2, "0");
      const d = String(date.getUTCDate()).padStart(2, "0");
      return `${y}-${m}-${d}`;
    };

    let currentStrk = 0;
    const checkDate = new Date();
    checkDate.setUTCHours(12, 0, 0, 0);

    const todayStr = getUTCDateString(new Date());
    const todayHasContrib = heatmap[todayStr] && heatmap[todayStr] > 0;

    let canStartStreak = todayHasContrib;
    if (!canStartStreak) {
      checkDate.setUTCDate(checkDate.getUTCDate() - 1);
      const yesterdayStr = getUTCDateString(checkDate);
      if (heatmap[yesterdayStr] && heatmap[yesterdayStr] > 0) {
        canStartStreak = true;
      }
    }

    if (canStartStreak) {
      while (true) {
        const dateStr = getUTCDateString(checkDate);
        if (heatmap[dateStr] && heatmap[dateStr] > 0) {
          currentStrk++;
          checkDate.setUTCDate(checkDate.getUTCDate() - 1);
        } else {
          break;
        }
      }
    }

    // Calculate Actual Longest Streak
    let maxStreak = 0;
    const contributionDates = Object.keys(heatmap)
      .filter((dateStr) => heatmap[dateStr] > 0)
      .sort();
      
    if (contributionDates.length > 0) {
      maxStreak = 1;
      let tempStreak = 1;
      for (let i = 1; i < contributionDates.length; i++) {
        const prevDate = new Date(contributionDates[i - 1]);
        const currDate = new Date(contributionDates[i]);
        
        const diffTime = Math.abs(currDate - prevDate);
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          tempStreak++;
          if (tempStreak > maxStreak) {
            maxStreak = tempStreak;
          }
        } else if (diffDays > 1) {
          tempStreak = 1;
        }
      }
    }

    return {
      totalContributions: totalConts,
      currentStreak: currentStrk,
      longestStreak: maxStreak,
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