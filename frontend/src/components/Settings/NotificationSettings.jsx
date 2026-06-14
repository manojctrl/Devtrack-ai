import React from "react";

const NotificationSettings = ({
  notifications,
  setNotifications,
  getAccentClass,
  triggerToast,
}) => {
  const notificationItems = [
    {
      key: "weeklyReport",
      title: "Weekly Skill Report",
      desc: "Get insights on skill progress, recommendations, and AI analytics in your inbox weekly.",
    },
    {
      key: "githubSummary",
      title: "GitHub Activity Summary",
      desc: "Receive summaries regarding project metrics, active commits, and repository impact stats.",
    },
    {
      key: "careerRecs",
      title: "Career Recommendations",
      desc: "Receive customized alerts on matched vacancies and career levels aligned with your resume.",
    },
    {
      key: "resumeUpdates",
      title: "Resume Updates",
      desc: "Be notified when the DevTrack AI model makes optimizations or corrections on your resume.",
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm space-y-6 animate-fadeUp">
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
        <h2 className="text-xl font-bold text-slate-950 dark:text-white">
          Notifications
        </h2>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
          Configure your communication channels and periodic reporting options.
        </p>
      </div>

      {/* Switch button list */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {notificationItems.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between py-4.5 first:pt-0 last:pb-0"
          >
            <div className="space-y-0.5 max-w-xl pr-4">
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {item.title}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                {item.desc}
              </p>
            </div>

            {/* Switch Buttons */}
            <button
              onClick={() => {
                const nextVal = !notifications[item.key];
                setNotifications({
                  ...notifications,
                  [item.key]: nextVal,
                });
                triggerToast(
                  `${item.title} ${nextVal ? "Enabled" : "Disabled"}.`
                );
              }}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                notifications[item.key]
                  ? getAccentClass("bg").split(" ")[0]
                  : "bg-slate-200 dark:bg-slate-800"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  notifications[item.key] ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationSettings;
