import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { IconBrandGithub, IconLayoutDashboard } from "@tabler/icons-react";

const CTA = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    navigate(user ? "/dashboard" : "/auth");
  };

  return (
    <section className="bg-slate-950 py-24 lg:py-32 px-6 md:px-16 text-center" id="cta">
      <div className="group relative max-w-2xl mx-auto rounded-3xl border border-indigo-500/10 bg-slate-900/20 p-10 md:p-16 overflow-hidden backdrop-blur-md">

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05),transparent_70%)] pointer-events-none" />

        <h2 className="relative z-10 text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
          Ready to stand out?
        </h2>

        <p className="relative z-10 max-w-xl mx-auto text-sm font-light text-slate-400 leading-relaxed mb-10">
          Join 2,400+ developers who replaced their static PDF resume with a live,
          data-driven profile that impresses recruiters instantly.
        </p>

        <button
          onClick={handleGetStarted}
          className="relative z-10 inline-flex items-center gap-2.5 px-10 py-4 rounded-xl text-sm font-semibold text-slate-950 bg-white hover:bg-slate-100 transition-all duration-300 hover:scale-[1.03] select-none cursor-pointer"
        >
          {user ? (
            <>
              <IconLayoutDashboard size={18} />
              Go to Dashboard
            </>
          ) : (
            <>
              <IconBrandGithub size={18} />
              Connect GitHub — free forever
            </>
          )}
        </button>

      </div>
    </section>
  );
};

export default CTA;