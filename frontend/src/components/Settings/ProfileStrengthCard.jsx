import { Check } from "lucide-react";

const ProfileStrengthCard = ({
  strength,
  missingItems,
  accentColor,
  getAccentClass,
  navigateToMissing,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
          Profile Strength
        </h3>
        <span className={`text-sm font-bold ${getAccentClass("text")}`}>
          {strength}%
        </span>
      </div>

      {/* Progress Bar Container */}
      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ease-out rounded-full bg-gradient-to-r ${
            strength < 50
              ? "from-amber-500 to-orange-500"
              : strength < 90
              ? accentColor === "blue"
                ? "from-indigo-500 to-indigo-600"
                : accentColor === "purple"
                ? "from-purple-500 to-purple-600"
                : "from-emerald-500 to-emerald-600"
              : "from-emerald-500 to-teal-500"
          }`}
          style={{ width: `${strength}%` }}
        ></div>
      </div>

      {/* Missing Items List */}
      {missingItems.length > 0 ? (
        <div className="space-y-2.5">
          <p className="text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">
            Missing Fields:
          </p>
          <ul className="space-y-1.5">
            {missingItems.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400"
              >
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"></span>
                  {item.label}
                </span>
                <button
                  onClick={() => navigateToMissing(item)}
                  className={`text-[11px] font-semibold underline ${getAccentClass(
                    "text"
                  )} ${getAccentClass("textHover")}`}
                >
                  Add field
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 p-3 rounded-xl border border-emerald-500/10">
          <Check size={16} className="shrink-0" />
          <span>Your profile is fully complete! Excellent work.</span>
        </div>
      )}
    </div>
  );
};

export default ProfileStrengthCard;
