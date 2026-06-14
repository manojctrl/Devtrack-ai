const ACTIONS = [
  { icon: 'ti-file-type-pdf', label: 'Download PDF',     style: 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white border-transparent hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30' },
  { icon: 'ti-share',         label: 'Share Public Link', style: 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/18 hover:-translate-y-0.5' },
  { icon: 'ti-eye',           label: 'Full Preview',      style: 'bg-white/4 border-white/7 text-slate-300 hover:bg-white/7 hover:text-slate-100' },
  { icon: 'ti-copy',          label: 'Copy Share URL',    style: 'bg-white/4 border-white/7 text-slate-300 hover:bg-white/7 hover:text-slate-100' },
]

export default function ResumeDownload() {
  return (
    <div className="bg-[#1E293B] border border-white/7 rounded-[20px] p-5">
      <div className="text-[13px] font-semibold text-slate-400 uppercase tracking-[0.08em] mb-4 flex items-center gap-1.5">
        <i className="ti ti-download text-indigo-500 text-[16px]" /> Export Resume
      </div>
      <div className="flex flex-col gap-2">
        {ACTIONS.map((a) => (
          <button
            key={a.label}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-[10px] text-[13px] font-semibold border transition-all duration-200 ${a.style}`}
          >
            <i className={`ti ${a.icon}`} />
            {a.label}
          </button>
        ))}
      </div>
    </div>
  )
}