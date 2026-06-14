const TEMPLATES = [
  {
    id: 'professional',
    label: 'Professional',
    sub: 'Dark header · bars',
    thumb: 'bg-gradient-to-br from-slate-800 to-slate-900',
  },
  {
    id: 'modern',
    label: 'Modern',
    sub: 'Gradient · dots',
    thumb: 'bg-gradient-to-br from-indigo-500 to-purple-500',
  },
  {
    id: 'minimal',
    label: 'Minimal',
    sub: 'Clean · typographic',
    thumb: 'bg-white border border-gray-200',
  },
]

export default function ResumeThemeSelector({ activeTemplate, setActiveTemplate }) {
  return (
    <div className="bg-[#1E293B] border border-white/7 rounded-[20px] p-5">
      <div className="text-[13px] font-semibold text-slate-400 uppercase tracking-[0.08em] mb-4 flex items-center gap-1.5">
        <i className="ti ti-palette text-indigo-500 text-[16px]" /> Resume Template
      </div>

      <div className="flex flex-col gap-2">
        {TEMPLATES.map((tpl) => {
          const isActive = activeTemplate === tpl.id
          return (
            <button
              key={tpl.id}
              onClick={() => setActiveTemplate(tpl.id)}
              className={`flex items-center gap-3 w-full px-3.5 py-3 rounded-[10px] border text-left transition-all duration-200
                ${isActive
                  ? 'bg-indigo-500/12 border-indigo-500/35 text-indigo-300'
                  : 'bg-white/3 border-white/4 text-slate-400 hover:bg-white/6 hover:border-white/10 hover:text-slate-200'
                }`}
            >
              <div className={`w-9 h-7 rounded-[3px] flex-shrink-0 ${tpl.thumb}`} />
              <div className="flex-1">
                <div className="text-[13px] font-600">{tpl.label}</div>
                <div className="text-[11px] text-slate-500 font-mono">{tpl.sub}</div>
              </div>
              {isActive && <i className="ti ti-check text-indigo-400 text-[14px]" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}