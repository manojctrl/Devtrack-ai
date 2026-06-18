import { User, Shield, Palette, Bell, AlertTriangle } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const SettingsNavigation = ({ activeTab, setActiveTab, getAccentClass }) => {
  const tabs = [
    { id: "account", label: "Account Settings", icon: <User size={18} /> },
    { id: "profile", label: "Profile Settings", icon: <FaGithub size={17} /> },
    { id: "security", label: "Security & 2FA", icon: <Shield size={18} /> },
    { id: "appearance", label: "Appearance", icon: <Palette size={18} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
    {
      id: "danger",
      label: "Danger Zone",
      icon: <AlertTriangle size={18} />,
      danger: true,
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
            activeTab === tab.id
              ? tab.danger
                ? "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                : `${getAccentClass("bgLight")} border border-transparent`
              : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200 border border-transparent"
          }`}
        >
          <span
            className={
              activeTab === tab.id ? "" : "text-slate-400 dark:text-slate-500"
            }
          >
            {tab.icon}
          </span>
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default SettingsNavigation;
