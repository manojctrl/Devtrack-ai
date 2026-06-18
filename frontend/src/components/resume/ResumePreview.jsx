import TemplateProfessional from "./TemplateProfessional";
import TemplateModern from "./TemplateModern";
import TemplateMinimal from "./TemplateMinimal";

export default function ResumePreview({ activeTemplate, user, githubProfile, repos }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#1E293B] border border-white/7 rounded-[20px] p-6 print:p-0 print:border-none print:bg-white print:text-black">
      {/* Header (hide during printing) */}
      <div className="flex justify-between items-center mb-5 print:hidden">
        <div className="flex items-center gap-2 text-[15px] font-semibold text-slate-100">
          <span className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium font-mono">
            Live Resume
          </span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 rounded-[10px] text-[12px] font-medium bg-white/5 border border-white/10 text-slate-350 hover:bg-white/10 transition-all cursor-pointer"
          >
            Print
          </button>
          <button 
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 rounded-[10px] text-[12px] font-semibold bg-gradient-to-r from-indigo-500 to-violet-600 text-white border-0 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30 transition-all cursor-pointer"
          >
            Download PDF
          </button>
        </div>
      </div>

      {/* Paper wrapper */}
      <div className="flex justify-center bg-black/30 print:bg-white rounded-[16px] print:rounded-none p-6 print:p-0 border border-white/4 print:border-none">
        <div 
          id="printable-resume"
          className="w-full max-w-[680px] bg-white rounded shadow-2xl print:shadow-none overflow-hidden font-['Inter',sans-serif] transition-all duration-300"
        >
          {activeTemplate === "professional" && (
            <TemplateProfessional user={user} githubProfile={githubProfile} repos={repos} />
          )}
          {activeTemplate === "modern" && (
            <TemplateModern user={user} githubProfile={githubProfile} repos={repos} />
          )}
          {activeTemplate === "minimal" && (
            <TemplateMinimal user={user} githubProfile={githubProfile} repos={repos} />
          )}
        </div>
      </div>
    </div>
  );
}