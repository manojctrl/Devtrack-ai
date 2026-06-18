import { Sliders } from "lucide-react";
import { useMemo } from "react";

const GRADIENTS = [
  "from-indigo-500 to-purple-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-purple-500 to-pink-500",
];

const SkillProficiency = ({ profile }) => {
  const dynamicSkills = useMemo(() => {
    const langs = profile?.languages || {};
    const entries = Object.entries(langs);
    if (entries.length === 0) {
      // Fallback
      return [
        { name: "JavaScript", score: 85, level: "Expert", badge: "text-emerald-400 border-emerald-500/25 bg-emerald-500/10", text: "text-emerald-400", grad: GRADIENTS[0], label: "Core" },
        { name: "TypeScript", score: 65, level: "Intermediate", badge: "text-indigo-400 border-indigo-500/25 bg-indigo-500/10", text: "text-indigo-400", grad: GRADIENTS[1], label: "Explore" },
        { name: "Python", score: 45, level: "Exploring", badge: "text-purple-400 border-purple-500/25 bg-purple-500/10", text: "text-purple-400", grad: GRADIENTS[2], label: "Scripting" },
      ];
    }

    const totalCount = entries.reduce((acc, [_, count]) => acc + count, 0);

    return entries
      .map(([name, count], index) => {
        const score = Math.round((count / totalCount) * 100);
        let level = "Exploring";
        let badge = "text-purple-400 border-purple-500/25 bg-purple-500/10";
        let text = "text-purple-400";
        let label = "Beginner";

        if (score >= 70) {
          level = "Expert";
          badge = "text-emerald-400 border-emerald-500/25 bg-emerald-500/10";
          text = "text-emerald-450 text-emerald-400";
          label = "Primary";
        } else if (score >= 35) {
          level = "Intermediate";
          badge = "text-indigo-400 border-indigo-500/25 bg-indigo-500/10";
          text = "text-indigo-400";
          label = "Secondary";
        }

        return {
          name,
          score,
          level,
          badge,
          text,
          grad: GRADIENTS[index % GRADIENTS.length],
          label,
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);
  }, [profile]);

  return (
    <div className="bg-[#1a2035] rounded-xl p-6 border border-slate-800 flex flex-col h-[400px] shadow-md w-full justify-between">
      <div className="flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-gray-400">
        <Sliders className="w-4 h-4 text-indigo-400" />
        <span>Skill Proficiency</span>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-3.5 mt-2">
        {dynamicSkills.map((skill, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-100 tracking-wide">{skill.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded border ${skill.badge}`}>
                  {skill.level}
                </span>
              </div>
              <span className={`font-mono font-bold ${skill.text}`}>{skill.score}%</span>
            </div>

            <div className="w-full h-5 bg-[#111625]/80 rounded-md overflow-hidden p-[2px] border border-slate-800/40">
              <div 
                className={`h-full rounded-[4px] bg-gradient-to-r ${skill.grad} flex items-center pl-2 transition-all duration-500`}
                style={{ width: `${skill.score}%` }}
              >
                <span className="text-[9px] font-black uppercase tracking-wider text-white/90 drop-shadow-sm">
                  {skill.label}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillProficiency;
