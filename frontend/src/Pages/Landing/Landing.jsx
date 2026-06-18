import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CTA from "../../components/CTA/CTA";
import Footer from "../../components/Footer/Footer";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import Navbar from "../../components/Navbar/Navbar";

const Landing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/auth");
    }
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-slate-950 text-slate-100 min-h-screen flex flex-col items-center justify-center pt-28 pb-16 relative overflow-hidden" id="blog">
        {/* Futuristic Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="mb-4 text-xs text-indigo-400 font-mono tracking-widest uppercase bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full z-10 animate-pulse">
          ⚡ Now in public beta — 2,400+ developers
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-6 leading-tight max-w-4xl z-10 tracking-tight px-4">
          <span className="block text-slate-100">Showcase Your Developer Journey,</span>
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
            Auto-Magically.
          </span>
        </h1>

        <p className="max-w-2xl text-center text-sm md:text-base text-slate-400 mb-10 z-10 leading-relaxed px-6">
          Connect GitHub once. Get a live interactive dashboard that tracks your skills,
          visualizes your contribution patterns, and generates resumes — automatically.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 z-10">
          <button
            onClick={handleGetStarted}
            className="flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-slate-950 rounded-xl hover:bg-slate-100 font-semibold shadow-lg shadow-white/5 transition-all duration-300 hover:scale-[1.03] cursor-pointer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>{user ? "Go to Dashboard" : "Connect GitHub — it's free"}</span>
          </button>
          <button
            onClick={() => scrollTo("how-it-works")}
            className="px-8 py-3.5 border border-slate-800 bg-slate-900/40 text-slate-350 hover:text-white rounded-xl hover:bg-slate-900 font-semibold transition-all duration-300 hover:scale-[1.03] cursor-pointer"
          >
            Watch demo →
          </button>
        </div>

        <div className="flex gap-10 mt-12 text-center z-10 text-slate-350">
          <div>
            <div className="text-2xl font-extrabold text-white">2.4K+</div>
            <div className="text-xs text-slate-500 font-medium">Developers</div>
          </div>
          <div className="w-[1px] bg-slate-855 h-10 self-center"></div>
          <div>
            <div className="text-2xl font-extrabold text-white">98%</div>
            <div className="text-xs text-slate-500 font-medium">Recruiter approval</div>
          </div>
          <div className="w-[1px] bg-slate-855 h-10 self-center"></div>
          <div>
            <div className="text-2xl font-extrabold text-white">3 min</div>
            <div className="text-xs text-slate-500 font-medium">Setup time</div>
          </div>
        </div>

        {/* Mock Dashboard Preview */}
        <div className="relative w-full max-w-5xl px-6 md:px-12 mt-16 animate-fadeUp z-10 animate-fadeUp">
          <div className="bg-[#0b0f19]/80 border border-slate-850 rounded-3xl p-6 shadow-2xl backdrop-blur-md relative overflow-hidden group">
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none group-hover:bg-indigo-500/15 transition-all duration-500" />
            <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl pointer-events-none group-hover:bg-purple-500/15 transition-all duration-500" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-650 flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-indigo-500/20">
                    JD
                  </div>
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#0b0f19] rounded-full"></span>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-white">John Doe</h3>
                    <span className="px-2 py-0.5 text-[9px] font-mono font-medium rounded-full bg-slate-900 border border-slate-800 text-slate-450">github/johndoe</span>
                  </div>
                  <p className="text-xs text-indigo-400 font-medium text-left">Senior Full-Stack Developer</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-850 px-4 py-2.5 rounded-2xl">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider text-left">Developer Level</div>
                  <div className="text-xs font-extrabold text-white text-left">L5 Senior Architect</div>
                </div>
                <div className="w-2.5 h-8 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/40"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-left">
              <div className="space-y-4">
                <div className="bg-slate-900/30 border border-slate-850/80 rounded-2xl p-4">
                  <div className="text-xs text-slate-400 font-medium mb-3">Language Distribution</div>
                  <div className="space-y-2.5">
                    {[
                      { name: "JavaScript", percent: "52%", color: "bg-yellow-500" },
                      { name: "TypeScript", percent: "28%", color: "bg-blue-500" },
                      { name: "React / Next.js", percent: "15%", color: "bg-indigo-450" },
                      { name: "Node.js", percent: "5%", color: "bg-emerald-500" }
                    ].map((lang, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-350 font-medium">{lang.name}</span>
                          <span className="text-slate-400 font-mono">{lang.percent}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-855 rounded-full overflow-hidden">
                          <div className={`h-full ${lang.color} rounded-full`} style={{ width: lang.percent }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/30 border border-slate-850/80 rounded-2xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs text-slate-400 font-medium">Contribution Activity</span>
                    <span className="text-[10px] text-emerald-400 font-mono">1,482 commits</span>
                  </div>
                  <div className="grid grid-cols-12 gap-1.5">
                    {Array.from({ length: 48 }).map((_, idx) => {
                      const opacities = [0.1, 0.2, 0.4, 0.7, 0.9, 0.1, 0.3, 0.6, 0.8, 0.2, 0.1, 0.5];
                      const opacity = opacities[idx % opacities.length];
                      return (
                        <div
                          key={idx}
                          className="aspect-square rounded-sm bg-emerald-500 hover:scale-125 transition-transform duration-150 cursor-pointer"
                          style={{ opacity: opacity }}
                          title={`${Math.floor(opacity * 10)} contributions`}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 flex justify-between mt-4">
                  <span>Less</span>
                  <div className="flex gap-1">
                    {[0.1, 0.3, 0.6, 0.9].map((op, idx) => (
                      <div key={idx} className="w-2.5 h-2.5 bg-emerald-500 rounded-sm" style={{ opacity: op }}></div>
                    ))}
                  </div>
                  <span>More</span>
                </div>
              </div>

              <div className="bg-slate-900/30 border border-slate-850/80 rounded-2xl p-4 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-slate-400 font-medium flex items-center gap-1.5 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping"></span>
                    <span>AI Career Insights</span>
                  </div>
                  <p className="text-[11px] text-slate-350 leading-relaxed italic">
                    "Your React & TS stack is extremely strong. To reach L6/Architect levels, focus on expanding your experience with container orchestration (Docker/K8s) and cloud architecture."
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-850 flex flex-wrap gap-1.5">
                  <span className="text-[9px] font-mono font-medium px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Learn Docker</span>
                  <span className="text-[9px] font-mono font-medium px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">AWS Solutions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-950 px-4 md:px-16 py-24 border-t border-slate-900" id="features">
        <div className="mb-[72px] text-center">
          <div className="flex justify-center text-xs font-mono tracking-widest uppercase text-indigo-400">
            Core Features
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Everything a recruiter needs <br /> to say yes.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-400 text-sm">
            Our platform provides everything you need to showcase your skills
            and stand out to recruiters.
          </p>
        </div>

        {/* Grid Container */}
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-6 md:grid-cols-3 text-left">
          {/* Card 1: GitHub Analytics */}
          <div
            onClick={() => { if (user) navigate("/github-analytics"); else navigate("/auth"); }}
            className="group relative overflow-hidden rounded-2xl border border-slate-850 bg-slate-900/20 p-9 transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:translate-y-[-4px] hover:border-indigo-500/30 hover:bg-slate-900/40 hover:shadow-[0_0_40px_rgba(99,102,241,0.06)] cursor-pointer"
          >
            <div className="absolute inset-0 opacity-0 transition-opacity duration-400 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent group-hover:opacity-100" />
            <div className="relative z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-500/25 bg-indigo-500/10 text-indigo-400">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </div>
            <h3 className="relative z-10 text-lg font-bold tracking-tight mb-2.5 text-white">GitHub Analytics</h3>
            <p className="relative z-10 text-xs font-light leading-relaxed text-slate-400 mb-6">
              Get detailed insights into your GitHub activity and contribution metrics.
            </p>
            <div className="relative z-10 flex flex-wrap gap-1.5">
              {['commits', 'pull requests', 'issues', 'repos'].map((tag, index) => (
                <span key={index} className="font-mono text-[10px] font-medium px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2: Skill Tracking */}
          <div
            onClick={() => { if (user) navigate("/skills"); else navigate("/auth"); }}
            className="group relative overflow-hidden rounded-2xl border border-slate-855 bg-slate-900/20 p-9 transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:translate-y-[-4px] hover:border-indigo-500/30 hover:bg-slate-900/40 hover:shadow-[0_0_40px_rgba(99,102,241,0.06)] cursor-pointer"
          >
            <div className="absolute inset-0 opacity-0 transition-opacity duration-400 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent group-hover:opacity-100" />
            <div className="relative z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-500/25 bg-indigo-500/10 text-indigo-400">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <h3 className="relative z-10 text-lg font-bold tracking-tight mb-2.5 text-white">Skill Tracking</h3>
            <p className="relative z-10 text-xs font-light leading-relaxed text-slate-400 mb-6">
              Automatically track and visualize your skills growth and technology levels over time.
            </p>
            <div className="relative z-10 flex flex-wrap gap-1.5">
              {['React', 'TypeScript', 'Node.js', 'Docker', 'AWS'].map((tag, index) => (
                <span key={index} className="font-mono text-[10px] font-medium px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Card 3: AI Career Suggestions */}
          <div
            onClick={() => { if (user) navigate("/skills"); else navigate("/auth"); }}
            className="group relative overflow-hidden rounded-2xl border border-slate-855 bg-slate-900/20 p-9 transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:translate-y-[-4px] hover:border-indigo-500/30 hover:bg-slate-900/40 hover:shadow-[0_0_40px_rgba(99,102,241,0.06)] cursor-pointer"
          >
            <div className="absolute inset-0 opacity-0 transition-opacity duration-400 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent group-hover:opacity-100" />
            <div className="relative z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-500/25 bg-indigo-500/10 text-indigo-400">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                <path d="M12 2a10 10 0 0 1 10 10" />
                <path d="M12 12l-4 4" />
                <circle cx="12" cy="12" r="1" />
              </svg>
            </div>
            <h3 className="relative z-10 text-lg font-bold tracking-tight mb-2.5 text-white">AI Career Suggestions</h3>
            <p className="relative z-10 text-xs font-light leading-relaxed text-slate-400 mb-6">
              Get personalized career advice and roadmap suggestions based on your profile stats.
            </p>
            <div className="relative z-10 flex flex-wrap gap-1.5">
              {['Gemini AI', 'Skill gaps', 'Roadmaps'].map((tag, index) => (
                <span key={index} className="font-mono text-[10px] font-medium px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />
      <CTA />
      <Footer />
    </>
  );
};

export default Landing;