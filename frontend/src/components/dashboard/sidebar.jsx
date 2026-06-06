import { House } from "lucide-react";
import { User } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Brain } from "lucide-react";
import { FileText } from "lucide-react";
import { Settings } from "lucide-react";
const sidebar = () => {
  const menuItems = [
    { name: "dashboard", icon: <House size={20} />, active: true },
    { name: "Profile", icon: <User size={20} /> },
    { name: "GitHub Analytics", icon: <FaGithub size={20} /> },
    { name: "Skills", icon: <Brain size={20} /> },
    { name: "Resume ", icon: <FileText size={20} /> },
    { name: "Settings ", icon: <Settings size={20} /> },
  ];
  return (
    <aside className="w-64 bg-slate-900 text-slate-100 h-screen fixed left-0 top-0 flex flex-col border-r border-slate-800">
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
            href={`#${item.name.toLowerCase().replace(/\s+/g, '-')}`}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              item.active
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            {item.icon}
            {item.name}
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default sidebar;
