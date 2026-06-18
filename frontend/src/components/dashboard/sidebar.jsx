import { useState } from "react";
import { NavLink } from "react-router-dom";
import { House, User, Brain, FileText, Settings, Menu } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import logo from "../../assets/logo.png";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { getAccentClass } = useTheme();

  const menuItems = [
    { name: "Dashboard", icon: <House size={20} />, path: "/dashboard" },
    { name: "Profile", icon: <User size={20} />, path: "/profile" },
    { name: "GitHub Analytics", icon: <FaGithub size={20} />, path: "/github-analytics" },
    { name: "Skills", icon: <Brain size={20} />, path: "/skills" },
    { name: "Resume", icon: <FileText size={20} />, path: "/resume" },
    { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
  ];

  return (
    <>
      <button
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white rounded-md border border-slate-300 dark:border-slate-700"
        onClick={() => setOpen(!open)}
      >
        <Menu size={24} />
      </button>

      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 z-40
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex items-center gap-3 px-6 h-16 border-b border-slate-200 dark:border-slate-800">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-md flex items-center justify-center overflow-hidden">
            <img
              src={logo}
              alt="DevTrack Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-lg font-semibold tracking-wide text-slate-900 dark:text-white">
            DevTrack
          </span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? `${getAccentClass("bg")} text-white shadow-lg ${getAccentClass("shadow")}`
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-105 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200"
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
