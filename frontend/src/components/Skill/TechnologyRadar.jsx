import { 
  Radar, 
  Coffee, 
  Database, 
  Code, 
  Server, 
  Cloud, 
  GitMerge 
} from "lucide-react";
import { useMemo } from "react";

const TechnologyRadar = ({ profile, aiRecommendations }) => {
  const radarData = useMemo(() => {
    const langs = profile?.languages || {};
    const entries = Object.entries(langs);
    const total = entries.reduce((acc, [_, count]) => acc + count, 0);

    const expertItems = [];
    const intermediateItems = [];

    const iconMap = {
      Java: <Coffee className="w-4 h-4 text-red-400" />,
      MySQL: <Database className="w-4 h-4 text-green-400" />,
      Node: <Server className="w-4 h-4 text-yellow-400" />,
      React: <Code className="w-4 h-4 text-sky-400" />,
      TypeScript: <Code className="w-4 h-4 text-blue-400" />,
      Docker: <GitMerge className="w-4 h-4 text-sky-400" />,
      AWS: <Cloud className="w-4 h-4 text-amber-400" />,
    };

    entries.forEach(([name, count]) => {
      const pctVal = total ? Math.round((count / total) * 100) : 75; // normalized to 100
      const pct = `${Math.min(pctVal, 100)}%`;

      const item = {
        name,
        pct,
        pctColor: pctVal >= 70 ? "text-emerald-400" : "text-amber-400",
        icon: iconMap[name] || <Code className="w-4 h-4 text-indigo-400" />,
        iconBg: "bg-indigo-500/10",
      };

      if (pctVal >= 60) {
        expertItems.push(item);
      } else {
        intermediateItems.push(item);
      }
    });

    if (expertItems.length === 0) {
      expertItems.push(
        { name: "JavaScript", pct: "90%", pctColor: "text-emerald-400", icon: <Code className="w-4 h-4 text-indigo-400" />, iconBg: "bg-indigo-500/10" },
        { name: "HTML5/CSS3", pct: "85%", pctColor: "text-emerald-400", icon: <Code className="w-4 h-4 text-pink-400" />, iconBg: "bg-pink-500/10" }
      );
    }
    if (intermediateItems.length === 0) {
      intermediateItems.push(
        { name: "TypeScript", pct: "65%", pctColor: "text-amber-400", icon: <Code className="w-4 h-4 text-blue-400" />, iconBg: "bg-blue-500/10" },
        { name: "React", pct: "60%", pctColor: "text-amber-400", icon: <Code className="w-4 h-4 text-sky-400" />, iconBg: "bg-sky-500/10" }
      );
    }

    const learningItems = [];
    const roadmap = aiRecommendations?.learningRoadmap || [];
    roadmap.forEach((item) => {
      learningItems.push({
        name: item.topic,
        pct: item.importance === "High" ? "30%" : "15%",
        pctColor: "text-purple-400",
        icon: iconMap[item.topic] || <Cloud className="w-4 h-4 text-purple-400" />,
        iconBg: "bg-purple-500/10",
      });
    });

    if (learningItems.length === 0) {
      learningItems.push(
        { name: "Docker", pct: "20%", pctColor: "text-purple-400", icon: <GitMerge className="w-4 h-4 text-sky-400" />, iconBg: "bg-sky-500/10" },
        { name: "AWS Services", pct: "10%", pctColor: "text-purple-400", icon: <Cloud className="w-4 h-4 text-amber-400" />, iconBg: "bg-amber-500/10" }
      );
    }

    return [
      {
        level: "Expert",
        range: "70%+",
        dotColor: "bg-emerald-400",
        shadowColor: "shadow-emerald-500/50",
        borderColor: "border-emerald-500/15",
        items: expertItems.slice(0, 4),
      },
      {
        level: "Intermediate",
        range: "35–69%",
        dotColor: "bg-amber-400",
        shadowColor: "shadow-amber-500/50",
        borderColor: "border-amber-500/15",
        items: intermediateItems.slice(0, 4),
      },
      {
        level: "Learning",
        range: "0–34%",
        dotColor: "bg-purple-400",
        shadowColor: "shadow-purple-500/50",
        borderColor: "border-purple-500/15",
        items: learningItems.slice(0, 4),
      },
    ];
  }, [profile, aiRecommendations]);

  return (
    <div className="bg-[#1a2035] rounded-xl p-6 border border-slate-800 flex flex-col gap-5 shadow-md w-full mt-6">
      <div className="flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-gray-400">
        <Radar className="w-4 h-4 text-indigo-400" />
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
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <div className={`w-7 h-7 rounded-md flex items-center justify-center transition-transform group-hover:scale-105 shrink-0 ${item.iconBg}`}>
                      {item.icon}
                    </div>
                    <span className="text-xs font-bold text-gray-300 tracking-wide break-words">
                      {item.name}
                    </span>
                  </div>
                  <span className={`text-xs font-mono font-bold shrink-0 ${item.pctColor}`}>
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
