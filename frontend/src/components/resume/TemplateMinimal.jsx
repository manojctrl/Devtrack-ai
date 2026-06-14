const SKILLS = [
  { name: 'Java',    dots: 4 },
  { name: 'React',   dots: 4 },
  { name: 'MySQL',   dots: 4 },
  { name: 'Node.js', dots: 3 },
]
const PROJECTS = [
  { name: 'DevTrack AI',    tech: 'React · Express · MySQL · GitHub API', desc: 'Developer analytics and personal branding platform with GitHub integration.' },
  { name: 'Travel Agency',  tech: 'React · Node.js · MongoDB',            desc: 'Full-stack travel booking application with real-time availability.' },
  { name: 'RojgarSetu',     tech: 'Java · Spring Boot · MySQL',           desc: 'Job portal with role-based authentication and resume management.' },
]

export default function TemplateMinimal() {
  return (
    <div className="font-['Inter',sans-serif]">
      {/* Header */}
      <div className="px-10 pt-9 pb-6 border-b-2 border-gray-100">
        <div className="text-[28px] font-bold text-gray-900 tracking-tight mb-1">Manoj Katwal</div>
        <div className="text-[14px] text-gray-500 mb-3">Full Stack Developer</div>
        <div className="flex gap-5 flex-wrap">
          {[
            { icon: 'ti-mail',         text: 'manoj@example.com' },
            { icon: 'ti-brand-github', text: 'manojkatwal' },
            { icon: 'ti-map-pin',      text: 'Itahari, Nepal' },
          ].map((c) => (
            <div key={c.text} className="flex items-center gap-1.5 text-[12px] text-gray-500">
              <i className={`ti ${c.icon} text-[12px] text-gray-400`} /> {c.text}
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-[1fr_175px] gap-8 px-10 py-7">
        {/* Left */}
        <div>
          <div className="mb-5">
            <div className="text-[12px] font-bold text-gray-900 uppercase tracking-[0.12em] pl-2.5 border-l-[3px] border-gray-900 mb-3">
              Projects
            </div>
            {PROJECTS.map((p) => (
              <div key={p.name} className="mb-3.5">
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
            <div className="text-[13px] font-semibold text-gray-900 mb-0.5">Itahari International College</div>
            <div className="text-[12px] text-gray-600 font-medium mb-0.5">BSc (Hons) Computing</div>
            <div className="text-[11px] text-gray-400 font-mono">2023 – Present</div>
          </div>
        </div>

        {/* Right */}
        <div>
          <div className="mb-5">
            <div className="text-[12px] font-bold text-gray-900 uppercase tracking-[0.12em] pl-2.5 border-l-[3px] border-gray-900 mb-3">
              Skills
            </div>
            {SKILLS.map((s) => (
              <div key={s.name} className="flex justify-between items-center mb-2 text-[12px]">
                <span className="text-gray-700 font-medium">{s.name}</span>
                <div className="flex gap-[3px]">
                  {[1,2,3,4,5].map((d) => (
                    <div key={d} className={`w-1.5 h-1.5 rounded-full ${d <= s.dots ? 'bg-gray-900' : 'bg-gray-200'}`} />
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
              {['Git','GitHub','Postman','VS Code','Tailwind'].map((t) => (
                <span key={t} className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded border border-gray-200 font-medium">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}