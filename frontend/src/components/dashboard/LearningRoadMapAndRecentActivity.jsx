import { Check, Loader2, Circle, GitBranch, GitCommit, AlertCircle, PlusCircle } from 'lucide-react';

const LearningRoadMapAndRecentActivity = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 max-w-7xl mx-auto bg-slate-900 text-slate-100 min-h-screen">
      
      <div className="flex-1 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">Learning Roadmap</h2>
            <p className="text-sm text-slate-400 mt-1">Your developer growth track</p>
          </div>
          <span className="text-xs font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-1 rounded-lg">
            4/7 done
          </span>
        </div>

        <div className="space-y-6">
          <div>
            <div className="text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-3">✅ Completed</div>
            <div className="space-y-2">
              {['Java', 'SQL / MySQL', 'React', 'Spring Boot'].map((tech) => (
                <div key={tech} className="flex items-center justify-between p-3 bg-slate-800/40 rounded-xl border border-slate-700/30">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-sm font-medium text-slate-300">{tech}</span>
                  </div>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">done</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold text-amber-400 tracking-wider uppercase mb-3">🔄 In Progress</div>
            <div className="flex items-center justify-between p-3 bg-slate-800/40 rounded-xl border border-slate-700/30">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Loader2 className="w-3 h-3 animate-spin" />
                </div>
                <span className="text-sm font-medium text-slate-300">Express.js</span>
              </div>
              <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">60%</span>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold text-slate-400 tracking-wider uppercase mb-3">⏳ Upcoming</div>
            <div className="space-y-2">
              {[
                { name: 'Docker', tag: 'next' },
                { name: 'AWS', tag: 'soon' },
                { name: 'CI/CD', tag: 'planned' }
              ].map((item) => (
                <div key={item.name} className="flex items-center justify-between p-3 bg-slate-900/20 rounded-xl border border-dashed border-slate-700/50">
                  <div className="flex items-center gap-3">
                    <Circle className="w-5 h-5 text-slate-600 stroke-[1.5]" />
                    <span className="text-sm font-medium text-slate-500">{item.name}</span>
                  </div>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-slate-800 text-slate-500 border border-slate-700">
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-xl">
        <div className="mb-6">
          <h2 className="text-xl font-bold tracking-tight text-white">Recent Activity</h2>
          <p className="text-sm text-slate-400 mt-1">Your latest actions</p>
        </div>

        <div className="relative pl-4 border-l-2 border-slate-700/50 space-y-6 ml-2">
          
          <div className="relative">
            <div className="absolute -left-[25px] mt-1 w-4 h-4 rounded-full bg-indigo-500 border-4 border-slate-900 flex items-center justify-center shadow-lg shadow-indigo-500/50"></div>
            <div>
              <span className="text-xs font-medium text-indigo-400">Today</span>
              <h4 className="text-sm font-semibold text-slate-200 mt-0.5 flex items-center gap-1.5">
                <PlusCircle className="w-3.5 h-3.5 text-indigo-400" /> Created DevTrack AI Repository
              </h4>
              <p className="text-xs text-slate-400 mt-1 font-mono bg-slate-900/50 p-2 rounded-lg border border-slate-700/30 inline-block">
                devtrack-ai · Initial commit
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-[25px] mt-1 w-4 h-4 rounded-full bg-indigo-500 border-4 border-slate-900 flex items-center justify-center shadow-lg shadow-indigo-500/50"></div>
            <div>
              <span className="text-xs font-medium text-indigo-400">Today</span>
              <h4 className="text-sm font-semibold text-slate-200 mt-0.5 flex items-center gap-1.5">
                <GitCommit className="w-3.5 h-3.5 text-indigo-400" /> Pushed 5 commits to main
              </h4>
              <p className="text-xs text-slate-400 mt-1 font-mono bg-slate-900/50 p-2 rounded-lg border border-slate-700/30 inline-block">
                devtrack-ai · Dashboard UI
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-[25px] mt-1 w-4 h-4 rounded-full bg-emerald-500 border-4 border-slate-900 flex items-center justify-center shadow-lg shadow-emerald-500/50"></div>
            <div>
              <span className="text-xs font-medium text-emerald-400">Yesterday</span>
              <h4 className="text-sm font-semibold text-slate-200 mt-0.5 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" /> Added Dashboard UI
              </h4>
              <p className="text-xs text-slate-400 mt-1 font-mono bg-slate-900/50 p-2 rounded-lg border border-slate-700/30 inline-block">
                devtrack-ai · feature/dashboard
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-[25px] mt-1 w-4 h-4 rounded-full bg-emerald-500 border-4 border-slate-900 flex items-center justify-center shadow-lg shadow-emerald-500/50"></div>
            <div>
              <span className="text-xs font-medium text-emerald-400">Yesterday</span>
              <h4 className="text-sm font-semibold text-slate-200 mt-0.5 flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5 text-emerald-400" /> Merged PR #12 — Auth System
              </h4>
              <p className="text-xs text-slate-400 mt-1 font-mono bg-slate-900/50 p-2 rounded-lg border border-slate-700/30 inline-block">
                rojgarsetu · main
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-[23px] mt-1 w-3 h-3 rounded-full bg-slate-600 border-2 border-slate-900"></div>
            <div>
              <span className="text-xs font-medium text-slate-400">2 Days Ago</span>
              <h4 className="text-sm font-medium text-slate-300 mt-0.5">Updated Portfolio</h4>
              <p className="text-xs text-slate-500 mt-1 font-mono bg-slate-900/30 p-1.5 rounded border border-slate-800 inline-block">
                travel-agency · README
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-[23px] mt-1 w-3 h-3 rounded-full bg-slate-600 border-2 border-slate-900"></div>
            <div>
              <span className="text-xs font-medium text-slate-400">3 Days Ago</span>
              <h4 className="text-sm font-medium text-slate-300 mt-0.5 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500/75" /> Opened Issue #7
              </h4>
              <p className="text-xs text-slate-500 mt-1 font-mono bg-slate-900/30 p-1.5 rounded border border-slate-800 inline-block">
                devtrack-ai · bug: heatmap
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default LearningRoadMapAndRecentActivity;