const SKILLS = [
  { name: 'Java',    dots: 4 },
  { name: 'React',   dots: 4 },
  { name: 'MySQL',   dots: 4 },
  { name: 'Node.js', dots: 3 },
  { name: 'Express', dots: 3 },
]
const PROJECTS = [
  { name: 'DevTrack AI',             tech: 'React · Express · MySQL', desc: 'Developer analytics platform with GitHub integration and AI career recommendations.' },
  { name: 'Travel Agency Dashboard', tech: 'React · Node.js',        desc: 'Full-stack travel booking app with real-time availability tracking.' },
  { name: 'RojgarSetu',              tech: 'Java · Spring Boot',     desc: 'Job portal with role-based access and resume management system.' },
]

export default function TemplateModern() {
  return (
    <div className="font-['Inter',sans-serif]">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-9 py-8 flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-white/25 border-[3px] border-white/50 flex items-center justify-center text-[22px] font-bold text-white flex-shrink-0">
          MK
        </div>
        <div>
          <div className="text-[24px] font-bold text-white tracking-tight mb-0.5">Manoj Katwal</div>
          <div className="text-[13px] text-white/80 mb-3">Full Stack Developer · Itahari, Nepal</div>
          <div className="flex gap-2 flex-wrap">
            {[
              { icon: 'ti-mail',         text: 'manoj@example.com' },
              { icon: 'ti-brand-github', text: 'manojkatwal' },
              { icon: 'ti-world',        text: 'manojkatwal.dev' },
            ].map((c) => (
              <div key={c.text} className="flex items-center gap-1 text-[11px] text-white/85 bg-white/15 px-2.5 py-0.5 rounded-full">
                <i className={`ti ${c.icon} text-[11px]`} /> {c.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-[1fr_190px] gap-6 px-9 py-7">
        {/* Left */}
        <div>
          <div className="mb-5">
            <div className="text-[11px] font-bold text-violet-600 uppercase tracking-[0.1em] flex items-center gap-1.5 mb-3 after:flex-1 after:h-px after:bg-gradient-to-r after:from-violet-200 after:to-transparent">
              Featured Projects
            </div>
            {PROJECTS.map((p) => (
              <div key={p.name} className="bg-violet-50 rounded-lg p-3 mb-2.5">
                <div className="text-[13px] font-semibold text-gray-800 mb-0.5">{p.name}</div>
                <div className="text-[11px] text-violet-600 font-mono mb-1">{p.tech}</div>
                <div className="text-[12px] text-gray-500 leading-relaxed">{p.desc}</div>
              </div>
            ))}
          </div>
          <div>
            <div className="text-[11px] font-bold text-violet-600 uppercase tracking-[0.1em] mb-3">Education</div>
            <div className="text-[13px] font-semibold text-gray-800 mb-0.5">Itahari International College</div>
            <div className="text-[12px] text-violet-600 font-medium mb-0.5">BSc (Hons) Computing</div>
            <div className="text-[11px] text-gray-400 font-mono">2023 – Present</div>
          </div>
        </div>

        {/* Right */}
        <div>
          <div className="mb-5">
            <div className="text-[11px] font-bold text-violet-600 uppercase tracking-[0.1em] mb-3">Skills</div>
            {SKILLS.map((s) => (
              <div key={s.name} className="flex items-center justify-between mb-2.5">
                <span className="text-[12px] text-gray-700 font-medium">{s.name}</span>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((d) => (
                    <div key={d} className={`w-2 h-2 rounded-full ${d <= s.dots ? 'bg-violet-500' : 'bg-gray-200'}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="text-[11px] font-bold text-violet-600 uppercase tracking-[0.1em] mb-2.5">Tools</div>
            <div className="flex flex-wrap gap-1">
              {['Git','GitHub','VS Code','Postman','Tailwind'].map((t) => (
                <span key={t} className="text-[10px] px-2 py-0.5 bg-violet-100 text-violet-700 rounded-full font-medium">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}