import { IoIosGitBranch } from "react-icons/io";
import { LuGitCommitVertical } from "react-icons/lu";
import { CiStar } from "react-icons/ci";
import { FaUsers } from "react-icons/fa6";
import { TrendingUp } from "lucide-react";

const StatesFlex = () => {
  const statsData = [
    {
      id: 1,
      value: "24",
      label: "Repositories",
      subText: "+3 this month",
      textColor: "text-indigo-400",
      icon: <IoIosGitBranch className="text-indigo-400" />,
      iconBg: "bg-indigo-500/10 border-indigo-500/20",
    },
    {
      id: 2,
      value: "1123",
      label: "Total commits",
      subText: "+87 this week",
      textColor: "text-indigo-400",
      icon: <LuGitCommitVertical className="text-indigo-400" />,
      iconBg: "bg-indigo-500/10 border-indigo-500/20",
    },
    {
      id: 3,
      value: "75",
      label: "Stars Earned",
      subText: "across all repos",
      textColor: "text-amber-400",
      icon: <CiStar size={20} className="text-amber-400" />,
      iconBg: "bg-amber-500/10 border-amber-500/20",
    },
    {
      id: 4,
      value: "120",
      label: "Followers",
      subText: "+12 this month",
      textColor: "text-purple-400",
      icon: <FaUsers size={20} className="text-purple-400" />,
      iconBg: "bg-purple-500/10 border-purple-500/20",
    },
  ];

  return (
    <div className="flex flex-wrap gap-5 w-full">
      {statsData.map((stats, index) => (
        <div
          key={index}
          className="bg-[#1a1f32] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:border-slate-700 hover:-translate-y-1 shadow-md shadow-black/10 flex-1 min-w-[240px] lg:basis-[calc(25%-15px)]"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`p-2.5 rounded-xl border ${stats.iconBg} flex items-center justify-center`}
            >
              {stats.icon}
            </div>
            <div className="text-emerald-500 bg-emerald-500/10 p-1.5 rounded-lg border border-emerald-500/10 flex items-center justify-center">
              <TrendingUp size={14} />
            </div>
          </div>
          <div className="space-y-1">
            <div
              className={`text-2xl md:text-3xl font-bold tracking-tight ${stats.textColor}`}
            >
              {stats.value}
            </div>
            <div className="text-sm font-medium text-slate-300">
              {stats.label}
            </div>
            <div className="text-xs text-slate-500 font-light tracking-wide">
              {stats.subText}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatesFlex;
