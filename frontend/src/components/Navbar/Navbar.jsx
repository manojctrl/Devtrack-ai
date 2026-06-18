import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import myLogo from "../../assets/logo.png";

const Navbar = () => {
  const { user } = useAuth();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-16 py-4 bg-slate-900/75 backdrop-blur-md border-b border-slate-800 mb-4">
      <a
        href="/"
        className="flex items-center gap-2 text-lg font-bold text-white font-sora group hover:scale-105 transition-transform duration-300"
      >
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 group-hover:shadow-lg group-hover:shadow-indigo-500/50 transition-shadow duration-300">
          <img
            src={myLogo}
            alt="DevTrack Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          DevTrack
        </span>
      </a>

      <ul className="flex items-center gap-[32px] list-none text-slate-400">
        <li className="relative py-2">
          <button
            onClick={() => scrollTo("features")}
            className="text-[14px] font-normal tracking-[0.01em] no-underline transition-all duration-300 ease-in-out hover:text-white hover:[text-shadow:0_0_12px_rgba(129,140,248,0.8)] bg-transparent border-none cursor-pointer text-slate-400"
          >
            Features
          </button>
        </li>

        <li className="relative py-2">
          <button
            onClick={() => scrollTo("how-it-works")}
            className="text-[14px] font-normal tracking-[0.01em] no-underline transition-all duration-300 ease-in-out hover:text-white hover:[text-shadow:0_0_12px_rgba(129,140,248,0.8)] bg-transparent border-none cursor-pointer text-slate-400"
          >
            How it works
          </button>
        </li>

        <li className="relative py-2">
          <button
            onClick={() => scrollTo("cta")}
            className="text-[14px] font-normal tracking-[0.01em] no-underline transition-all duration-300 ease-in-out hover:text-white hover:[text-shadow:0_0_12px_rgba(129,140,248,0.8)] bg-transparent border-none cursor-pointer text-slate-400"
          >
            Pricing
          </button>
        </li>

        <li className="relative py-2">
          <button
            onClick={() => scrollTo("blog")}
            className="text-[14px] font-normal tracking-[0.01em] no-underline transition-all duration-300 ease-in-out hover:text-white hover:[text-shadow:0_0_12px_rgba(129,140,248,0.8)] bg-transparent border-none cursor-pointer text-slate-400"
          >
            Blog
          </button>
        </li>
      </ul>

      {user ? (
        <Link to="/dashboard">
          <button className="relative px-6 py-2.5 text-white font-semibold rounded-full overflow-hidden group bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative">Dashboard</span>
          </button>
        </Link>
      ) : (
        <Link to="/auth">
          <button className="relative px-6 py-2.5 text-white font-semibold rounded-full overflow-hidden group bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative">Get Started Free</span>
          </button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
