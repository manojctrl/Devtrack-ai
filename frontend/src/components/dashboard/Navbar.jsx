import { CiSearch } from "react-icons/ci";
import { Bell } from "lucide-react";

const Navbar = () => {
  return (
    <header className="h-16 bg-[#1a2035]/80 backdrop-blur-md border-b border-gray-800 fixed top-0 right-0 sm:left-0 md:left-64 flex items-center justify-between px-4 md:px-8 z-10">
      <div className="flex items-center gap-2 text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 w-72">
        <CiSearch size={16} className="flex-shrink-0 text-slate-600" />
        <input
          type="text"
          placeholder="Search analytics"
          aria-label="Search analytics"
          className="bg-transparent border-none text-sm outline-none w-full text-slate-700"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
        </button>

        <div className="h-6 w-px bg-slate-200"></div>

        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-9 h-9 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-semibold text-sm border border-emerald-200">
            CM
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-sm font-semibold text-slate-200 hover:text-emerald-400 transition-colors">
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
