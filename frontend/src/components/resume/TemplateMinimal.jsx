import { useMemo } from "react";

export default function TemplateMinimal({ user, githubProfile, repos }) {
  const name = user ? `${user.firstName} ${user.lastName}` : "Developer Name";
  const title = user?.bio ? user.bio.split(".")[0] : "Full Stack Developer";
  const email = user?.email || "developer@devtrack.ai";
  const github = user?.githubUsername || "github-developer";
  const location = user?.location || "San Francisco, CA";
  const website = user?.website || user?.portfolio || "devtrack.ai";

  const projects = useMemo(() => {
    if (repos && repos.length > 0) {
      return repos.slice(0, 3).map((r) => ({
        name: r.name,
        tech: r.language || "Web Technology",
        desc: r.description || "GitHub repository project details.",
      }));
    }
    return [
      { name: "DevTrack AI", tech: "React · Express · MySQL · GitHub API", desc: "Developer analytics and personal branding platform with GitHub integration." },
      { name: "Travel Agency", tech: "React · Node.js · MongoDB", desc: "Full-stack travel booking application with real-time availability." },
    ];
  }, [repos]);

  const skills = useMemo(() => {
    if (githubProfile?.languages && Object.keys(githubProfile.languages).length > 0) {
      const total = Object.values(githubProfile.languages).reduce((a, b) => a + b, 0);
      return Object.entries(githubProfile.languages).slice(0, 5).map(([langName, count]) => {
        const score = Math.round((count / total) * 100);
        const dots = Math.max(Math.round((score / 100) * 5), 1);
        return { name: langName, dots };
      });
    }
    return [
      { name: "JavaScript", dots: 5 },
      { name: "TypeScript", dots: 4 },
      { name: "React", dots: 4 },
      { name: "Node.js", dots: 3 },
    ];
  }, [githubProfile]);

  const tools = ["Git", "GitHub", "Postman", "VS Code", "TailwindCSS"];

  return (
    <div className="font-['Inter',sans-serif]">
      {/* Header */}
      <div className="px-10 pt-9 pb-6 border-b-2 border-gray-100">
        <div className="text-[28px] font-bold text-gray-900 tracking-tight mb-1">{name}</div>
        <div className="text-[14px] text-gray-500 mb-3">{title}</div>
        <div className="flex gap-5 flex-wrap">
          {[
            { text: email },
            { text: github },
            { text: location },
            { text: website }
          ].map((c, i) => (
            <div key={i} className="flex items-center gap-1.5 text-[12px] text-gray-500">
              <span className="text-gray-305">•</span> {c.text}
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-[1fr_175px] gap-8 px-10 py-7">
        {/* Left column */}
        <div>
          <div className="mb-5">
            <div className="text-[12px] font-bold text-gray-900 uppercase tracking-[0.12em] pl-2.5 border-l-[3px] border-gray-900 mb-3">
              Projects
            </div>
            {projects.map((p, i) => (
              <div key={i} className="mb-3.5">
                <div className="text-[13px] font-semibold text-gray-900 mb-0.5">{p.name}</div>
                <div className="text-[11px] text-gray-500 font-mono mb-1">{p.tech}</div>
                <div className="text-[12px] text-gray-500 leading-relaxed">{p.desc}</div>
              </div>
            ))}
          </div>
          <div>
            <div className="text-[12px] font-bold text-gray-900 uppercase tracking-[0.12em] pl-2.5 border-l-[3px] border-gray-900 mb-3">
              Education
            </div>
            <div className="text-[13px] font-semibold text-gray-900 mb-0.5">Computing Science College</div>
            <div className="text-[12px] text-gray-650 text-gray-600 font-medium mb-0.5">BSc (Hons) Computing</div>
            <div className="text-[11px] text-gray-400 font-mono">2023 – Present</div>
          </div>
        </div>

        {/* Right column */}
        <div>
          <div className="mb-5">
            <div className="text-[12px] font-bold text-gray-900 uppercase tracking-[0.12em] pl-2.5 border-l-[3px] border-gray-900 mb-3">
              Skills
            </div>
            {skills.map((s, i) => (
              <div key={i} className="flex justify-between items-center mb-2 text-[12px]">
                <span className="text-gray-700 font-medium truncate w-20">{s.name}</span>
                <div className="flex gap-[3px] shrink-0">
                  {[1, 2, 3, 4, 5].map((d) => (
                    <div key={d} className={`w-1.5 h-1.5 rounded-full ${d <= s.dots ? "bg-gray-900" : "bg-gray-200"}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="text-[12px] font-bold text-gray-900 uppercase tracking-[0.12em] pl-2.5 border-l-[3px] border-gray-900 mb-3">
              Tools
            </div>
            <div className="flex flex-wrap gap-1">
              {tools.map((t, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded border border-gray-200 font-medium">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}