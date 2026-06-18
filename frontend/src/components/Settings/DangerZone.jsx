import { AlertTriangle, X } from "lucide-react";

const DangerZone = ({
  showDeleteModal,
  setShowDeleteModal,
  handleDeleteAccount,
}) => {
  return (
    <>
      <div className="bg-rose-50 dark:bg-rose-950/10 border border-rose-200 dark:border-rose-900/30 rounded-2xl p-6 md:p-8 shadow-sm space-y-6 animate-fadeUp">
        <div className="border-b border-rose-100 dark:border-rose-950/30 pb-4">
          <h2 className="text-xl font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2">
            <AlertTriangle size={20} /> Danger Zone
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Critical actions. Be careful; these settings cannot be undone.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Delete Account
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
              Permanently delete your DevTrack AI account and clear all
              associated GitHub profiles, skill analytics, resumes, and data
              from our databases.
            </p>
          </div>

          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-6 py-3 rounded-xl text-sm font-semibold bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600 text-white transition-all shadow-md shadow-rose-600/10 shrink-0 hover:-translate-y-0.5"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Delete Account Modal Confirmation */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-scaleUp">
            <div className="flex items-start justify-between">
              <div className="p-3 bg-rose-50 dark:bg-rose-950/20 text-rose-500 rounded-full">
                <AlertTriangle size={22} />
              </div>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Delete Account?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Are you absolutely sure you want to delete your account? This
                action cannot be undone and you will lose all metrics,
                achievements, and resumes.
              </p>
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4.5 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4.5 py-2.5 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white transition-all shadow-md"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DangerZone;
