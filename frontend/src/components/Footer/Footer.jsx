import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { IconBrandGithub, IconBrandLinkedin, IconBrandX } from "@tabler/icons-react";

const FOOTER_LINKS = {
  product: [
    { label: "Features", to: "/#features" },
    { label: "Public Profiles", to: "/#profiles" },
    { label: "Resume Builder", to: "/#resume" },
    { label: "Career Advisor", to: "/#advisor" },
  ],
  company: [
    { label: "Privacy Policy", scrollTop: true },
    { label: "Terms of Service", scrollTop: true },
    { label: "GitHub", href: "https://github.com" },
    { label: "Contact", to: "/contact" },
  ],
};

const SOCIAL_LINKS = [
  { icon: IconBrandGithub, href: "https://github.com", label: "GitHub" },
  { icon: IconBrandX,      href: "https://x.com",      label: "X / Twitter" },
  { icon: IconBrandLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

const FooterLink = ({ item }) => {
  const base = "text-sm text-slate-500 hover:text-indigo-400 transition-colors duration-200 text-left";

  if (item.scrollTop) {
    return (
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`${base} bg-transparent border-none cursor-pointer`}
      >
        {item.label}
      </button>
    );
  }

  if (item.href) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={base}>
        {item.label}
      </a>
    );
  }

  return <Link to={item.to} className={base}>{item.label}</Link>;
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-900 px-6 pt-12 pb-8 md:px-16">
      <div className="max-w-6xl mx-auto">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-slate-900">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3 w-fit hover:opacity-90 transition-opacity">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center overflow-hidden shrink-0">
                <img src={logo} alt="DevTrack Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-sm font-semibold text-white tracking-tight">
                DevTrack <span className="text-indigo-400">AI</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed max-w-[200px]">
              AI-powered portfolio platform for developers who want to be found.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-4">Product</p>
            <div className="flex flex-col gap-3">
              {FOOTER_LINKS.product.map((item) => (
                <FooterLink key={item.label} item={item} />
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-4">Company</p>
            <div className="flex flex-col gap-3">
              {FOOTER_LINKS.company.map((item) => (
                <FooterLink key={item.label} item={item} />
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-xs text-slate-600 text-center md:text-left">
            © {currentYear} DevTrack AI — Built for developers, by developers.
          </p>

          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-500 hover:border-indigo-500/50 hover:text-indigo-400 transition-all duration-200"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;