import { Check, Loader2, Circle, GitBranch, GitCommit, PlusCircle, Activity } from "lucide-react";
import { useMemo } from "react";

const LearningRoadMapAndRecentActivity = ({ profile, aiRecommendations }) => {
  const completedTech = useMemo(() => {
    if (profile && profile.languages) {
      return Object.keys(profile.languages).slice(0, 4);
    }
    return ["JavaScript", "HTML", "CSS"];
  }, [profile]);

  const inProgressTech = useMemo(() => {
    if (aiRecommendations?.learningRoadmap && aiRecommendations.learningRoadmap.length > 0) {
      return aiRecommendations.learningRoadmap.slice(0, 1).map((item) => ({
        name: item.topic,
        progress: "60%",
      }));
    }
    return [{ name: "Next.js", progress: "60%" }];
  }, [aiRecommendations]);

  const upcomingTech = useMemo(() => {
    if (aiRecommendations?.learningRoadmap && aiRecommendations.learningRoadmap.length > 1) {
      return aiRecommendations.learningRoadmap.slice(1).map((item) => ({
        name: item.topic,
        tag: item.importance === "High" ? "next" : "planned",
      }));
    }
    return [
      { name: "Docker", tag: "next" },
      { name: "AWS", tag: "soon" },
      { name: "CI/CD", tag: "planned" },
    ];
  }, [aiRecommendations]);

  // 2. Process Recent Activities
  const recentActivities = useMemo(() => {
    const list = profile?.recentActivity || [];
    if (list.length === 0) {
      return [
        {
          title: "Connected GitHub account",
          detail: "Syncing repositories and stats",
          dateText: "Recently",
          icon: <Check className="w-3.5 h-3.5 text-indigo-400" />,
        },
      ];
    }

    return list.slice(0, 5).map((act) => {
      const actDate = new Date(act.date);
      const diffMs = new Date() - actDate;
      const diffHrs = Math.floor(diffMs / 3600000);
      
      let dateText;
      if (diffHrs === 0) {
        const mins = Math.floor(diffMs / 60000);
        dateText = mins <= 1 ? "Just now" : `${mins} mins ago`;
      } else if (diffHrs < 24) {
        dateText = `${diffHrs} hours ago`;
      } else {
        const days = Math.floor(diffHrs / 24);
        dateText = days === 1 ? "Yesterday" : `${days} days ago`;
      }

      let title;
      let detail = act.repo;
      let icon;

      if (act.type === "PushEvent") {
        title = `Pushed ${act.count} commit${act.count > 1 ? "s" : ""} to main`;
        icon = <GitCommit className="w-3.5 h-3.5 text-indigo-400" />;
      } else if (act.type === "CreateEvent") {
        title = "Created repository";
        icon = <PlusCircle className="w-3.5 h-3.5 text-indigo-400" />;
      } else if (act.type === "WatchEvent") {
        title = "Starred repository";
        icon = <GitBranch className="w-3.5 h-3.5 text-indigo-400" />;
      } else {
        title = "Performed GitHub activity";
        icon = <Activity className="w-3.5 h-3.5 text-indigo-400" />;
      }

      return {
        title,
        detail,
        dateText,
        icon,
      };
    });
  }, [profile]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full text-slate-100 mt-6">
      {/* Learning Roadmap Pane */}
      <div className="flex-1 bg-[#1a2035] border border-white/5 rounded-2xl p-6 shadow-xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">Learning Roadmap</h2>
            <p className="text-sm text-slate-400 mt-1">Your developer growth track</p>
          </div>
          <span className="text-xs font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-1 rounded-lg">
            {completedTech.length} tech done
          </span>
        </div>

        <div className="space-y-6">
          {/* Completed Tech */}
          <div>
            <div className="text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-3">✅ Completed</div>
            <div className="space-y-2">
              {completedTech.map((tech) => (
                <div key={tech} className="flex items-center justify-between p-3 bg-slate-900/40 rounded-xl border border-slate-700/30">
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

          {/* In Progress Tech */}
          <div>
            <div className="text-xs font-semibold text-amber-400 tracking-wider uppercase mb-3">🔄 In Progress</div>
            {inProgressTech.map((tech) => (
              <div key={tech.name} className="flex items-center justify-between p-3 bg-slate-900/40 rounded-xl border border-slate-700/30">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Loader2 className="w-3 h-3 animate-spin" />
                  </div>
                  <span className="text-sm font-medium text-slate-300">{tech.name}</span>
                </div>
                <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">{tech.progress}</span>
              </div>
            ))}
          </div>

          {/* Upcoming Tech */}
          <div>
            <div className="text-xs font-semibold text-slate-400 tracking-wider uppercase mb-3">⏳ Upcoming</div>
            <div className="space-y-2">
              {upcomingTech.map((item) => (
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

      {/* Recent Activity Pane */}
      <div className="flex-1 bg-[#1a2035] border border-white/5 rounded-2xl p-6 shadow-xl">
        <div className="mb-6">
          <h2 className="text-xl font-bold tracking-tight text-white">Recent Activity</h2>
          <p className="text-sm text-slate-400 mt-1">Your latest actions</p>
        </div>

        <div className="relative pl-4 border-l-2 border-slate-700/50 space-y-6 ml-2">
          {recentActivities.map((act, idx) => (
            <div key={idx} className="relative">
              <div className="absolute -left-[25px] mt-1 w-4 h-4 rounded-full bg-indigo-500 border-4 border-slate-900 flex items-center justify-center shadow-lg shadow-indigo-500/50"></div>
              <div>
                <span className="text-xs font-medium text-indigo-400">{act.dateText}</span>
                <h4 className="text-sm font-semibold text-slate-200 mt-0.5 flex items-center gap-1.5">
                  {act.icon}
                  {act.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1 font-mono bg-slate-900/50 p-2 rounded-lg border border-slate-700/30 inline-block">
                  {act.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningRoadMapAndRecentActivity;