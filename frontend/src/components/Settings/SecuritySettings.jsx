import { Lock } from "lucide-react";

const SecuritySettings = ({
  security,
  setSecurity,
  handleSecuritySubmit,
  twoFactor,
  getAccentClass,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm space-y-8 animate-fadeUp">
      {/* Password Modification Card */}
      <div className="space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">
            Security & Password
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
            Ensure your account security by updating your password.
          </p>
        </div>

        <form onSubmit={handleSecuritySubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Lock size={13} /> Current Password
            </label>
            <input
              type="password"
              value={security.currentPassword}
              onChange={(e) =>
                setSecurity({ ...security, currentPassword: e.target.value })
              }
              className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 dark:bg-slate-850/30 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-sm outline-none transition-all ${getAccentClass(
                "borderFocus"
              )}`}
              placeholder="••••••••"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                New Password
              </label>
              <input
                type="password"
                value={security.newPassword}
                onChange={(e) =>
                  setSecurity({ ...security, newPassword: e.target.value })
                }
                className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 dark:bg-slate-850/30 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-sm outline-none transition-all ${getAccentClass(
                  "borderFocus"
                )}`}
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Confirm New Password
              </label>
              <input
                type="password"
                value={security.confirmPassword}
                onChange={(e) =>
                  setSecurity({ ...security, confirmPassword: e.target.value })
                }
                className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 dark:bg-slate-850/30 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-sm outline-none transition-all ${getAccentClass(
                  "borderFocus"
                )}`}
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className={`px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 shadow-md ${getAccentClass(
              "bg"
          )} hover:-translate-y-0.5 ${getAccentClass("shadow")}`}
          >
            Change Password
          </button>
        </form>
      </div>

      {/* Two Factor Authentication Card */}
      <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-950 dark:text-white">
                Two-Factor Authentication (2FA)
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase tracking-wide">
                Coming Soon
              </span>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-xl">
              Adds an extra layer of protection to your DevTrack AI account by
              requiring an authenticator code.
            </p>
          </div>

          {/* 2FA Toggle Options */}
          <div className="flex items-center gap-5">
            <label className="flex items-center gap-2 cursor-not-allowed opacity-60">
              <input
                type="radio"
                name="twoFactor"
                checked={!twoFactor}
                disabled
                className={`w-4 h-4 accent-indigo-500`}
              />
              <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                Disabled
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-not-allowed opacity-60">
              <input
                type="radio"
                name="twoFactor"
                checked={twoFactor}
                disabled
                className={`w-4 h-4 accent-indigo-500`}
              />
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                Enabled
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
