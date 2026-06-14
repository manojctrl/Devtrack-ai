const SKILLS = [
  { name: 'Java',    pct: 90 },
  { name: 'React',   pct: 80 },
  { name: 'MySQL',   pct: 80 },
  { name: 'Node.js', pct: 70 },
  { name: 'Express', pct: 60 },
]
const PROJECTS = [
  { name: 'DevTrack AI',             tech: 'React · Express · MySQL · GitHub API', desc: 'Developer analytics & personal branding platform with GitHub integration, skill tracking, and AI-powered career recommendations.' },
  { name: 'Travel Agency Dashboard', tech: 'React · Node.js · MongoDB',            desc: 'Full-stack travel booking web application with real-time availability and payment integration.' },
  { name: 'RojgarSetu',              tech: 'Java · Spring Boot · MySQL',           desc: 'Job portal connecting employers and job seekers with role-based authentication and resume upload.' },
]
const TAGS = ['Git', 'GitHub', 'REST API', 'Spring Boot', 'Tailwind', 'Postman']

export default function TemplateProfessional() {
  return (
    <div className="font-['Inter',sans-serif]">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 px-9 py-8 text-white">
        <div className="text-[26px] font-bold text-white tracking-tight mb-1">Manoj Katwal</div>
        <div className="text-[14px] text-slate-400 mb-4">Full Stack Developer</div>
        <div className="flex gap-5 flex-wrap">
          {[
            { icon: 'ti-mail',         text: 'manoj@example.com' },
            { icon: 'ti-brand-github', text: 'github.com/manojkatwal' },
            { icon: 'ti-map-pin',      text: 'Itahari, Nepal' },
            { icon: 'ti-world',        text: 'manojkatwal.dev' },
          ].map((c) => (
            <div key={c.text} className="flex items-center gap-1.5 text-[12px] text-slate-300">
              <i className={`ti ${c.icon} text-indigo-400 text-[13px]`} />
              {c.text}
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-[1fr_190px] gap-7 px-9 py-7">
        {/* Left */}
        <div>
          {/* Projects */}
          <div className="mb-5">
            <div className="text-[11px] font-bold text-indigo-600 uppercase tracking-[0.1em] border-b-2 border-indigo-600 pb-1 mb-3">
              Featured Projects
            </div>
            {PROJECTS.map((p, i) => (
              <div key={p.name} className={`mb-3 pb-3 ${i < PROJECTS.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <div className="text-[13px] font-semibold text-gray-800 mb-0.5">{p.name}</div>
                <div className="text-[11px] text-indigo-600 font-mono mb-1">{p.tech}</div>
                <div className="text-[12px] text-gray-500 leading-relaxed">{p.desc}</div>
              </div>
            ))}
          </div>

          {/* Education */}
          <div>
            <div className="text-[11px] font-bold text-indigo-600 uppercase tracking-[0.1em] border-b-2 border-indigo-600 pb-1 mb-3">
              Education
            </div>
            <div className="text-[13px] font-semibold text-gray-800 mb-0.5">Itahari International College</div>
            <div className="text-[12px] text-indigo-600 font-medium mb-0.5">BSc (Hons) Computing</div>
            <div className="text-[11px] text-gray-400 font-mono">2023 – Present · Itahari, Nepal</div>
          </div>
        </div>

        {/* Right */}
        <div>
          {/* Skills */}
          <div className="mb-5">
            <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.1em] border-b-2 border-indigo-600 pb-1 mb-3">
              Skills
            </div>
            {SKILLS.map((s) => (
              <div key={s.name} className="flex items-center gap-2 mb-2">
                <span className="text-[12px] text-gray-700 font-medium w-16">{s.name}</span>
                <div className="flex-1 h-[5px] bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                    style={{ width: `${s.pct}%` }}
                  />
                </div>
                <span className="text-[10px] text-gray-400 font-mono w-6 text-right">{s.pct}</span>
              </div>
            ))}
          </div>

          {/* Tech tags */}
          <div className="mb-5">
            <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.1em] border-b-2 border-indigo-600 pb-1 mb-3">
              Technologies
            </div>
            <div className="flex flex-wrap gap-1">
              {TAGS.map((t) => (
                <span key={t} className="text-[10px] px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded font-medium">{t}</span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.1em] border-b-2 border-indigo-600 pb-1 mb-3">
              Contact
            </div>
            {[
              { icon: 'ti-mail',         text: 'manoj@example.com' },
              { icon: 'ti-brand-github', text: 'manojkatwal' },
              { icon: 'ti-map-pin',      text: 'Itahari, Nepal' },
            ].map((c) => (
              <div key={c.text} className="flex items-center gap-1.5 text-[12px] text-gray-600 mb-2">
                <i className={`ti ${c.icon} text-indigo-500 text-[14px]`} />
                {c.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}