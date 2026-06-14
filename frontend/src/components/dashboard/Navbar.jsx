import { CiSearch } from "react-icons/ci";
import { Bell, Sparkles, Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
  const { theme, setTheme, accentColor, getAccentClass } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Accent-specific styling for the DevTrack AI badge
  const badgeClasses = {
    blue: "border-indigo-500/30 bg-indigo-500/5 text-indigo-600 dark:text-indigo-400",
    purple: "border-purple-500/30 bg-purple-500/5 text-purple-600 dark:text-purple-400",
    green: "border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400",
  };

  const activeBadgeClass = badgeClasses[accentColor] || badgeClasses.blue;

  return (
    <header className="h-16 bg-white/80 dark:bg-[#1a2035]/80 backdrop-blur-md border-b border-slate-200 dark:border-gray-800 fixed top-0 right-0 sm:left-0 md:left-64 flex items-center justify-between px-4 md:px-8 z-10 transition-colors duration-300">
      
      <div className="flex items-center">
        <div className="hidden sm:flex items-center gap-2 text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/40 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-gray-800 w-64 focus-within:border-slate-300 dark:focus-within:border-purple-500/30 transition-all">
          <CiSearch size={16} className="flex-shrink-0 text-slate-400" />
          <input
            type="text"
            placeholder="Search analytics..."
            aria-label="Search analytics"
            className="bg-transparent border-none text-sm outline-none w-full text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
          />
        </div>

        <button className="sm:hidden p-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-full transition-colors">
          <CiSearch size={20} />
        </button>
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        
        <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border select-none ${activeBadgeClass}`}>
          <Sparkles size={15} className="animate-pulse" />
          <span className="text-xs md:text-sm font-bold tracking-wide font-sans unified-logo">
            DevTrack AI
          </span>
        </div>

        {/* Theme Switcher Button */}
        <button
          onClick={toggleTheme}
          className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-full transition-colors"
          title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications Button */}
        <button className="relative p-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
        </button>

        <div className="h-6 w-px bg-slate-200 dark:bg-gray-800"></div>

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-9 h-9 bg-slate-100 dark:bg-purple-500/10 text-slate-800 dark:text-purple-400 rounded-full flex items-center justify-center font-bold text-sm border border-slate-200 dark:border-purple-500/20 group-hover:border-slate-350 dark:group-hover:border-purple-400 transition-colors">
            CM
          </div>
          <div className="text-left hidden md:block">
            <p className={`text-sm font-semibold text-slate-800 dark:text-slate-200 transition-colors ${getAccentClass("textHover")}`}>
              Chhetri Manoj
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Full Stack Developer
            </p>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;