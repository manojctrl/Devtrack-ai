const STATS = [
  { label: "Skills Added",  value: "10", color: "text-indigo-400" },
  { label: "Projects",      value: "3",  color: "text-emerald-400" },
  { label: "GitHub Linked", value: "✓",  color: "text-emerald-400" },
  { label: "Education",     value: "✓",  color: "text-emerald-400" },
];

export default function ResumeReadiness() {
  return (
    <div className="bg-[#1E293B] border border-white/7 rounded-[20px] p-5">
      <div className="text-[13px] font-semibold text-slate-400 uppercase tracking-[0.08em] mb-4 flex items-center gap-1.5">
        <i className="ti ti-rosette-discount-check text-indigo-500 text-[16px]" />
        Resume Readiness
      </div>

      {/* Score ring */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-16 h-16 flex-shrink-0">
          <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
            <defs>
              <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
            </defs>
            <circle
              cx="32" cy="32" r="26"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="5"
            />
            <circle
              cx="32" cy="32" r="26"
              fill="none"
              stroke="url(#rg)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="163"
              strokeDashoffset="36"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-[15px] font-bold text-indigo-400">
            78%
          </div>
        </div>
        <div>
          <div className="text-[14px] font-semibold text-slate-200 mb-1">
            Almost there!
          </div>
          <div className="text-[12px] text-slate-400 leading-relaxed">
            Add LinkedIn & Experience to hit 100%
          </div>
        </div>
      </div>

      {/* Mini stats grid */}
      <div className="grid grid-cols-2 gap-2">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="bg-white/2 border border-white/4 rounded-[10px] p-2.5 text-center"
          >
            <div className={`text-[16px] font-bold font-mono mb-0.5 ${s.color}`}>
              {s.value}
            </div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wide">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}