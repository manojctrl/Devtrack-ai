import { 
  IconStack2, 
  IconTrophy, 
  IconChartBar, 
  IconSeedling, 
  IconTrendingUp 
} from '@tabler/icons-react';

const SkillOverview = () => {
  const skillsStats = [
    {
      val: '12',
      label: 'Total Skills',
      sub: 'tracked technologies',
      trend: '+2',
      colorClass: 'text-indigo-400',
      bgColor: 'bg-indigo-600/10',
      borderColor: 'border-indigo-500/20',
      icon: <IconStack2 className="w-5 h-5 text-indigo-400" />
    },
    {
      val: '4',
      label: 'Advanced',
      sub: '80%+ proficiency',
      trend: '+1',
      colorClass: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      icon: <IconTrophy className="w-5 h-5 text-emerald-400" />
    },
    {
      val: '5',
      label: 'Intermediate',
      sub: '50–79% proficiency',
      trend: '+2',
      colorClass: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      icon: <IconChartBar className="w-5 h-5 text-amber-400" />
    },
    {
      val: '3',
      label: 'Beginner',
      sub: 'currently learning',
      trend: '+1',
      colorClass: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      icon: <IconSeedling className="w-5 h-5 text-purple-400" />
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
              <IconTrendingUp className="w-3.5 h-3.5" />
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