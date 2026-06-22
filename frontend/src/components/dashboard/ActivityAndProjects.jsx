import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from "recharts";
import {
  Calendar,
  ChevronRight,
  Star,
  LayoutGrid,
  Code,
} from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/90 backdrop-blur-md border border-white/10 px-3 py-2 rounded-lg shadow-2xl font-mono text-xs text-white flex flex-col gap-0.5">
        <span className="text-[10px] text-slate-400 uppercase tracking-wider">
          {payload[0].payload.name}
        </span>
        <span className="font-bold text-indigo-400">{`${payload[0].value} Commits`}</span>
      </div>
    );
  }

  return null;
};

const ActivityAndProjects = ({ profile, repos }) => {
  const chartData = useMemo(() => {
    const heatmap = profile?.contributionHeatmap || {};
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const result = [];
    const today = new Date();
    
    for (let i = 4; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const mName = months[d.getMonth()];
      
      let commitsCount = 0;
      Object.entries(heatmap).forEach(([dateStr, count]) => {
        const dateObj = new Date(dateStr);
        if (dateObj.getMonth() === d.getMonth() && dateObj.getFullYear() === d.getFullYear()) {
          commitsCount += count;
        }
      });
      
      result.push({
        name: mName,
        commits: commitsCount,
      });
    }
    return result;
  }, [profile]);

  const totalCommitsVal = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.commits, 0);
  }, [chartData]);

  const maxCommitsVal = useMemo(() => {
    if (chartData.length === 0) return 0;
    return Math.max(...chartData.map(c => c.commits));
  }, [chartData]);

  const projectsData = useMemo(() => {
    const items = repos || [];
    return items.slice(0, 3).map((repo) => ({
      name: repo.name,
      tech: repo.language || "Web Technology",
      stars: repo.stars,
      htmlUrl: repo.htmlUrl,
      icon: LayoutGrid,
      iconColor: "text-indigo-400",
      iconBg: "bg-indigo-500/10",
    }));
  }, [repos]);

  return (
    <div className="flex flex-col md:flex-row gap-5 w-full font-sora text-text1">
      {/* Monthly Activity Card */}
      <div className="flex-1 min-w-0 bg-[#1a2035] border border-white/5 rounded-xl p-5 flex flex-col justify-between shadow-xl">
        <div className="w-full">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="text-[15px] font-semibold flex items-center gap-2 text-white">
                <Calendar className="w-4 h-4 text-indigo-400" /> Monthly Activity
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                Commit frequency · Last 5 months
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono bg-white/[0.02] border border-white/5 px-2.5 py-1 rounded-md">
              <div className="w-2 h-2 rounded-sm bg-indigo-500"></div>
              Commits
            </div>
          </div>

          <div className="h-36 w-full -ml-3.5 pr-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                barSize={36}
                margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.03)"
                  vertical={false}
                />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#475569",
                    fontSize: 10,
                    fontFamily: "JetBrains Mono",
                  }}
                  dy={8}
                />
                <YAxis hide={true} domain={[0, "dataMax + 20"]} />

                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "rgba(255,255,255,0.015)", radius: 6 }}
                  animationDuration={200}
                />

                <Bar dataKey="commits" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill="#6366F1"
                      className="cursor-pointer transition-all duration-300 hover:fill-[#818CF8] hover:opacity-90"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex gap-6 mt-6 pt-4 border-t border-white/5">
          <div>
            <div className="text-lg font-bold text-[#818CF8] tracking-tight">
              {totalCommitsVal}
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              tracked commits
            </div>
          </div>
          <div>
            <div className="text-lg font-bold text-emerald-400 tracking-tight">
              Active
            </div>
            <div className="text-[10px] text-slate-400 font-mono">sync status</div>
          </div>
          <div>
            <div className="text-lg font-bold text-white tracking-tight">
              {maxCommitsVal}
            </div>
            <div className="text-[10px] text-slate-400 font-mono">peak commits</div>
          </div>
        </div>
      </div>

      {/* Recent Projects Card */}
      <div className="flex-1 min-w-0 bg-[#1a2035] border border-white/5 rounded-xl p-5 shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-[15px] font-semibold text-white">Top Starred Projects</div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                Your popular repositories
              </div>
            </div>
            <Link 
              to="/github-analytics"
              className="border border-white/10 text-white bg-white/[0.02] rounded px-3.5 py-1.5 text-xs font-medium hover:bg-white/5 transition-colors flex items-center gap-1.5 group/btn cursor-pointer"
            >
              View all{" "}
              <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="flex flex-col">
            {projectsData.length > 0 ? (
              projectsData.map((project, index) => {
                const IconComponent = project.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3.5 py-3.5 border-b border-white/5 last:border-b-0 hover:bg-white/[0.015] transition-all rounded-lg px-2 -mx-2 group cursor-pointer"
                    onClick={() => window.open(project.htmlUrl, "_blank")}
                  >
                    <div
                      className={`w-10 h-10 rounded-[11px] ${project.iconBg} ${project.iconColor} flex items-center justify-center text-lg flex-shrink-0 group-hover:scale-105 transition-transform`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-white truncate group-hover:text-indigo-400 transition-colors">
                        {project.name}
                      </div>
                      <div className="text-xs text-slate-400 font-mono mt-0.5 truncate flex items-center gap-1.5">
                        <Code size={10} /> {project.tech}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-[#FCD34D] font-mono mr-2">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      {project.stars}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.htmlUrl, "_blank");
                      }}
                      className="px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/25 text-[#818CF8] text-xs font-semibold hover:bg-indigo-500/20 transition-all hidden sm:block cursor-pointer"
                    >
                      View GitHub
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="py-8 text-center text-slate-500 text-xs font-mono">
                No repositories found. Sync your GitHub profile in Settings.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityAndProjects;
