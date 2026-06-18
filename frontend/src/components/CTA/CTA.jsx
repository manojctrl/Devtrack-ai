import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const CTA = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/auth");
    }
  };

  return (
    <section className="bg-slate-950 py-24 lg:py-32 px-6 md:px-16 text-center" id="cta">
      <div className="group relative max-w-2xl mx-auto rounded-3xl border border-indigo-500/10 bg-slate-900/20 p-10 md:p-16 overflow-hidden backdrop-blur-md">
        
        {/* Glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05),transparent_70%)] pointer-events-none" />

        {/* Content */}
        <h2 className="relative z-10 text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
          Ready to stand out?
        </h2>
        
        <p className="relative z-10 max-w-xl mx-auto text-sm font-light text-slate-455 leading-relaxed mb-10">
          Join 2,400+ developers who replaced their static PDF resume with a live, 
          data-driven profile that impresses recruiters instantly.
        </p>

        {/* CTA Button */}
        <button 
          onClick={handleGetStarted}
          className="relative z-10 inline-flex items-center gap-2.5 px-10 py-4 rounded-xl text-sm font-semibold text-slate-950 bg-white hover:bg-slate-100 shadow-none transition-all duration-300 hover:scale-[1.03] select-none cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          {user ? "Go to Dashboard" : "Connect GitHub — free forever"}
        </button>
        
      </div>
    </section>
  );
};

export default CTA;