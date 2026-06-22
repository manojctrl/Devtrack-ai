import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = () => {
  const { loading, user } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#111625] flex items-center justify-center">
        <div className="flex flex-col items-center gap-5">

          {/* Spinner */}
          <div
            className="w-11 h-11 rounded-full border-[3px] border-slate-200 dark:border-slate-700 border-t-violet-500"
            style={{ animation: "spin 0.8s linear infinite" }}
          />

          {/* Pulsing dots */}
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-[7px] h-[7px] rounded-full bg-violet-500"
                style={{
                  animation: "pulse 1.2s ease-in-out infinite",
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>

          <p
            className="text-sm text-slate-400 dark:text-slate-500 tracking-wide"
            style={{ animation: "fadeIn 0.3s ease" }}
          >
            Loading...
          </p>

          {/* Inline keyframes */}
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.3; }
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(8px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  if (!token || !user) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;