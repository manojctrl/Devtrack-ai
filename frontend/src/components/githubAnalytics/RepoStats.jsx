import { 
  IconGitBranch, 
  IconWorld, 
  IconGitFork, 
  IconStar, 
  IconTrendingUp 
} from '@tabler/icons-react';

const RepoStatsGrid = () => {
  const cards = [
    {
      val: '24',
      label: 'Total Repositories',
      sub: 'all time',
      trend: '+3',
      colorClass: 'text-indigo-400',
      bgColor: 'bg-indigo-600/10',
      borderColor: 'border-indigo-500/20',
      icon: <IconGitBranch className="w-5 h-5 text-indigo-400" />
    },
    {
      val: '22',
      label: 'Public Repositories',
      sub: 'visible to all',
      trend: '+2',
      colorClass: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      icon: <IconWorld className="w-5 h-5 text-emerald-400" />
    },
    {
      val: '5',
      label: 'Forked Repositories',
      sub: 'from others',
      trend: '+1',
      colorClass: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      icon: <IconGitFork className="w-5 h-5 text-purple-400" />
    },
    {
      val: '75',
      label: 'Total Stars',
      sub: 'across all repos',
      trend: '+5',
      colorClass: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      icon: <IconStar className="w-5 h-5 text-amber-400" />
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
              <IconTrendingUp className="w-3.5 h-3.5" />
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