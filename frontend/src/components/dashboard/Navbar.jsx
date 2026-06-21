import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { 
  Bell, 
  Sparkles, 
  Sun, 
  Moon, 
  ChevronDown, 
  User as UserIcon, 
  LogOut, 
  Settings as SettingsIcon,
  CheckCircle2,
  AlertCircle,
  Info
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";
import { useSocket } from "../../context/SocketContext";
import Chatbot from "./Chatbot";

const Navbar = () => {
  const { theme, setTheme, accentColor, getAccentClass } = useTheme();
  const { user, loading, logout } = useContext(AuthContext);
  const { notifications, unreadCount, markAllAsRead, clearNotifications } = useSocket();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const getInitials = (user) => {
    if (!user) return "U";
    
    if (user.name) {
      return user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    
    if (user.firstName || user.lastName) {
      const first = user.firstName ? user.firstName[0] : "";
      const last = user.lastName ? user.lastName[0] : "";
      return (first + last).toUpperCase();
    }

    return "U";
  };

  const badgeClasses = {
    blue: "border-indigo-500/30 bg-indigo-500/5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/10",
    purple: "border-purple-500/30 bg-purple-500/5 text-purple-600 dark:text-purple-400 hover:bg-purple-500/10",
    green: "border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10",
  };

  const activeBadgeClass = badgeClasses[accentColor] || badgeClasses.blue;

  return (
    <>
      <header className="h-16 bg-white/80 dark:bg-[#1a2035]/80 backdrop-blur-md border-b border-slate-200 dark:border-gray-800 fixed top-0 right-0 sm:left-0 md:left-64 flex items-center justify-between px-4 md:px-8 z-10 transition-colors duration-300">
        
        {/* Search Section */}
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

        {/* Right Actions Menu */}
        <div className="flex items-center gap-3 md:gap-5">
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border cursor-pointer hover:scale-105 transition-all duration-300 ${activeBadgeClass}`}
            title="Open DevTrack AI Assistant"
          >
            <Sparkles size={15} className="animate-pulse" />
            <span className="text-xs md:text-sm font-bold tracking-wide font-sans unified-logo">
              DevTrack AI
            </span>
          </button>

          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-full transition-colors"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen);
                if (!isNotificationsOpen) {
                  markAllAsRead();
                }
              }}
              className="relative p-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-full transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-rose-500 text-white font-mono font-bold text-[9px] rounded-full min-w-4 h-4 flex items-center justify-center px-1 animate-pulse border border-white dark:border-[#1a2035]">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {isNotificationsOpen && (
              <>
                <div 
                  className="fixed inset-0 z-20 cursor-default" 
                  onClick={() => setIsNotificationsOpen(false)}
                />
                <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-[#1a2035] border border-slate-200 dark:border-gray-800 rounded-2xl shadow-xl py-2 z-30 animate-in fade-in slide-in-from-top-3 duration-250">
                  <div className="px-4 py-2.5 border-b border-slate-100 dark:border-gray-800 flex justify-between items-center">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-250 font-sans uppercase tracking-wider">Notifications</h4>
                    {notifications.length > 0 && (
                      <button
                        onClick={clearNotifications}
                        className="text-[10px] font-bold text-slate-450 hover:text-rose-500 transition-colors cursor-pointer"
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-8 text-center text-xs text-slate-450 dark:text-slate-400 font-sans">
                        No notifications yet
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/30 border-b border-slate-100 dark:border-gray-800 last:border-b-0 flex items-start gap-3"
                        >
                          <div className={`flex-shrink-0 mt-0.5 ${
                            notif.type === "success" ? "text-emerald-500" :
                            notif.type === "error" ? "text-rose-500" : "text-indigo-500"
                          }`}>
                            {notif.type === "success" && <CheckCircle2 size={14} />}
                            {notif.type === "error" && <AlertCircle size={14} />}
                            {notif.type === "info" && <Info size={14} />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{notif.title}</p>
                            <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">{notif.message}</p>
                            <p className="text-[9px] text-slate-400 dark:text-slate-500 mt-1 font-mono">{new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="h-6 w-px bg-slate-200 dark:bg-gray-800"></div>

          {/* User Profile Section */}
          {loading ? (
            <div className="w-9 h-9 bg-slate-100 dark:bg-slate-800 rounded-full animate-pulse" />
          ) : user ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 cursor-pointer group focus:outline-none"
              >
                {/* Avatar / Initials Circle */}
                <div className="w-9 h-9 bg-slate-100 dark:bg-purple-500/10 text-slate-800 dark:text-purple-400 rounded-full flex items-center justify-center font-bold text-sm border border-slate-200 dark:border-purple-500/20 group-hover:border-slate-400 dark:group-hover:border-purple-400 transition-colors">
                  {getInitials(user)} 
                </div>

                {/* Name & Role Text */}
                <div className="text-left hidden md:block">
                  <p className={`text-sm font-semibold text-slate-800 dark:text-slate-200 transition-colors ${getAccentClass("textHover")} flex items-center gap-1.5`}>
                    <span>{user.name || `${user.firstName} ${user.lastName}`}</span>
                    <ChevronDown size={14} className={`text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`} />
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {user?.role || "Developer"}
                  </p>
                </div>
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-20 cursor-default" 
                    onClick={() => setIsProfileOpen(false)}
                  />
                  <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-[#1a2035] border border-slate-200 dark:border-gray-800 rounded-2xl shadow-xl py-2 z-30 animate-in fade-in slide-in-from-top-3 duration-250">
                    <div className="px-4 py-2.5 border-b border-slate-100 dark:border-gray-800">
                      <p className="text-xs text-slate-450 dark:text-slate-400 font-medium">Signed in as</p>
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-250 truncate mt-0.5">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      to="/profile"
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <UserIcon size={16} className="text-slate-400" />
                      <span>My Profile</span>
                    </Link>

                    <Link
                      to="/settings"
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <SettingsIcon size={16} className="text-slate-400" />
                      <span>Settings</span>
                    </Link>

                    <div className="h-px bg-slate-100 dark:bg-gray-800 my-1" />

                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors text-left"
                    >
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <span className="text-sm text-slate-500"> Not Logged In </span>
          )}
        </div>
      </header>
      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default Navbar;