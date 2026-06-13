import React from 'react';
import { 
  IconMap2, 
  IconCheck, 
  IconRefresh, 
  IconArrowRight 
} from '@tabler/icons-react';

const LearningRoadmap = () => {
  const roadmapItems = [
    { title: 'Java', desc: 'Core Java, OOP, Collections, Streams', status: 'Completed', type: 'done', icon: <IconCheck className="w-3.5 h-3.5 text-emerald-400" />, dotClass: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400', tagClass: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' },
    { title: 'SQL / MySQL', desc: 'Queries, Joins, Indexes, Stored Procedures', status: 'Completed', type: 'done', icon: <IconCheck className="w-3.5 h-3.5 text-emerald-400" />, dotClass: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400', tagClass: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' },
    { title: 'React', desc: 'Hooks, Context API, React Router', status: 'Completed', type: 'done', icon: <IconCheck className="w-3.5 h-3.5 text-emerald-400" />, dotClass: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400', tagClass: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' },
    { title: 'Node.js + Express', desc: 'REST APIs, Middleware, Authentication — 70% done', status: 'In Progress', type: 'progress', icon: <IconRefresh className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />, dotClass: 'bg-amber-500/10 border-amber-500/40 text-amber-400', tagClass: 'text-amber-400 border-amber-500/20 bg-amber-500/10' },
    { title: 'Docker', desc: 'Containers, Images, Docker Compose', status: 'Up Next', type: 'next', icon: <IconArrowRight className="w-3.5 h-3.5 text-purple-400" />, dotClass: 'bg-purple-500/10 border-purple-500/40 text-purple-400', tagClass: 'text-purple-400 border-purple-500/20 bg-purple-500/10' },
    { title: 'AWS', desc: 'EC2, S3, Lambda, RDS', status: 'Planned', type: 'upcoming', icon: <span className="text-[9px] text-slate-500">○</span>, dotClass: 'bg-slate-800 border-slate-700 text-slate-500', tagClass: 'text-slate-500 border-slate-800 bg-slate-800/40', muted: true },
    { title: 'CI/CD', desc: 'GitHub Actions, Jenkins', status: 'Planned', type: 'upcoming', icon: <span className="text-[9px] text-slate-500">○</span>, dotClass: 'bg-slate-800 border-slate-700 text-slate-500', tagClass: 'text-slate-500 border-slate-800 bg-slate-800/40', muted: true },
  ];

  return (
    <div className="bg-[#1a2035] rounded-xl p-6 border border-slate-800 flex flex-col gap-5 shadow-md w-full h-[520px] overflow-y-auto custom-scrollbar">
      <div className="flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-gray-400">
        <IconMap2 className="w-4 h-4 text-indigo-400" />
        <span>Learning Roadmap</span>
      </div>

      <div className="relative flex flex-col pl-2.5 mt-2">
        <div className="absolute left-[21px] top-3 bottom-3 w-[1.5px] border-l-2 border-dashed border-slate-800" />

        {roadmapItems.map((item, idx) => (
          <div key={idx} className="relative flex gap-4 pb-4.5 last:pb-0 group">
            <div className="z-10 flex items-center justify-center">
              <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-transform group-hover:scale-110 ${item.dotClass}`}>
                {item.icon}
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-0.5 pt-0.5">
              <div className="flex items-start justify-between gap-2">
                <span className={`font-bold text-sm tracking-wide ${item.muted ? 'text-gray-500' : 'text-gray-200'}`}>
                  {item.title}
                </span>
                <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${item.tagClass}`}>
                  {item.status}
                </span>
              </div>
              <p className={`text-xs ${item.muted ? 'text-slate-600 font-normal' : 'text-gray-400 font-medium'}`}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningRoadmap;