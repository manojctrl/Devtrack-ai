import React from "react";
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
  Plane,
  Briefcase,
} from "lucide-react";

const ActivityAndProjects = () => {
  const chartData = [
    { name: "Jan", commits: 110 },
    { name: "Feb", commits: 140 },
    { name: "Mar", commits: 220 },
    { name: "Apr", commits: 90 },
    { name: "May", commits: 160 },
  ];

  const projectsData = [
    {
      name: "DevTrack AI",
      tech: "React • Express • MySQL",
      stars: 48,
      icon: LayoutGrid,
      iconColor: "text-brand-indigo",
      iconBg: "bg-brand-indigo-dim",
    },
    {
      name: "Travel Agency",
      tech: "React • Node.js",
      stars: 32,
      icon: Plane,
      iconColor: "text-brand-emerald",
      iconBg: "bg-brand-emerald-dim",
    },
    {
      name: "RojgarSetu",
      tech: "Java • MySQL",
      stars: 21,
      icon: Briefcase,
      iconColor: "text-brand-purple",
      iconBg: "bg-brand-purple-dim",
    },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/90 backdrop-blur-md border border-white/10 px-3 py-2 rounded-lg shadow-2xl font-mono text-xs text-white flex flex-col gap-0.5">
          <span className="text-[10px] text-text2 uppercase tracking-wider">
            {payload[0].payload.name}
          </span>
          <span className="font-bold text-brand-indigo">{`${payload[0].value} Commits`}</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col md:flex-row gap-5 w-full font-sora text-text1">
      <div className="flex-1 min-w-0 bg-card border border-white/5 rounded-r p-5 flex flex-col justify-between shadow-xl  rounded-xl bg-[#1a2035]">
        <div className="w-full">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="text-[15px] font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-indigo" /> Monthly
                Activity
              </div>
              <div className="text-[11px] text-text2 font-mono mt-0.5">
                Commit frequency · Jan–May 2024
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-text2 font-mono bg-white/[0.02] border border-white/5 px-2.5 py-1 rounded-md">
              <div className="w-2 h-2 rounded-sm bg-brand-indigo"></div>
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
              620
            </div>
            <div className="text-[10px] text-text3 font-mono">
              total commits
            </div>
          </div>
          <div>
            <div className="text-lg font-bold text-brand-emerald tracking-tight">
              +46%
            </div>
            <div className="text-[10px] text-text3 font-mono">growth</div>
          </div>
          <div>
            <div className="text-lg font-bold text-text1 tracking-tight">
              220
            </div>
            <div className="text-[10px] text-text3 font-mono">peak month</div>
          </div>
        </div>
      </div>

      <div className="flex-1 min-w-0 bg-card border border-white/5 rounded-r p-5 shadow-xl flex flex-col justify-between  rounded-xl bg-[#1a2035]">
        <div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-[15px] font-semibold">Recent Projects</div>
              <div className="text-[11px] text-text2 font-mono mt-0.5">
                Your GitHub repositories
              </div>
            </div>
            <button className="border border-white/10 text-text1 bg-white/[0.02] rounded px-3.5 py-1.5 text-xs font-medium hover:bg-white/5 transition-colors flex items-center gap-1.5 group/btn">
              View all{" "}
              <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="flex flex-col">
            {projectsData.map((project, index) => {
              const IconComponent = project.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-3.5 py-3.5 border-b border-white/5 last:border-b-0 hover:bg-white/[0.015] transition-all rounded-lg px-2 -mx-2 group cursor-pointer"
                >
                  <div
                    className={`w-10 h-10 rounded-[11px] ${project.iconBg} ${project.iconColor} flex items-center justify-center text-lg flex-shrink-0 group-hover:scale-105 transition-transform`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-text1 truncate group-hover:text-brand-indigo transition-colors">
                      {project.name}
                    </div>
                    <div className="text-xs text-text3 font-mono mt-0.5 truncate">
                      {project.tech}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-[#FCD34D] font-mono mr-2">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {project.stars}
                  </div>

                  <button className="px-3.5 py-1.5 rounded-lg bg-brand-indigo-dim border border-brand-indigo/25 text-[#818CF8] text-xs font-medium font-sora hover:bg-brand-indigo/20 hover:border-brand-indigo/40 transition-all hidden sm:block">
                    View Project
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityAndProjects;
