import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

const SocketContext = createContext(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [toasts, setToasts] = useState([]);

  const addNotification = (title, message, type = "info") => {
    const newNotif = {
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      title,
      message,
      type,
      timestamp: new Date(),
      read: false,
    };
    
    setNotifications((prev) => [newNotif, ...prev]);
    
    // Add to active toast notifications
    setToasts((prev) => [...prev, newNotif]);
    
    // Auto-remove toast after 4 seconds
    setTimeout(() => {
      removeToast(newNotif.id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!user || !token) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      return;
    }

    const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    const socketUrl = apiBaseUrl.endsWith("/api") ? apiBaseUrl.slice(0, -4) : apiBaseUrl;

    const newSocket = io(socketUrl, {
      auth: {
        token,
      },
      transports: ["websocket", "polling"],
    });

    newSocket.on("connect", () => {
      console.log("Connected to Socket.IO backend:", newSocket.id);
    });

    newSocket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    // Listen to sync progress and trigger notifications for major milestones
    newSocket.on("sync:progress", (data) => {
      if (data.status === "completed" && data.type === "github") {
        addNotification("GitHub Sync Complete", data.message || "Your GitHub profile has been synchronized.", "success");
      } else if (data.status === "ai_completed" && data.type === "ai") {
        addNotification("AI Recommendations Ready", data.message || "Career recommendations have been generated.", "success");
      } else if (data.status === "failed" || data.status === "ai_failed") {
        addNotification("Sync Failed", data.message || "An error occurred during synchronization.", "error");
      }
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        notifications,
        unreadCount,
        toasts,
        addNotification,
        removeToast,
        markAllAsRead,
        clearNotifications,
      }}
    >
      {children}
      
      {/* Toast Notification UI Overlay */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3.5 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-2xl shadow-xl border backdrop-blur-md flex items-start gap-3 transition-all duration-300 transform translate-y-0 animate-in fade-in slide-in-from-bottom-5 ${
              toast.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                : toast.type === "error"
                ? "bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400"
                : "bg-indigo-500/10 border-indigo-500/20 text-indigo-600 dark:text-indigo-400"
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {toast.type === "success" && <CheckCircle2 size={16} />}
              {toast.type === "error" && <AlertCircle size={16} />}
              {toast.type === "info" && <Info size={16} />}
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-extrabold tracking-wider uppercase font-mono">
                {toast.title}
              </h4>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 mt-1 font-sans">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </SocketContext.Provider>
  );
};
