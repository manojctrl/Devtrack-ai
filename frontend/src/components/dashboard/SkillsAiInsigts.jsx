import { Cpu, Check, Container, Cloud, GitMerge, Network } from "lucide-react";
import { ChartColumn } from "lucide-react";

const SkillsAiInsigts = () => {
  const skillsData = [
    {
      name: "Java",
      pct: "90%",
      color: "#818CF8",
      fromColor: "#6366F1",
      toColor: "#818CF8",
    },
    {
      name: "MySQL",
      pct: "80%",
      color: "#34D399",
      fromColor: "#10B981",
      toColor: "#34D399",
    },
    {
      name: "React",
      pct: "75%",
      color: "#C084FC",
      fromColor: "#A855F7",
      toColor: "#C084FC",
    },
    {
      name: "Node.js",
      pct: "60%",
      color: "#FCD34D",
      fromColor: "#F59E0B",
      toColor: "#FCD34D",
    },
    {
      name: "Spring Boot",
      pct: "55%",
      color: "#F87171",
      fromColor: "#F43F5E",
      toColor: "#F87171",
    },
  ];
  const nextSkills = [
    { name: "Docker", icon: Container },
    { name: "AWS", icon: Cloud },
    { name: "CI/CD", icon: GitMerge },
    { name: "REST APIs", icon: Network },
  ];
  return (
    <div className="  flex  flex-col md:flex-row gap-5 w-full text-text1 font-sora rounded-2xl" >
      <div className="flex-1 bg-card border border-white/5 rounded-r p-5  shadow-lg bg-[#1a2035]">
        <div className="  flex  justify-between items-start  mb-4">
          <div>
            <div className="text-[15px] font-semibold  flex items-center gap-2 ">
              <ChartColumn className="w-4 h-4 text-brand-indigo" /> Skills
              Overview
            </div>
            <div className="text-[11px] text-text2 font-mono mt-0.5">
              Auto Calcualted from GitHub repos
            </div>
          </div>
          <button className="border border-white/10 text-text1 rounded px-3.5 py-1.5 text-xs font-medium hover:bg-white/5 transition-colors">
            {" "}
            Analyse All
          </button>
        </div>
        <div className="flex flex-col gap-[18px]">
          {skillsData.map((skill, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-text1">
                  {skill.name}
                </span>
                <span
                  className="text-xs font-semibold font-mono "
                  style={{ color: skill.color }}
                >
                  {skill.pct}
                </span>
              </div>
              <div className="h-2 bg-white/[0.08] border border-white/[0.03] rounded-full overflow-hidden">
                <div 
                  className="relative h-full rounded-full overflow-hidden after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:animate-shimmer"
                  style={{ 
                    width: skill.pct,
                    background: `linear-gradient(90deg, ${skill.fromColor}, ${skill.toColor})`
                  }}
                ></div>
              </div>
              
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 bg-card border border-white/5 rounded-r p-5  shadow-lg bg-[#1a2035] rounded-2xl">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-10 h-10 rounded-[11px] bg-brand-purple-dim border border-purple/20 flex items-center justify-center text-purple">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-[15px] font-semibold text-text1">AI Career Insights</div>
            <div className="text-[11px] text-text2 font-mono">Powered by Gemini · Updated today</div>
          </div>
        </div>

        <div className="p-3 px-4 rounded-r bg-brand-indigo-dim border border-indigo/15 text-xs text-[#A5B4FC] mb-4 leading-relaxed">
          You are currently strongest in <span className="font-bold text-[#818CF8]">Java</span>. Your backend skills are production-ready.
        </div>

        <div className="p-3.5 px-4 rounded-r bg-brand-emerald-dim border border-emerald/15 mb-4">
          <div className="text-[11px] text-text2 uppercase tracking-widest font-mono mb-1.5">Recommended Role</div>
          <div className="text-sm font-semibold text-[#34D399] flex items-center gap-1.5">
            <Check className="w-4 h-4 stroke-[3]" /> Junior Full Stack Developer
          </div>
        </div>

        <div className="text-[11px] text-text2 uppercase tracking-widest font-mono mb-2.5">Next skills to learn</div>
        <div className="flex flex-wrap gap-1.5">
          {nextSkills.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <span key={index} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-purple-dim border border-purple/15 text-xs font-medium text-[#C084FC]">
                <IconComponent className="w-3.5 h-3.5" /> {skill.name}
              </span>
            );
          })}
        </div>
      </div>
      </div>
  
  );
};

export default SkillsAiInsigts;
