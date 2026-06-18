import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 px-6 py-8 md:px-12 md:py-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <Link
          to="/"
          className="flex items-center gap-3 font-semibold text-white tracking-wide no-underline hover:opacity-90 transition-opacity"
        >
          <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-md flex items-center justify-center overflow-hidden">
            <img
              src={logo}
              alt="DevTrack Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span>DevTrack</span>
        </Link>

        <div className="text-sm text-center md:text-left order-3 md:order-none">
          &copy; {currentYear} DevTrack. Built for developers, by developers.
        </div>

        <div className="flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="hover:text-indigo-400 transition-colors duration-200 bg-transparent border-none cursor-pointer text-slate-400 text-xs"
          >
            Privacy
          </button>
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="hover:text-indigo-400 transition-colors duration-200 bg-transparent border-none cursor-pointer text-slate-400 text-xs"
          >
            Terms
          </button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400 transition-colors duration-200 text-xs"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
