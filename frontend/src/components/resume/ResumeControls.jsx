import ResumeThemeSelector from './ResumeThemeSelector'
import ResumeDownload from './ResumeDownload'
import ProfileCompletion from './ProfileCompletion'
import ResumeReadiness from './ResumeReadiness'

function getRelativeTime(dateStr) {
  if (!dateStr) return "Never synced";
  const diffMs = new Date() - new Date(dateStr);
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHrs = Math.floor(diffMins / 60);
  if (diffHrs < 24) return `${diffHrs}h ago`;
  const diffDays = Math.floor(diffHrs / 24);
  return `${diffDays}d ago`;
}

export default function ResumeControls({ 
  activeTemplate, 
  setActiveTemplate,
  onDownloadPdf,
  onSharePublicLink,
  onFullPreview,
  onCopyShareUrl,
  onGenerateSummary,
  user,
  repos,
  githubProfile
}) {
  const lastSynced = getRelativeTime(githubProfile?.lastSyncedAt);

  return (
    <div className="flex flex-col gap-4 sticky top-[88px]">
      <ResumeThemeSelector activeTemplate={activeTemplate} setActiveTemplate={setActiveTemplate} />
      <ResumeDownload 
        onDownloadPdf={onDownloadPdf}
        onSharePublicLink={onSharePublicLink}
        onFullPreview={onFullPreview}
        onCopyShareUrl={onCopyShareUrl}
      />
      <ResumeReadiness 
        user={user}
        repos={repos}
        githubProfile={githubProfile}
      />
      <ProfileCompletion 
        user={user}
        repos={repos}
        githubProfile={githubProfile}
      />

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
        <button 
          onClick={onGenerateSummary}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-[10px] bg-white/4 border border-white/7 text-slate-300 text-[12px] font-medium hover:bg-white/7 cursor-pointer transition-all"
        >
          <i className="ti ti-wand" /> Auto-generate Summary
        </button>
      </div>

      {/* Sync note */}
      <p className="text-center text-[11px] text-slate-600 font-mono py-1">
        <i className="ti ti-refresh text-[12px]" /> Last synced from GitHub · {lastSynced}
      </p>
    </div>
  )
}