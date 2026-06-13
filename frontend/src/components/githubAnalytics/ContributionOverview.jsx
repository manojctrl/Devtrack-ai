import { IconFlame } from '@tabler/icons-react';

const ContributionOverview = () => {
  const streaks = [
    { val: '14', label: 'Current Streak', textColor: 'text-emerald-400', bgColor: 'bg-emerald-500/5' },
    { val: '31', label: 'Longest Streak', textColor: 'text-indigo-400', bgColor: 'bg-indigo-600/5' },
    { val: '1,450', label: 'Total Contributions', textColor: 'text-amber-400', bgColor: 'bg-amber-500/5' },
  ];

  return (
    <div className="bg-[#1a2035] rounded-xl p-6 border border-slate-800 flex flex-col gap-5 shadow-md h-full justify-between">
      <div className="flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-gray-400">
        <IconFlame className="w-4 h-4 text-orange-500 animate-pulse" />
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
            <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
              {streak.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContributionOverview;