import React from "react";

const AccountSettings = ({
  account,
  setAccount,
  handleAccountSubmit,
  getAccentClass,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm space-y-6 animate-fadeUp">
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
        <h2 className="text-xl font-bold text-slate-950 dark:text-white">
          Account Settings
        </h2>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
          Configure your fundamental account identifiers.
        </p>
      </div>

      <form onSubmit={handleAccountSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              First Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={account.firstName}
              onChange={(e) =>
                setAccount({ ...account, firstName: e.target.value })
              }
              className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 dark:bg-slate-850/30 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-sm outline-none transition-all ${getAccentClass(
                "borderFocus"
              )}`}
              placeholder="e.g. Manoj"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Last Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={account.lastName}
              onChange={(e) =>
                setAccount({ ...account, lastName: e.target.value })
              }
              className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 dark:bg-slate-850/30 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-sm outline-none transition-all ${getAccentClass(
                "borderFocus"
              )}`}
              placeholder="e.g. Katwal"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            value={account.email}
            onChange={(e) => setAccount({ ...account, email: e.target.value })}
            className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 dark:bg-slate-850/30 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-sm outline-none transition-all ${getAccentClass(
              "borderFocus"
            )}`}
            placeholder="e.g. email@example.com"
          />
        </div>

        <button
          type="submit"
          className={`px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 shadow-md ${getAccentClass(
            "bg"
          )} hover:-translate-y-0.5 ${getAccentClass("shadow")}`}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default AccountSettings;
