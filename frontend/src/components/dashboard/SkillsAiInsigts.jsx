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
    <div className="  flex  flex-col md:flex-row gap-5 w-full text-text1 font-sora">
      <div className="flex-1 bg-card border border-white/5 rounded-r p-5">
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
      <div className="flex-1 bg-card border border-white/5 rounded-r p-5">
        RIGHT
      </div>
    </div>
  );
};

export default SkillsAiInsigts;
