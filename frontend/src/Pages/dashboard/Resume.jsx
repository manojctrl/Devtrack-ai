import { useState, useEffect } from "react";
import Navbar from "../../components/dashboard/Navbar";
import Sidebar from "../../components/dashboard/sidebar";
import ResumePreview from "../../components/resume/ResumePreview";
import ResumeControls from "../../components/resume/ResumeControls";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { Copy, Check, X } from "lucide-react";

const Resume = () => {
  const { user } = useAuth();
  const [activeTemplate, setActiveTemplate] = useState("professional");
  const [githubData, setGithubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null); // { type: "success"|"info"|"error", title, message, code? }

  useEffect(() => {
    const fetchResumeData = async () => {
      setLoading(true);
      try {
        const res = await API.get("/github/data");
        setGithubData(res.data);
      } catch (err) {
        console.warn("No GitHub data found for resume builder:", err);
        setGithubData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchResumeData();
  }, [user?.githubUsername]);

  const showToast = (type, title, message, code = null) => {
    setToast({ type, title, message, code });
    if (!code) {
      setTimeout(() => setToast(null), 5000);
    }
  };

  const shareUrl = `${window.location.origin}/developer/${
    user?.githubUsername || user?.username || ""
  }`;

  const handleDownloadPdf = () => {
    window.print();
  };

  const handleSharePublicLink = () => {
    window.open(shareUrl, "_blank");
  };

  const handleFullPreview = () => {
    window.open(shareUrl, "_blank");
  };

  const handleCopyShareUrl = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() =>
        showToast("success", "Link Copied!", `Your public portfolio URL has been copied to clipboard.`)
      )
      .catch(() =>
        showToast("error", "Copy Failed", "Could not copy to clipboard. Please copy manually:", shareUrl)
      );
  };

  const handleGenerateSummary = () => {
    const profile = githubData?.profile;
    const primaryLanguages = profile?.languages
      ? Object.keys(profile.languages).slice(0, 3).join(", ")
      : "React, Node.js, Python";
    const summary = `Results-driven Software Developer specializing in ${primaryLanguages}. Experienced in building high-performance web applications, managing database systems, and automating workflows. Passionate about writing clean, maintainable code to solve complex engineering challenges.`;
    showToast("info", "✨ AI-Generated Summary", "Copy this to your Bio in Settings:", summary);
  };

  const toastColors = {
    success: "bg-emerald-600/95 border-emerald-500/40",
    info: "bg-indigo-900/95 border-indigo-500/40",
    error: "bg-rose-900/95 border-rose-500/40",
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111625] flex text-slate-800 dark:text-gray-100 font-sans transition-colors duration-300">
      {/* Print CSS */}
      <style>{`
        @media print {
          aside,
          header,
          .print\\:hidden,
          button {
            display: none !important;
          }
          .pl-64 {
            padding-left: 0 !important;
          }
          main {
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
          }
          body {
            background: white !important;
            color: black !important;
          }
          #printable-resume {
            box-shadow: none !important;
            border: none !important;
            max-width: 100% !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }
        }
      `}</style>

      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 max-w-sm w-full rounded-2xl border p-4 shadow-2xl backdrop-blur-sm ${toastColors[toast.type]} transition-all duration-300`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white mb-1">{toast.title}</p>
              <p className="text-xs text-white/80 leading-relaxed">
                {toast.message}
              </p>
              {toast.code && (
                <div className="mt-3 relative">
                  <pre className="bg-black/30 rounded-lg p-3 text-[11px] font-mono text-white/90 whitespace-pre-wrap break-all leading-relaxed border border-white/10">
                    {toast.code}
                  </pre>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(toast.code);
                      showToast("success", "Copied!", "Text copied to clipboard.");
                    }}
                    className="mt-2 flex items-center gap-1.5 text-[11px] text-white/70 hover:text-white transition-colors cursor-pointer"
                  >
                    <Copy size={11} /> Copy to clipboard
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={() => setToast(null)}
              className="text-white/60 hover:text-white transition-colors cursor-pointer flex-shrink-0 mt-0.5"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      )}

      <Sidebar />
      <div className="flex-1 pl-64 print:pl-0">
        <Navbar />
        <main className="p-8 pt-24 max-w-7xl mx-auto print:p-0 print:max-w-none">
          <div className="mb-6 print:hidden">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Resume Builder
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Generate and export your professional developer resume.
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
              <p className="text-xs text-slate-500 font-mono">
                Loading resume builder...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-[1fr_300px] gap-6 items-start print:block print:w-full">
              <ResumePreview
                activeTemplate={activeTemplate}
                user={user}
                githubProfile={githubData?.profile}
                repos={githubData?.repos}
                onDownloadPdf={handleDownloadPdf}
              />
              <div className="print:hidden">
                <ResumeControls
                  activeTemplate={activeTemplate}
                  setActiveTemplate={setActiveTemplate}
                  onDownloadPdf={handleDownloadPdf}
                  onSharePublicLink={handleSharePublicLink}
                  onFullPreview={handleFullPreview}
                  onCopyShareUrl={handleCopyShareUrl}
                  onGenerateSummary={handleGenerateSummary}
                  user={user}
                  repos={githubData?.repos}
                  githubProfile={githubData?.profile}
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Resume;