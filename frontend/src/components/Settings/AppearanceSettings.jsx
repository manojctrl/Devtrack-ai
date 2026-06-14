import React from "react";
import { Moon, Sun, Check } from "lucide-react";

const AppearanceSettings = ({
  theme,
  setTheme,
  accentColor,
  setAccentColor,
  getAccentClass,
  triggerToast,
}) => {
  const accentOptions = [
    {
      id: "blue",
      label: "Blue Accent",
      colorClass: "bg-indigo-500",
      borderClass: "border-indigo-500",
    },
    {
      id: "purple",
      label: "Purple Accent",
      colorClass: "bg-purple-500",
      borderClass: "border-purple-500",
    },
    {
      id: "green",
      label: "Green Accent",
      colorClass: "bg-emerald-500",
      borderClass: "border-emerald-500",
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm space-y-8 animate-fadeUp">
      {/* Theme Section */}
      <div className="space-y-5">
        <div>
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">
            Theme
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
            Set your visual interface palette. Dark mode looks extremely cool
            and reduces eye strain.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Dark Theme Select Card */}
          <button
            onClick={() => {
              setTheme("dark");
              triggerToast("Dark Theme enabled.");
            }}
            className={`flex items-start gap-4 p-5 rounded-2xl border text-left transition-all ${
              theme === "dark"
                ? `${getAccentClass("border")} bg-slate-50/10 dark:bg-slate-800/20`
                : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-transparent"
            }`}
          >
            <div
              className={`p-3 rounded-xl ${
                theme === "dark"
                  ? getAccentClass("bgLight")
                  : "bg-slate-100 dark:bg-slate-800"
              }`}
            >
              <Moon
                size={20}
                className={theme === "dark" ? getAccentClass("text") : "text-slate-400"}
              />
            </div>
            <div>
              <p className="font-bold text-sm text-slate-800 dark:text-slate-200">
                Dark Mode
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Elegant, sleek, low-contrast interface.
              </p>
              {theme === "dark" && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getAccentClass(
                    "bgLight"
                  )} mt-2.5 inline-block`}
                >
                  Active Theme
                </span>
              )}
            </div>
          </button>

          {/* Light Theme Select Card */}
          <button
            onClick={() => {
              setTheme("light");
              triggerToast("Light Theme enabled.");
            }}
            className={`flex items-start gap-4 p-5 rounded-2xl border text-left transition-all ${
              theme === "light"
                ? `${getAccentClass("border")} bg-slate-50`
                : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-transparent"
            }`}
          >
            <div
              className={`p-3 rounded-xl ${
                theme === "light"
                  ? getAccentClass("bgLight")
                  : "bg-slate-100 dark:bg-slate-800"
              }`}
            >
              <Sun
                size={20}
                className={theme === "light" ? getAccentClass("text") : "text-slate-400"}
              />
            </div>
            <div>
              <p className="font-bold text-sm text-slate-800 dark:text-slate-200">
                Light Mode
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Clean, bright high-contrast dashboard layout.
              </p>
              {theme === "light" && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getAccentClass(
                    "bgLight"
                  )} mt-2.5 inline-block`}
                >
                  Active Theme
                </span>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Accent Color Section */}
      <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-5">
        <div>
          <h2 className="text-base font-bold text-slate-950 dark:text-white">
            Accent Color
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
            Customize highlight highlights, buttons, and active indicators.
          </p>
        </div>

        <div className="flex gap-4">
          {accentOptions.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setAccentColor(item.id);
                triggerToast(`Accent color changed to ${item.id}.`);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all hover:scale-[1.02] ${
                accentColor === item.id
                  ? `${item.borderClass} ${
                      theme === "dark" ? "bg-slate-800/40" : "bg-slate-50"
                    }`
                  : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-transparent"
              }`}
            >
              <span
                className={`w-3.5 h-3.5 rounded-full ${item.colorClass} flex items-center justify-center shrink-0`}
              >
                {accentColor === item.id && (
                  <Check size={10} className="text-white" />
                )}
              </span>
              <span className="text-slate-700 dark:text-slate-300 text-xs font-semibold">
                {item.id.charAt(0).toUpperCase() + item.id.slice(1)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;
