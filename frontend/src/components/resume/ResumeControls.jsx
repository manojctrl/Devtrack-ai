import ResumeThemeSelector from './ResumeThemeSelector'
import ResumeDownload from './ResumeDownload'
import ProfileCompletion from './ProfileCompletion'
import ResumeReadiness from './ResumeReadiness'

export default function ResumeControls({ activeTemplate, setActiveTemplate }) {
  return (
    <div className="flex flex-col gap-4 sticky top-[88px]">
      <ResumeThemeSelector activeTemplate={activeTemplate} setActiveTemplate={setActiveTemplate} />
      <ResumeDownload />
      <ResumeReadiness />
      <ProfileCompletion />

      {/* AI Tip */}
      <div className="bg-[#1E293B] border border-white/7 rounded-[20px] p-5">
        <div className="text-[13px] font-semibold text-slate-400 uppercase tracking-[0.08em] mb-3 flex items-center gap-1.5">
          <i className="ti ti-robot text-indigo-500 text-[16px]" /> AI Tip
        </div>
        <div className="flex gap-2.5 p-3 rounded-[10px] bg-purple-500/8 border border-purple-500/20 mb-3">
          <i className="ti ti-bulb text-purple-400 text-[17px] mt-0.5 flex-shrink-0" />
          <p className="text-[12px] text-purple-200 leading-relaxed">
            Add a 2-line summary at the top. Recruiters spend only 6 seconds on first scan — a strong headline increases callback rate by 40%.
          </p>
        </div>
        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-[10px] bg-white/4 border border-white/7 text-slate-300 text-[12px] font-medium hover:bg-white/7 transition-all">
          <i className="ti ti-wand" /> Auto-generate Summary
        </button>
      </div>

      {/* Sync note */}
      <p className="text-center text-[11px] text-slate-600 font-mono py-1">
        <i className="ti ti-refresh text-[12px]" /> Last synced from GitHub · 2h ago
      </p>
    </div>
  )
}