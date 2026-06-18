import { 
  Bot, 
  Check, 
  Container, 
  Cloud, 
  Code, 
  GitMerge, 
  Cpu 
} from "lucide-react";
import { useMemo } from "react";

const AIRecommendations = ({ aiRecommendations }) => {
  const recommendedRole = useMemo(() => {
    if (aiRecommendations?.roleSuggestions?.[0]) {
      return aiRecommendations.roleSuggestions[0].role;
    }
    return "Full Stack Developer";
  }, [aiRecommendations]);

  const matchPercentage = useMemo(() => {
    if (aiRecommendations?.roleSuggestions?.[0]) {
      return aiRecommendations.roleSuggestions[0].matchPercentage;
    }
    return 75;
  }, [aiRecommendations]);

  const summary = useMemo(() => {
    if (aiRecommendations?.roleSuggestions?.[0]?.reason) {
      return aiRecommendations.roleSuggestions[0].reason;
    }
    return "Based on your repository skills, you have a solid programming structure. Focus on learning containers and cloud deployment to level up.";
  }, [aiRecommendations]);

  const nextSkills = useMemo(() => {
    if (aiRecommendations?.learningRoadmap && aiRecommendations.learningRoadmap.length > 0) {
      return aiRecommendations.learningRoadmap.slice(0, 3).map((item) => item.topic);
    }
    return ["Docker", "AWS", "TypeScript"];
  }, [aiRecommendations]);

  const chips = useMemo(() => {
    if (aiRecommendations?.skillGaps && aiRecommendations.skillGaps.length > 0) {
      return aiRecommendations.skillGaps.map((item) => item.skill);
    }
    return ["Docker", "AWS", "TypeScript", "CI/CD", "System Design"];
  }, [aiRecommendations]);

  return (
    <div className="bg-[#1a2035] rounded-xl p-6 border border-slate-800 flex flex-col h-[520px] justify-between shadow-md w-full">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-md shadow-purple-500/5">
          <Bot className="w-5 h-5 animate-pulse" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-gray-200 text-sm tracking-wide">AI Recommendations</span>
          <span className="text-[10px] text-purple-400 font-semibold uppercase tracking-wider mt-0.5">
            Powered by Gemini
          </span>
        </div>
      </div>

      <div className="bg-purple-950/20 border border-purple-500/15 rounded-xl p-4 text-xs leading-relaxed text-purple-300 font-medium mt-4">
        {summary}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-4 flex-1 justify-center items-center">
        {/* Recommended Role */}
        <div className="bg-[#111625]/40 border border-slate-800/60 rounded-xl p-3.5 space-y-1.5 h-full flex flex-col justify-center">
          <span className="text-[10px] text-gray-500 uppercase font-black tracking-wider">Recommended Role</span>
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
            <Check className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{recommendedRole}</span>
          </div>
        </div>

        {/* Next Technologies */}
        <div className="bg-[#111625]/40 border border-slate-800/60 rounded-xl p-3.5 space-y-2 h-full flex flex-col justify-center">
          <span className="text-[10px] text-gray-500 uppercase font-black tracking-wider">Next Technologies</span>
          <div className="space-y-1">
            {nextSkills.map((name, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[11px] font-bold text-gray-300">
                <Code className="w-3.5 h-3.5 text-indigo-400" /> <span className="truncate">{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Estimated Readiness */}
        <div className="bg-[#111625]/40 border border-slate-800/60 rounded-xl p-3.5 space-y-1.5 h-full flex flex-col justify-center">
          <span className="text-[10px] text-gray-500 uppercase font-black tracking-wider">Estimated Readiness</span>
          <div className="text-xl font-mono font-black text-purple-400">{matchPercentage}%</div>
          <div className="w-full h-2 bg-[#111625] rounded-full overflow-hidden border border-slate-800/50 p-[1px]">
            <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" style={{ width: `${matchPercentage}%` }} />
          </div>
          <span className="text-[10px] text-slate-500 font-medium">{100 - matchPercentage}% gap to close</span>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <span className="text-[10px] text-gray-500 uppercase font-black tracking-wider block">Skill chips to add next</span>
        <div className="flex flex-wrap gap-2 overflow-y-auto max-h-[100px] pr-2">
          {chips.map((name, idx) => (
            <span 
              key={idx} 
              className="inline-flex items-center gap-1.5 bg-[#111625] border border-slate-800 hover:border-purple-500/40 text-xs font-semibold px-3 py-1.5 rounded-lg text-gray-300 cursor-default transition-colors select-none"
            >
              <Cpu size={12} className="text-indigo-400" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIRecommendations;
