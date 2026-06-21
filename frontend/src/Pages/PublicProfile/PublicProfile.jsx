import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../services/api";
import {
  IconMapPin,
  IconBrandGithub,
  IconBrandLinkedin,
  IconWorld,
  IconMail,
  IconTrophy,
  IconStar,
  IconCode,
  IconFolderCode,
  IconActivity,
  IconArrowLeft,
  IconExternalLink,
  IconAlertCircle,
} from "@tabler/icons-react";

// ─── Constants ────────────────────────────────────────────────────────────────
const MAX_FEATURED_REPOS = 4;
const MAX_RECENT_ACTIVITY = 5;
const MAX_LANGUAGE_BARS = 4;

// ─── Language Style Map ───────────────────────────────────────────────────────
const LANGUAGE_STYLE_MAP = {
  javascript:  "bg-amber-500/10 text-amber-400 border-amber-500/20",
  typescript:  "bg-sky-500/10 text-sky-400 border-sky-500/20",
  react:       "bg-sky-500/10 text-sky-400 border-sky-500/20",
  mysql:       "bg-blue-500/10 text-blue-400 border-blue-500/20",
  node:        "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  express:     "bg-purple-500/10 text-purple-400 border-purple-500/20",
  html:        "bg-orange-500/10 text-orange-400 border-orange-500/20",
  css:         "bg-pink-500/10 text-pink-400 border-pink-500/20",
  python:      "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  java:        "bg-red-500/10 text-red-400 border-red-500/20",
  go:          "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  cpp:         "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
};

const getLanguageStyles = (lang) =>
  LANGUAGE_STYLE_MAP[lang?.toLowerCase()] || "bg-slate-800 text-slate-300 border-slate-700";

// ─── Activity Label Helper ────────────────────────────────────────────────────
const getActivityLabel = (type) => {
  const labels = {
    PushEvent:        "Pushed commits to",
    CreateEvent:      "Created repository",
    WatchEvent:       "Starred",
    PullRequestEvent: "Opened a pull request on",
    IssuesEvent:      "Opened an issue on",
  };
  return labels[type] || type;
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const LoadingScreen = () => (
  <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-3 text-slate-200">
    <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
    <p className="text-xs text-slate-400 font-mono tracking-wider">Loading public developer portfolio...</p>
  </div>
);

const ErrorScreen = ({ message }) => (
  <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center gap-4">
    <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 mb-2">
      <IconAlertCircle size={32} />
    </div>
    <h2 className="text-xl font-bold text-white tracking-tight">Developer Not Found</h2>
    <p className="text-sm text-slate-400 max-w-md">{message}</p>
    <Link
      to="/"
      className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all"
    >
      <IconArrowLeft size={14} /> Back to Homepage
    </Link>
  </div>
);

const SectionCard = ({ children, className = "" }) => (
  <div className={`bg-[#0e1322] border border-slate-900 rounded-2xl p-6 shadow-md shadow-black/10 ${className}`}>
    {children}
  </div>
);

const SectionHeading = ({ icon: Icon, label }) => (
  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-4 pb-3 border-b border-slate-900/60">
    <Icon size={16} className="text-indigo-400" /> {label}
  </h3>
);

const StatBox = ({ value, label, className = "" }) => (
  <div className={`p-4 rounded-xl bg-slate-900/40 border border-slate-900 text-center ${className}`}>
    <div className="text-2xl font-bold text-white tracking-tight">{value}</div>
    <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-1">{label}</div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const PublicProfile = () => {
  const { username } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!username) return;

    const fetchPublicProfile = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await API.get(`/developer/${username}`);
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch public profile:", err);
        setError(err.response?.data?.message || "Developer profile not found or server error.");
      } finally {
        setLoading(false);
      }
    };

    fetchPublicProfile();
  }, [username]);

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen message={error} />;

  // ── Derived Data ─────────────────────────────────────────────────────────
  const { user, githubProfile, repos } = data;

  const displayName =
    user?.name ||
    `${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
    "Developer";

  const avatarUrl    = user?.profilePicture || githubProfile?.avatarUrl;
  const location     = user?.location || githubProfile?.location || "Not specified";
  const aboutMe      = user?.bio || githubProfile?.bio || "This developer hasn't added a biography yet.";

  const languagesObject  = githubProfile?.languages || {};
  const sortedLanguages  = Object.keys(languagesObject).sort((a, b) => languagesObject[b] - languagesObject[a]);
  const totalLangCount   = Object.values(languagesObject).reduce((a, b) => a + b, 0);

  const featuredRepos    = repos ? [...repos].sort((a, b) => b.stars - a.stars).slice(0, MAX_FEATURED_REPOS) : [];
  const recentActivity   = githubProfile?.recentActivity?.slice(0, MAX_RECENT_ACTIVITY) || [];

  const publicReposCount = githubProfile?.publicRepos ?? repos?.length ?? 0;
  const totalStarsCount  = githubProfile?.totalStars ?? repos?.reduce((acc, r) => acc + (r.stars || 0), 0) ?? 0;
  const totalCommitsCount = githubProfile?.totalCommits ?? 0;

  const githubUrl = githubProfile?.htmlUrl || (user?.githubUsername ? `https://github.com/${user.githubUsername}` : null);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white">

      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <header className="border-b border-slate-900 bg-[#0e1322]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-white font-bold tracking-tight">
            <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-sm font-black shadow-md shadow-indigo-600/20 text-white">
              D
            </span>
            <span className="text-sm md:text-base">
              DevTrack <span className="text-indigo-400">AI</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/auth" className="text-xs font-semibold text-slate-300 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link
              to="/auth?tab=register"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/10 hover:-translate-y-0.5 transition-all"
            >
              Create Portfolio
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#161d33] to-[#0b0f19] border-b border-slate-900">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 pt-16 pb-12">
          <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 md:gap-8">

            {/* Avatar */}
            <div className="relative group shrink-0">
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-3xl blur opacity-35 group-hover:opacity-60 transition duration-500" />
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="w-28 h-28 md:w-32 md:h-32 rounded-2xl relative object-cover border border-slate-800 bg-[#0e1322]"
                />
              ) : (
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl relative bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-4xl font-extrabold text-white border border-slate-800 shadow-xl">
                  {displayName.charAt(0)}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-extrabold text-white tracking-tight">{displayName}</h1>
              <p className="text-indigo-400 font-medium text-sm mt-1">{user?.role || "Full Stack Developer"}</p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-400 mt-4">
                <span className="flex items-center gap-1.5">
                  <IconMapPin size={15} className="text-slate-500" /> {location}
                </span>
                {githubUrl && (
                  <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <IconBrandGithub size={15} className="text-slate-500" />
                    @{user.githubUsername}
                  </a>
                )}
                {user?.email && (
                  <span className="flex items-center gap-1.5">
                    <IconMail size={15} className="text-slate-500" /> {user.email}
                  </span>
                )}
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-6">
                {githubUrl && (
                  <a href={githubUrl} target="_blank" rel="noopener noreferrer"
                    className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition text-slate-300 hover:text-white"
                    title="GitHub"
                  >
                    <IconBrandGithub size={18} />
                  </a>
                )}
                {user?.linkedin && (
                  <a
                    href={user.linkedin.startsWith("http") ? user.linkedin : `https://${user.linkedin}`}
                    target="_blank" rel="noopener noreferrer"
                    className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition text-slate-300 hover:text-white"
                    title="LinkedIn"
                  >
                    <IconBrandLinkedin size={18} />
                  </a>
                )}
                {user?.website && (
                  <a
                    href={user.website.startsWith("http") ? user.website : `https://${user.website}`}
                    target="_blank" rel="noopener noreferrer"
                    className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition text-slate-300 hover:text-white"
                    title="Portfolio Website"
                  >
                    <IconWorld size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ───────────────────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">

            {/* Biography */}
            <SectionCard>
              <SectionHeading icon={IconTrophy} label="Biography" />
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">{aboutMe}</p>
            </SectionCard>

            {/* Tech Distribution */}
            <SectionCard>
              <SectionHeading icon={IconCode} label="Tech Distribution" />
              {sortedLanguages.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {sortedLanguages.map((lang) => (
                      <span
                        key={lang}
                        className={`text-[10px] md:text-xs px-2.5 py-1.5 rounded-lg border font-semibold ${getLanguageStyles(lang)}`}
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                  <div className="space-y-2.5 pt-3">
                    {sortedLanguages.slice(0, MAX_LANGUAGE_BARS).map((lang) => {
                      const pct = Math.round((languagesObject[lang] / totalLangCount) * 100);
                      const barWidth = Math.max(pct, 8); // min 8% for visibility
                      return (
                        <div key={lang} className="space-y-1">
                          <div className="flex justify-between items-center text-[11px] font-mono text-slate-400">
                            <span>{lang}</span>
                            <span>{pct}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full"
                              style={{ width: `${barWidth}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-500">No language data found.</p>
              )}
            </SectionCard>

            {/* GitHub Stats */}
            <SectionCard>
              <SectionHeading icon={IconActivity} label="GitHub Activity" />
              <div className="grid grid-cols-2 gap-4">
                <StatBox value={publicReposCount} label="Repositories" />
                <StatBox value={totalStarsCount} label="Stars" />
                <StatBox
                  value={totalCommitsCount > 0 ? totalCommitsCount.toLocaleString() : "—"}
                  label="Commits (recent)"
                  className="col-span-2"
                />
              </div>
            </SectionCard>

          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">

            {/* Featured Projects */}
            <SectionCard>
              <SectionHeading icon={IconFolderCode} label="Featured Projects" />
              {featuredRepos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {featuredRepos.map((repo) => (
                    <a
                      key={repo.name}
                      href={repo.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-xl border border-slate-900 bg-slate-900/20 hover:border-slate-800 hover:bg-slate-900/40 transition-all flex flex-col justify-between group h-[160px]"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors truncate max-w-[80%]">
                            {repo.name}
                          </span>
                          <span className="flex items-center gap-0.5 text-xs text-slate-500 font-medium shrink-0">
                            <IconStar size={13} className="text-amber-400 fill-amber-400" /> {repo.stars}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                          {repo.description || "No project description provided."}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        {repo.language ? (
                          <span className={`text-[10px] px-2 py-0.5 rounded border font-medium ${getLanguageStyles(repo.language)}`}>
                            {repo.language}
                          </span>
                        ) : <span />}
                        <IconExternalLink size={13} className="text-slate-600 group-hover:text-indigo-400 transition-colors" />
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center border border-dashed border-slate-800 rounded-xl">
                  <p className="text-xs text-slate-500">No public repositories to showcase.</p>
                </div>
              )}
            </SectionCard>

            {/* Recent Activity */}
            {recentActivity.length > 0 && (
              <SectionCard>
                <SectionHeading icon={IconActivity} label="Recent Activity" />
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                  {recentActivity.map((act, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center text-xs p-3 bg-slate-900/30 rounded-xl border border-slate-900/60"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                        <span className="text-slate-300">
                          {getActivityLabel(act.type)}{" "}
                          <a
                            href={`https://github.com/${act.repo}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-white hover:text-indigo-400 transition-colors font-mono"
                          >
                            {act.repo}
                          </a>
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono font-medium shrink-0">
                        {new Date(act.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                      </span>
                    </div>
                  ))}
                </div>
              </SectionCard>
            )}

          </div>
        </div>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-900 mt-24 py-8 bg-[#070b13]">
        <div className="max-w-6xl mx-auto px-6 text-center text-xs text-slate-500 space-y-2">
          <p>© {new Date().getFullYear()} DevTrack AI. Personal Branding & Insights Platform.</p>
          <p>Powered by Gemini AI. Created for Developers worldwide.</p>
        </div>
      </footer>

    </div>
  );
};

export default PublicProfile;