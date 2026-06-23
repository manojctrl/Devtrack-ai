import { 
  Layers, 
  Trophy, 
  BarChart2, 
  Sprout, 
  TrendingUp 
} from "lucide-react";
import { useMemo } from "react";

const SkillOverview = ({ profile }) => {
  const { totalSkills, advanced, intermediate, beginner } = useMemo(() => {
    const langs = profile?.languages || {};
    const entries = Object.entries(langs);
    
    let advCount = 0;
    let intCount = 0;
    let begCount = 0;

    entries.forEach(([_, count]) => {
      if (count >= 5) advCount++;
      else if (count >= 2) intCount++;
      else begCount++;
    });

    return {
      totalSkills: entries.length || 5, 
      advanced: entries.length ? advCount : 2,
      intermediate: entries.length ? intCount : 2,
      beginner: entries.length ? begCount : 1,
    };
  }, [profile]);

  const skillsStats = [
    {
      val: totalSkills.toString(),
      label: "Total Technologies",
      sub: "Tracked from repos",
      trend: "Active",
      colorClass: "text-indigo-400",
      bgColor: "bg-indigo-600/10",
      borderColor: "border-indigo-500/20",
      icon: <Layers className="w-5 h-5 text-indigo-400" />
    },
    {
      val: advanced.toString(),
      label: "Advanced Core",
      sub: "5+ repositories",
      trend: "Stable",
      colorClass: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
      icon: <Trophy className="w-5 h-5 text-emerald-400" />
    },
    {
      val: intermediate.toString(),
      label: "Intermediate Tech",
      sub: "2-4 repositories",
      trend: "Growing",
      colorClass: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
      icon: <BarChart2 className="w-5 h-5 text-amber-400" />
    },
    {
      val: beginner.toString(),
      label: "Beginner / Exploring",
      sub: "1 repository",
      trend: "New",
      colorClass: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      icon: <Sprout className="w-5 h-5 text-purple-400" />
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {skillsStats.map((stat, idx) => (
        <div 
          key={idx} 
          className="bg-[#1a2035] rounded-xl p-5 border border-slate-800 flex flex-col gap-3 shadow-md transition-all hover:border-slate-700"
        >
          <div className="flex items-center justify-between">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${stat.bgColor} ${stat.borderColor}`}>
              {stat.icon}
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{stat.trend}</span>
            </div>
          </div>

          <div className="space-y-0.5">
            <div className={`text-2xl font-bold tracking-tight ${stat.colorClass}`}>
              {stat.val}
            </div>
            <div className="text-sm font-semibold text-gray-200 tracking-wide">
              {stat.label}
            </div>
            <div className="text-xs text-gray-400 font-medium">
              {stat.sub}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillOverview;