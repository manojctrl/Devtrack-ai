import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Calendar, ChevronRight, Star, LayoutGrid, Plane, Briefcase } from 'lucide-react';

// ✅ Reusable ProjectCard component
const ProjectCard = ({ project }) => {
  const IconComponent = project.icon;
  return (
    <div 
      className="flex items-center gap-3.5 py-3.5 border-b border-white/5 last:border-b-0 hover:bg-white/[0.01] transition-colors rounded-lg px-1 group cursor-pointer"
    >
      <div className={`w-10 h-10 rounded-[11px] ${project.iconBg} ${project.iconColor} flex items-center justify-center text-lg flex-shrink-0`}>
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

      <button 
        aria-label={`View ${project.name} project`}
        className="px-3.5 py-1.5 rounded-lg bg-brand-indigo-dim border border-brand-indigo/25 text-[#818CF8] text-xs font-medium font-sora hover:bg-brand-indigo/20 hover:border-brand-indigo/40 transition-all hidden sm:block"
      >
        View Project
      </button>
    </div>
  );
};

// ✅ Custom Tooltip for Chart
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-950/90 backdrop-blur-md border border-white/10 px-2.5 py-1.5 rounded-md shadow-xl font-mono text-[11px] text-white">
        <p className="font-semibold">{`${payload[0].value} commits`}</p>
      </div>
    );
  }
  return null;
};

const ActivityAndProjects = () => {
  // Chart Data
  const chartData = [
    { name: 'Jan', commits: 110 },
    { name: 'Feb', commits: 140 },
    { name: 'Mar', commits: 220 }, // Peak Month
    { name: 'Apr', commits: 90 },
    { name: 'May', commits: 160 },
  ];

  // Projects Data
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

  return (
    <div className="flex flex-col md:flex-row gap-5 w-full font-sora text-text1">
      
      {/* Left Card: Monthly Activity */}
      <div className="flex-1 bg-card border border-white/5 rounded-r p-5 flex flex-col justify-between shadow-xl">
        <div>
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="text-[15px] font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-indigo" /> Monthly Activity
              </div>
              <div className="text-[11px] text-text2 font-mono mt-0.5">Commit frequency · Jan–May 2024</div>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-text2 font-mono bg-white/[0.02] border border-white/5 px-2.5 py-1 rounded-md">
              <div className="w-2 h-2 rounded-sm bg-brand-indigo"></div>
              Commits
            </div>
          </div>

          {/* Chart */}
          <div className="h-36 w-full -ml-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barSize={40} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#475569', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)', radius: 6 }} />
                <Bar dataKey="commits" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.name === 'Mar' ? '#22C55E' : '#6366F1'} 
                      className="cursor-pointer transition-colors duration-200"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="flex gap-6 mt-6 pt-4 border-t border-white/5">
          <div>
            <div className="text-lg font-bold text-[#818CF8] tracking-tight">620</div>
            <div className="text-[10px] text-text3 font-mono">total commits</div>
          </div>
          <div>
            <div className="text-lg font-bold text-brand-emerald tracking-tight">+46%</div>
            <div className="text-[10px] text-text3 font-mono">growth</div>
          </div>
          <div>
            <div className="text-lg font-bold text-text1 tracking-tight">220</div>
            <div className="text-[10px] text-text3 font-mono">peak month</div>
          </div>
        </div>
      </div>

      {/* Right Card: Recent Projects */}
      <div className="flex-1 bg-card border border-white/5 rounded-r p-5 shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-[15px] font-semibold">Recent Projects</div>
              <div className="text-[11px] text-text2 font-mono mt-0.5">Your GitHub repositories</div>
            </div>
            <button 
              aria-label="View all projects"
              className="border border-white/10 text-text1 bg-white/[0.02] rounded px-3.5 py-1.5 text-xs font-medium hover:bg-white/5 transition-colors flex items-center gap-1"
            >
              View all <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Project List */}
          <div className="flex flex-col">
            {projectsData.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default ActivityAndProjects;
