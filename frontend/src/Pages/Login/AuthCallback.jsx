import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [status, setStatus] = useState("loading"); // 'loading' | 'success' | 'error'
  const [message, setMessage] = useState("Initializing connection to GitHub...");
  const [errorMsg, setErrorMsg] = useState("");

  const code = searchParams.get("code");

  useEffect(() => {
    const messageSequence = [
      { delay: 1000, text: "Authenticating security handshake..." },
      { delay: 2500, text: "Retrieving profile and repositories..." },
      { delay: 4000, text: "Analyzing your developer stats..." },
      { delay: 5500, text: "Finalizing DevTrack user configuration..." }
    ];

    const timeouts = [];
    if (status === "loading") {
      messageSequence.forEach((step) => {
        const t = setTimeout(() => {
          setMessage(step.text);
        }, step.delay);
        timeouts.push(t);
      });
    }

    return () => timeouts.forEach(clearTimeout);
  }, [status]);

  useEffect(() => {
    const exchangeCode = async () => {
      if (!code) {
        setStatus("error");
        setMessage("Authorization code not found.");
        setErrorMsg("Please try signing in again.");
        setTimeout(() => navigate("/auth"), 3000);
        return;
      }

      try {
        const response = await api.post("/auth/github", { code });

        if (response.data && response.data.token) {
          localStorage.setItem("token", response.data.token);
          setUser(response.data.user);
          setStatus("success");
          setMessage("GitHub authentication successful!");
          setTimeout(() => navigate("/dashboard"), 1500);
        } else {
          throw new Error("Invalid server response format.");
        }
      } catch (err) {
        console.error("OAuth callback error:", err);
        setStatus("error");
        setMessage("GitHub authentication failed.");
        setErrorMsg(err.response?.data?.message || err.message || "Something went wrong.");
        setTimeout(() => navigate("/auth"), 4000);
      }
    };

    exchangeCode();
  }, [code, navigate, setUser]);

  return (
    <div className="min-h-screen bg-[#111625] flex items-center justify-center p-4 font-sans selection:bg-purple-500 selection:text-white">
      {/* Glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-[#141b2d] rounded-2xl border border-slate-800/80 p-8 shadow-2xl relative overflow-hidden text-center">
        {/* Subtle top indicator bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

        <div className="flex flex-col items-center gap-6 my-4">
          {status === "loading" && (
            <div className="relative">
              <div className="w-16 h-16 rounded-full border border-indigo-500/20 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
              </div>
              <div className="absolute -inset-1 rounded-full border border-indigo-500/30 animate-ping opacity-25" />
            </div>
          )}

          {status === "success" && (
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
          )}

          {status === "error" && (
            <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <AlertCircle className="w-8 h-8 animate-pulse" />
            </div>
          )}

          <div className="space-y-2.5">
            <h2 className="text-xl font-bold text-white tracking-tight">
              {status === "loading" && "Authenticating Account"}
              {status === "success" && "Success!"}
              {status === "error" && "Authentication Error"}
            </h2>
            <p className="text-sm text-slate-400 min-h-[20px] transition-all duration-300">
              {message}
            </p>
            {status === "error" && (
              <p className="text-xs text-rose-400/80 mt-1 font-mono">
                {errorMsg}
              </p>
            )}
          </div>

          <div className="w-full bg-slate-900/40 rounded-full h-1 overflow-hidden mt-2 border border-slate-800/50">
            <div
              className={`h-full transition-all duration-500 ${
                status === "success" ? "bg-emerald-500 w-full" :
                status === "error" ? "bg-rose-500 w-full" :
                "bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse w-3/4"
              }`}
            />
          </div>

          <span className="text-[10px] text-slate-500 tracking-wider uppercase font-mono mt-1">
            {status === "loading" && "Please do not close this window"}
            {status === "success" && "Setting up dashboard..."}
            {status === "error" && "Redirecting back to login..."}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuthCallback;
