import { CiSearch } from "react-icons/ci";
import { Bell, Sparkles } from "lucide-react";

const Navbar = () => {
  return (
    <header className="h-16 bg-[#1a2035]/80 backdrop-blur-md border-b border-gray-800 fixed top-0 right-0 sm:left-0 md:left-64 flex items-center justify-between px-4 md:px-8 z-10">
      
      <div className="flex items-center">
        <div className="hidden sm:flex items-center gap-2 text-slate-400 bg-slate-800/40 px-3 py-1.5 rounded-lg border border-gray-800 w-64 focus-within:border-purple-500/30 transition-all">
          <CiSearch size={16} className="flex-shrink-0 text-slate-400" />
          <input
            type="text"
            placeholder="Search analytics..."
            aria-label="Search analytics"
            className="bg-transparent border-none text-sm outline-none w-full text-slate-200 placeholder-slate-500"
          />
        </div>

        <button className="sm:hidden p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-full transition-colors">
          <CiSearch size={20} />
        </button>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/5 select-none text-[#b392f0]">
          <Sparkles size={15} className="fill-[#b392f0]/20 animate-pulse" />
          <span className="text-xs md:text-sm font-bold tracking-wide font-sans unified-logo">
            DevTrack AI
          </span>
        </div>

        <button className="relative p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
        </button>

        <div className="h-6 w-px bg-gray-800"></div>

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-9 h-9 bg-purple-500/10 text-purple-400 rounded-full flex items-center justify-center font-bold text-sm border border-purple-500/20 group-hover:border-purple-400 transition-colors">
            CM
          </div>
          <div className="text-left hidden md:block">
            <p className="text-sm font-semibold text-slate-200 group-hover:text-purple-400 transition-colors">
              Chhetri Manoj
            </p>
            <p className="text-xs text-slate-400 font-medium">
              Full Stack Developer
            </p>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;