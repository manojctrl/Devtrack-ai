import TemplateProfessional from './TemplateProfessional'
import TemplateModern from './TemplateModern'
import TemplateMinimal from './TemplateMinimal'

export default function ResumePreview({ activeTemplate }) {
  return (
    <div className="bg-[#1E293B] border border-white/7 rounded-[20px] p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2 text-[15px] font-semibold text-slate-100">
          <i className="ti ti-file-description text-indigo-500" />
          Resume Preview
          <span className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium font-mono">
            Live
          </span>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-[10px] text-[12px] font-medium bg-white/4 border border-white/7 text-slate-300 hover:bg-white/7 transition-all">
            <i className="ti ti-printer" /> Print
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-[10px] text-[12px] font-medium bg-white/4 border border-white/7 text-slate-300 hover:bg-white/7 transition-all">
            <i className="ti ti-share" /> Share
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-[10px] text-[12px] font-semibold bg-gradient-to-r from-indigo-500 to-violet-600 text-white border-0 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30 transition-all">
            <i className="ti ti-download" /> Download PDF
          </button>
        </div>
      </div>

      {/* Paper wrapper */}
      <div className="flex justify-center bg-black/30 rounded-[16px] p-6 border border-white/4">
        <div className="w-full max-w-[680px] bg-white rounded shadow-2xl overflow-hidden font-['Inter',sans-serif] transition-all duration-300">
          {activeTemplate === 'professional' && <TemplateProfessional />}
          {activeTemplate === 'modern'       && <TemplateModern />}
          {activeTemplate === 'minimal'      && <TemplateMinimal />}
        </div>
      </div>
    </div>
  )
}