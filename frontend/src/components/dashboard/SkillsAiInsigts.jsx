import { Cpu, Check, Container, Cloud, GitMerge, Network } from "lucide-react";
import { ChartColumn } from "lucide-react";
import { useMemo } from "react";

const LANGUAGE_COLORS = {
  JavaScript: { color: "#818CF8", fromColor: "#6366F1", toColor: "#818CF8" },
  TypeScript: { color: "#38BDF8", fromColor: "#0284C7", toColor: "#38BDF8" },
  Python: { color: "#34D399", fromColor: "#10B981", toColor: "#34D399" },
  HTML: { color: "#F87171", fromColor: "#F43F5E", toColor: "#F87171" },
  CSS: { color: "#C084FC", fromColor: "#A855F7", toColor: "#C084FC" },
  Java: { color: "#FB923C", fromColor: "#EA580C", toColor: "#FB923C" },
  Go: { color: "#22D3EE", fromColor: "#0891B2", toColor: "#22D3EE" },
  Ruby: { color: "#F43F5E", fromColor: "#BE123C", toColor: "#F43F5E" },
  PHP: { color: "#A78BFA", fromColor: "#7C3AED", toColor: "#A78BFA" },
};

const DEFAULT_COLOR = { color: "#A1A1AA", fromColor: "#71717A", toColor: "#A1A1AA" };

const SkillsAiInsigts = ({ profile, aiRecommendations, onTriggerAnalysis }) => {
  // 1. Calculate top languages from profile languages
  const skillsData = useMemo(() => {
    if (!profile || !profile.languages) {
      // Return fallback dummy data if not synced
      return [
        { name: "JavaScript", pct: "75%", ...LANGUAGE_COLORS.JavaScript },
        { name: "TypeScript", pct: "60%", ...LANGUAGE_COLORS.TypeScript },
        { name: "Python", pct: "40%", ...LANGUAGE_COLORS.Python },
      ];
    }

    const langs = Object.entries(profile.languages);
    if (langs.length === 0) {
      return [{ name: "No data", pct: "0%", ...DEFAULT_COLOR }];
    }

    const total = langs.reduce((sum, [_, count]) => sum + count, 0);

    return langs
      .map(([name, count]) => {
        const percentage = Math.round((count / total) * 100);
        const col = LANGUAGE_COLORS[name] || DEFAULT_COLOR;
        return {
          name,
          pct: `${percentage}%`,
          pctVal: percentage,
          ...col,
        };
      })
      .sort((a, b) => b.pctVal - a.pctVal)
      .slice(0, 5);
  }, [profile]);

  // 2. Parse AI recommendations
  const topLanguage = skillsData[0]?.name || "coding";

  const recommendedRole = aiRecommendations?.roleSuggestions?.[0]
    ? `${aiRecommendations.roleSuggestions[0].role} (${aiRecommendations.roleSuggestions[0].matchPercentage}% match)`
    : "Full Stack Developer";

  const summaryMessage = aiRecommendations?.roleSuggestions?.[0]?.reason || 
    `You are currently strongest in ${topLanguage}. Expand your portfolio with backend projects to balance your full stack presence.`;

  const nextSkills = useMemo(() => {
    if (aiRecommendations?.learningRoadmap && aiRecommendations.learningRoadmap.length > 0) {
      return aiRecommendations.learningRoadmap.map((item) => ({
        name: item.topic,
        icon: Cpu,
      }));
    }
    return [
      { name: "Docker", icon: Container },
      { name: "AWS", icon: Cloud },
      { name: "CI/CD", icon: GitMerge },
      { name: "REST APIs", icon: Network },
    ];
  }, [aiRecommendations]);

  return (
    <div className="flex flex-col md:flex-row gap-5 w-full text-text1 font-sora rounded-2xl">
      {/* Skills Overview */}
      <div className="flex-1 bg-card border border-white/5 rounded-r p-5 shadow-lg bg-[#1a2035] rounded-2xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-[15px] font-semibold flex items-center gap-2 text-white">
              <ChartColumn className="w-4 h-4 text-indigo-400" /> Skills Overview
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
              Auto Calculated from GitHub repos
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[18px]">
          {skillsData.map((skill, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-slate-350 text-slate-300">
                  {skill.name}
                </span>
                <span
                  className="text-xs font-semibold font-mono"
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
                    background: `linear-gradient(90deg, ${skill.fromColor}, ${skill.toColor})`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Career Insights */}
      <div className="flex-1 bg-card border border-white/5 rounded-r p-5 shadow-lg bg-[#1a2035] rounded-2xl">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-[11px] bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Cpu className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-[15px] font-semibold text-white">
                AI Career Insights
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                Powered by Gemini · Auto Generated
              </div>
            </div>
          </div>
          {onTriggerAnalysis && (
            <button 
              onClick={onTriggerAnalysis}
              className="border border-indigo-500/30 text-indigo-400 rounded-lg px-3 py-1.5 text-xs font-semibold hover:bg-indigo-500/10 transition-colors cursor-pointer"
            >
              Analyze Profile
            </button>
          )}
        </div>

        <div className="p-3 px-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-[#A5B4FC] mb-4 leading-relaxed">
          {summaryMessage}
        </div>

        <div className="p-3.5 px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 mb-4">
          <div className="text-[11px] text-slate-400 uppercase tracking-widest font-mono mb-1.5">
            Recommended Role
          </div>
          <div className="text-sm font-semibold text-[#34D399] flex items-center gap-1.5">
            <Check className="w-4 h-4 stroke-[3]" /> {recommendedRole}
          </div>
        </div>

        <div className="text-[11px] text-slate-400 uppercase tracking-widest font-mono mb-2.5">
          Next skills to learn
        </div>
        <div className="flex flex-wrap gap-1.5">
          {nextSkills.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/15 text-xs font-medium text-[#C084FC]"
              >
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
