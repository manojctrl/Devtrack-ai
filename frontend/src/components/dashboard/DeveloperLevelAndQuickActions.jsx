import React from 'react';
import { Bolt, FileText, User, Brain, ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const DeveloperLevelAndQuickActions = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 max-w-7xl mx-auto bg-slate-900 text-slate-100">
      
      {/* Developer Level System Card */}
      <div className="flex-[2] bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-bold tracking-tight text-white">Developer Level System</h2>
            <p className="text-sm text-slate-400 mt-1">Calculated from GitHub activity & commits</p>
          </div>

          <div className="flex justify-between items-center bg-slate-900/40 border border-slate-700/30 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex flex-col items-center justify-center text-indigo-400">
                <span className="text-2xl font-bold leading-none">8</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">Senior Contributor</h3>
                <p className="text-xs font-mono text-slate-400 mt-0.5">4,850 / 5,000 XP</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-0.5">next level</span>
              <span className="text-base font-bold text-indigo-300">Level 9</span>
            </div>
          </div>

          {/* XP Progress Bar Section */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400">Progress to Level 9</span>
              <span className="font-semibold text-indigo-400">80%</span>
            </div>
            
            {/* Progress Track */}
            <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full w-[80%] transition-all duration-500 shadow-[0_0_12px_rgba(99,102,241,0.3)]"></div>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 pt-1">
              <Bolt className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span>150 XP remaining to reach Level 9</span>
            </div>
          </div>
        </div>

        {/* Level Milestones Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
          {[
            { value: '1,450', label: 'commits', color: 'text-indigo-400', bg: 'bg-indigo-500/5' },
            { value: '24', label: 'repos', color: 'text-emerald-400', bg: 'bg-emerald-500/5' },
            { value: '75', label: 'stars', color: 'text-amber-400', bg: 'bg-amber-500/5' },
            { value: '14d', label: 'streak', color: 'text-purple-400', bg: 'bg-purple-500/5' },
          ].map((milestone, idx) => (
            <div key={idx} className={`${milestone.bg} border border-slate-700/30 rounded-xl p-3 text-center`}>
              <div className={`text-xl font-bold tracking-tight ${milestone.color}`}>
                {milestone.value}
              </div>
              <div className="text-xs text-slate-400 mt-0.5 font-medium tracking-wide">
                {milestone.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions Card */}
      <div className="flex-1 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Bolt className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-bold tracking-tight text-white">Quick Actions</h2>
          </div>

          <div className="space-y-3">
            {[
              { label: 'Generate Resume', icon: FileText, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
              { label: 'View GitHub', icon: FaGithub, color: 'text-slate-300', bg: 'bg-slate-700/20' }, // ✅ swapped here
              { label: 'Edit Profile', icon: User, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
              { label: 'Analyze Skills', icon: Brain, color: 'text-purple-400', bg: 'bg-purple-500/10' },
            ].map((action, idx) => {
              const IconComponent = action.icon;
              return (
                <button
                  key={idx}
                  className="w-full flex items-center justify-between p-3.5 bg-slate-900/40 hover:bg-slate-800 border border-slate-700/40 hover:border-slate-600 rounded-xl group transition-all duration-200 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg ${action.bg} ${action.color} flex items-center justify-center`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                      {action.label}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-1 transition-all" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
};

export default DeveloperLevelAndQuickActions;
