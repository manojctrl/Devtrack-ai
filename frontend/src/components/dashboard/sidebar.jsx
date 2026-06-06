import { useState } from "react";
import { House, User, Brain, FileText, Settings, Menu } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <House size={20} />, active: true },
    { name: "Profile", icon: <User size={20} /> },
    { name: "GitHub Analytics", icon: <FaGithub size={20} /> },
    { name: "Skills", icon: <Brain size={20} /> },
    { name: "Resume", icon: <FileText size={20} /> },
    { name: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <>
      <button
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-slate-800 text-white rounded-md"
        onClick={() => setOpen(!open)}
      >
        <Menu size={24} />
      </button>

      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-slate-900 text-slate-100 border-r border-slate-800 transform transition-transform duration-300 z-40
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex items-center gap-3 px-6 h-16 border-b border-slate-800">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-md flex items-center justify-center overflow-hidden">
            <img
              src="src/assets/logo.png"
              alt="DevTrack Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-lg font-semibold tracking-wide text-white">
            DevTrack
          </span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={`#${item.name.toLowerCase().replace(/\s+/g, "-")}`}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                item.active
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/20"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              {item.icon}
              {item.name}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
