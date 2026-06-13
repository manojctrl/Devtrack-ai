import React from 'react';
import { 
  IconRobot, 
  IconCheck, 
  IconBrandDocker, 
  IconCloud, 
  IconBrandTypescript, 
  IconGitMerge, 
  IconTopologyStar 
} from '@tabler/icons-react';

const AIRecommendations = () => {
  return (
    <div className="bg-[#1a2035] rounded-xl p-6 border border-slate-800 flex flex-col h-[520px] justify-between shadow-md w-full">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-md shadow-purple-500/5">
          <IconRobot className="w-5 h-5 animate-pulse" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-gray-200 text-sm tracking-wide">AI Recommendations</span>
          <span className="text-[10px] text-purple-400 font-semibold uppercase tracking-wider mt-0.5">
            Powered by Gemini · Updated today
          </span>
        </div>
      </div>

      <div className="bg-purple-950/20 border border-purple-500/15 rounded-xl p-4 text-xs leading-relaxed text-purple-300 font-medium mt-4">
        Based on your current skills, you are <strong className="text-purple-400 font-bold">ready for production-level Java backend roles</strong>. Focus on cloud and DevOps to 10x your employability.
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-4 flex-1 justify-center items-center">
        <div className="bg-[#111625]/40 border border-slate-800/60 rounded-xl p-3.5 space-y-1.5 h-full flex flex-col justify-center">
          <span className="text-[10px] text-gray-500 uppercase font-black tracking-wider">Recommended Role</span>
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
            <IconCheck className="w-4 h-4 flex-shrink-0" />
            <span>Junior Full Stack Dev</span>
          </div>
        </div>

        <div className="bg-[#111625]/40 border border-slate-800/60 rounded-xl p-3.5 space-y-2 h-full flex flex-col justify-center">
          <span className="text-[10px] text-gray-500 uppercase font-black tracking-wider">Next Technologies</span>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-300">
              <IconBrandDocker className="w-3.5 h-3.5 text-sky-400" /> <span>Docker</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-300">
              <IconCloud className="w-3.5 h-3.5 text-amber-400" /> <span>AWS</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-300">
              <IconBrandTypescript className="w-3.5 h-3.5 text-indigo-400" /> <span>TypeScript</span>
            </div>
          </div>
        </div>

        <div className="bg-[#111625]/40 border border-slate-800/60 rounded-xl p-3.5 space-y-1.5 h-full flex flex-col justify-center">
          <span className="text-[10px] text-gray-500 uppercase font-black tracking-wider">Estimated Readiness</span>
          <div className="text-xl font-mono font-black text-purple-400">78%</div>
          <div className="w-full h-2 bg-[#111625] rounded-full overflow-hidden border border-slate-800/50 p-[1px]">
            <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" style={{ width: '78%' }} />
          </div>
          <span className="text-[10px] text-slate-500 font-medium">22% gap to close</span>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <span className="text-[10px] text-gray-500 uppercase font-black tracking-wider block">Skill chips to add next</span>
        <div className="flex flex-wrap gap-2">
          {[
            { name: 'Docker', icon: <IconBrandDocker className="w-3.5 h-3.5 text-sky-400" /> },
            { name: 'AWS', icon: <IconCloud className="w-3.5 h-3.5 text-amber-400" /> },
            { name: 'TypeScript', icon: <IconBrandTypescript className="w-3.5 h-3.5 text-indigo-400" /> },
            { name: 'CI/CD', icon: <IconGitMerge className="w-3.5 h-3.5 text-emerald-400" /> },
            { name: 'Microservices', icon: <IconTopologyStar className="w-3.5 h-3.5 text-purple-400" /> },
          ].map((chip, cIdx) => (
            <span 
              key={cIdx} 
              className="inline-flex items-center gap-1.5 bg-[#111625] border border-slate-800 hover:border-purple-500/40 text-xs font-semibold px-3 py-1.5 rounded-lg text-gray-300 cursor-default transition-colors select-none"
            >
              {chip.icon}
              {chip.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIRecommendations;