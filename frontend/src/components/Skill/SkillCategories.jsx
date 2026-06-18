import { 
  Grid, 
  Monitor, 
  Server, 
  Database, 
  Wrench 
} from "lucide-react";
import { useMemo } from "react";

const SkillCategoriesList = ({ profile }) => {
  const categories = useMemo(() => {
    const langs = Object.keys(profile?.languages || {});
    
    // Default categories if no profile languages loaded
    if (langs.length === 0) {
      return [
        {
          name: "Frontend",
          count: 4,
          icon: <Monitor className="w-5 h-5 text-sky-400" />,
          iconBg: "bg-sky-500/10",
          tags: [
            { name: "React", color: "text-indigo-400 border-indigo-500/25 bg-indigo-500/8" },
            { name: "JavaScript", color: "text-amber-400 border-amber-500/25 bg-amber-500/8" },
            { name: "HTML", color: "text-rose-400 border-rose-500/25 bg-rose-500/8" },
            { name: "CSS", color: "text-purple-400 border-purple-500/25 bg-purple-500/8" },
          ]
        },
        {
          name: "Backend",
          count: 3,
          icon: <Server className="w-5 h-5 text-emerald-400" />,
          iconBg: "bg-emerald-500/10",
          tags: [
            { name: "Node.js", color: "text-lime-400 border-lime-500/25 bg-lime-500/8" },
            { name: "Express", color: "text-purple-400 border-purple-500/25 bg-purple-500/8" },
            { name: "Python", color: "text-amber-400 border-amber-500/25 bg-amber-500/8" },
          ]
        },
        {
          name: "Database",
          count: 1,
          icon: <Database className="w-5 h-5 text-amber-400" />,
          iconBg: "bg-amber-500/10",
          tags: [
            { name: "SQL", color: "text-emerald-400 border-emerald-500/25 bg-emerald-500/8" }
          ]
        },
        {
          name: "Tools",
          count: 3,
          icon: <Wrench className="w-5 h-5 text-purple-400" />,
          iconBg: "bg-purple-500/10",
          tags: [
            { name: "Git", color: "text-rose-400 border-rose-500/25 bg-rose-500/8" },
            { name: "GitHub", color: "text-slate-350 border-slate-500/20 bg-white/5" },
            { name: "VS Code", color: "text-sky-400 border-sky-500/25 bg-sky-500/8" }
          ]
        }
      ];
    }

    const frontendLangs = [];
    const backendLangs = [];
    const dbLangs = [];
    const toolLangs = ["Git", "GitHub", "VS Code"]; // static additions

    langs.forEach((lang) => {
      const lower = lang.toLowerCase();
      if (["javascript", "typescript", "html", "css", "vue", "svelte", "angular", "sass"].includes(lower)) {
        frontendLangs.push(lang);
      } else if (["mysql", "postgresql", "sqlite", "mongodb", "redis", "oracle", "sql"].includes(lower)) {
        dbLangs.push(lang);
      } else {
        backendLangs.push(lang);
      }
    });

    const categoriesList = [];

    categoriesList.push({
      name: "Frontend",
      count: frontendLangs.length || 1,
      icon: <Monitor className="w-5 h-5 text-sky-400" />,
      iconBg: "bg-sky-500/10",
      tags: (frontendLangs.length > 0 ? frontendLangs : ["HTML/CSS"]).map((name) => ({
        name,
        color: "text-sky-400 border-sky-500/25 bg-sky-500/8"
      }))
    });

    categoriesList.push({
      name: "Backend",
      count: backendLangs.length || 1,
      icon: <Server className="w-5 h-5 text-emerald-400" />,
      iconBg: "bg-emerald-500/10",
      tags: (backendLangs.length > 0 ? backendLangs : ["Node.js"]).map((name) => ({
        name,
        color: "text-emerald-400 border-emerald-500/25 bg-emerald-500/8"
      }))
    });

    categoriesList.push({
      name: "Database",
      count: dbLangs.length || 1,
      icon: <Database className="w-5 h-5 text-amber-400" />,
      iconBg: "bg-amber-500/10",
      tags: (dbLangs.length > 0 ? dbLangs : ["SQLite"]).map((name) => ({
        name,
        color: "text-amber-400 border-amber-500/25 bg-amber-500/8"
      }))
    });

    categoriesList.push({
      name: "Tools",
      count: toolLangs.length,
      icon: <Wrench className="w-5 h-5 text-purple-400" />,
      iconBg: "bg-purple-500/10",
      tags: toolLangs.map((name) => ({
        name,
        color: "text-purple-400 border-purple-500/25 bg-purple-500/8"
      }))
    });

    return categoriesList;
  }, [profile]);

  return (
    <div className="bg-[#1a2035] rounded-xl p-6 border border-slate-800 flex flex-col gap-5 shadow-md w-full mt-6">
      <div className="flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-gray-400">
        <Grid className="w-4 h-4 text-indigo-400" />
        <span>Skill Categories</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat, idx) => (
          <div 
            key={idx} 
            className="bg-[#111625]/50 border border-slate-800/60 rounded-xl p-4 space-y-4 hover:border-slate-700/80 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${cat.iconBg}`}>
                {cat.icon}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-100 text-sm tracking-wide">{cat.name}</span>
                <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mt-0.5">
                  {cat.count} skills
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {cat.tags.map((tag, tIdx) => (
                <span 
                  key={tIdx} 
                  className={`text-[10px] font-bold px-2.5 py-1 rounded border tracking-wide transition-all hover:scale-105 select-none ${tag.color}`}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillCategoriesList;