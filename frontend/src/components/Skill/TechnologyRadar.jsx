import { 
  IconRadar, 
  IconCoffee, 
  IconDatabase, 
  IconBrandReact, 
  IconBrandNodejs, 
  IconServer, 
  IconLeaf, 
  IconBrandDocker, 
  IconCloud, 
  IconGitMerge 
} from '@tabler/icons-react';

const TechnologyRadar = () => {
  const radarData = [
    {
      level: 'Expert',
      range: '80%+',
      dotColor: 'bg-emerald-400',
      shadowColor: 'shadow-emerald-500/50',
      borderColor: 'border-emerald-500/15',
      items: [
        { name: 'Java', pct: '90%', pctColor: 'text-emerald-400', icon: <IconCoffee className="w-4 h-4 text-indigo-400" />, iconBg: 'bg-indigo-500/10' },
        { name: 'MySQL', pct: '80%', pctColor: 'text-emerald-400', icon: <IconDatabase className="w-4 h-4 text-emerald-400" />, iconBg: 'bg-emerald-500/10' },
        { name: 'React', pct: '80%', pctColor: 'text-emerald-400', icon: <IconBrandReact className="w-4 h-4 text-sky-400" />, iconBg: 'bg-sky-500/10' },
      ]
    },
    {
      level: 'Intermediate',
      range: '50–79%',
      dotColor: 'bg-amber-400',
      shadowColor: 'shadow-amber-500/50',
      borderColor: 'border-amber-500/15',
      items: [
        { name: 'Node.js', pct: '70%', pctColor: 'text-amber-400', icon: <IconBrandNodejs className="w-4 h-4 text-lime-400" />, iconBg: 'bg-lime-500/10' },
        { name: 'Express.js', pct: '60%', pctColor: 'text-amber-400', icon: <IconServer className="w-4 h-4 text-purple-400" />, iconBg: 'bg-purple-500/10' },
        { name: 'Spring Boot', pct: '55%', pctColor: 'text-amber-400', icon: <IconLeaf className="w-4 h-4 text-indigo-400" />, iconBg: 'bg-indigo-500/10' },
      ]
    },
    {
      level: 'Learning',
      range: '0–49%',
      dotColor: 'bg-purple-400',
      shadowColor: 'shadow-purple-500/50',
      borderColor: 'border-purple-500/15',
      items: [
        { name: 'Docker', pct: '20%', pctColor: 'text-purple-400', icon: <IconBrandDocker className="w-4 h-4 text-sky-400" />, iconBg: 'bg-sky-500/10' },
        { name: 'AWS', pct: '10%', pctColor: 'text-purple-400', icon: <IconCloud className="w-4 h-4 text-amber-400" />, iconBg: 'bg-amber-500/10' },
        { name: 'CI/CD', pct: '15%', pctColor: 'text-purple-400', icon: <IconGitMerge className="w-4 h-4 text-emerald-400" />, iconBg: 'bg-emerald-500/10' },
      ]
    }
  ];

  return (
    <div className="bg-[#1a2035] rounded-xl p-6 border border-slate-800 flex flex-col gap-5 shadow-md w-full">
      <div className="flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-gray-400">
        <IconRadar className="w-4 h-4 text-indigo-400" />
        <span>Technology Radar</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {radarData.map((col, idx) => (
          <div 
            key={idx} 
            className={`bg-[#111625]/40 border ${col.borderColor} rounded-xl p-4 flex flex-col gap-4`}
          >
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800/60">
              <span className={`w-2 h-2 rounded-full ${col.dotColor} shadow-lg ${col.shadowColor}`} />
              <span className="font-bold text-gray-200 text-sm tracking-wide">{col.level}</span>
              <span className="text-[10px] text-gray-500 font-bold ml-auto bg-slate-800/40 px-1.5 py-0.5 rounded">
                {col.range}
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              {col.items.map((item, iIdx) => (
                <div 
                  key={iIdx} 
                  className={`flex items-center justify-between bg-[#1a2035]/50 border ${col.borderColor} rounded-lg p-2.5 hover:bg-slate-800/20 transition-colors group`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-7 h-7 rounded-md flex items-center justify-center transition-transform group-hover:scale-105 ${item.iconBg}`}>
                      {item.icon}
                    </div>
                    <span className="text-xs font-bold text-gray-300 tracking-wide">
                      {item.name}
                    </span>
                  </div>
                  <span className={`text-xs font-mono font-bold ${item.pctColor}`}>
                    {item.pct}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnologyRadar;