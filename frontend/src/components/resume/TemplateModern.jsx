import { useMemo } from "react";

export default function TemplateModern({ user, githubProfile, repos }) {
  const name = user ? `${user.firstName} ${user.lastName}` : "Developer Name";
  const initials = user ? `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() : "DV";
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
      { name: "DevTrack AI", tech: "React · Express · MySQL", desc: "Developer analytics platform with GitHub integration and AI career recommendations." },
      { name: "Portfolio Website", tech: "React · TailwindCSS", desc: "Personal portfolio website detailing coding achievements." },
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
      { name: "Express", dots: 3 },
    ];
  }, [githubProfile]);

  const tools = ["Git", "GitHub", "VS Code", "Postman", "TailwindCSS"];

  return (
    <div className="font-['Inter',sans-serif]">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-9 py-8 flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-white/25 border-[3px] border-white/50 flex items-center justify-center text-[22px] font-bold text-white flex-shrink-0">
          {initials}
        </div>
        <div>
          <div className="text-[24px] font-bold text-white tracking-tight mb-0.5">{name}</div>
          <div className="text-[13px] text-white/80 mb-3">{title} · {location}</div>
          <div className="flex gap-2 flex-wrap">
            {[
              { text: email },
              { text: github },
              { text: website },
            ].map((c, i) => (
              <div key={i} className="flex items-center gap-1 text-[11px] text-white/85 bg-white/15 px-2.5 py-0.5 rounded-full">
                {c.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-[1fr_190px] gap-6 px-9 py-7">
        {/* Left column */}
        <div>
          <div className="mb-5">
            <div className="text-[11px] font-bold text-violet-600 uppercase tracking-[0.1em] flex items-center gap-1.5 mb-3 after:flex-1 after:h-px after:bg-gradient-to-r after:from-violet-200 after:to-transparent">
              Featured Projects
            </div>
            {projects.map((p, i) => (
              <div key={i} className="bg-violet-50 rounded-lg p-3 mb-2.5">
                <div className="text-[13px] font-semibold text-gray-800 mb-0.5">{p.name}</div>
                <div className="text-[11px] text-violet-600 font-mono mb-1">{p.tech}</div>
                <div className="text-[12px] text-gray-500 leading-relaxed">{p.desc}</div>
              </div>
            ))}
          </div>
          <div>
            <div className="text-[11px] font-bold text-violet-600 uppercase tracking-[0.1em] mb-3">Education</div>
            <div className="text-[13px] font-semibold text-gray-800 mb-0.5">Computing & IT College</div>
            <div className="text-[12px] text-violet-600 font-medium mb-0.5">BSc (Hons) Computing</div>
            <div className="text-[11px] text-gray-400 font-mono">2023 – Present</div>
          </div>
        </div>

        {/* Right column */}
        <div>
          <div className="mb-5">
            <div className="text-[11px] font-bold text-violet-600 uppercase tracking-[0.1em] mb-3">Skills</div>
            {skills.map((s, i) => (
              <div key={i} className="flex items-center justify-between mb-2.5">
                <span className="text-[12px] text-gray-700 font-medium truncate w-24">{s.name}</span>
                <div className="flex gap-0.5 shrink-0">
                  {[1, 2, 3, 4, 5].map((d) => (
                    <div key={d} className={`w-2 h-2 rounded-full ${d <= s.dots ? "bg-violet-500" : "bg-gray-200"}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="text-[11px] font-bold text-violet-600 uppercase tracking-[0.1em] mb-2.5">Tools</div>
            <div className="flex flex-wrap gap-1">
              {tools.map((t, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 bg-violet-100 text-violet-700 rounded-full font-medium">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}