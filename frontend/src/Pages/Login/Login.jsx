import { Link } from "react-router-dom";
import { Mail, Lock, EyeOff, Eye, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { GitBranch, CheckCircle2 } from "lucide-react";

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", loginData);
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans text-[#e2e8f0] box-border selection:bg-purple-500 selection:text-white bg-[#111625]">
      <div className="w-full max-w-[920px] bg-[#111625] rounded-[20px] border border-slate-700/50 overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] flex flex-col md:flex-row relative">
        {/* Left Side */}
        <div className="w-full md:w-[52%] p-8 md:p-12 flex flex-col justify-center relative pt-16 md:pt-20">
          {/* Back Button */}
          <Link
            to="/"
            className="absolute top-6 left-8 md:left-12 flex items-center gap-2 text-xs font-medium text-[#94a3b8] hover:text-[#c084fc] transition-colors duration-200 group"
          >
            <ArrowLeft
              size={18}
              className="transition-transform duration-200 group-hover:-translate-x-1"
            />
            <span className="">Back</span>
          </Link>

          {/* Logo Area */}
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center overflow-hidden text-white">
              <img
                src="src/assets/logo.png"
                alt="DevTrack Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="app-name text-xl font-bold text-white">
              DevTrack
            </span>
          </div>

          {isLogin ? (
            <>
              <h1 className="text-3xl font-bold mb-4">Welcome to DevTrack</h1>
              <p className="text-sm text-[#94a3b8] mb-8">
                New here?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-purple-500 hover:underline font-medium"
                >
                  Create a free Account →{" "}
                </button>
              </p>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold text-white">
                  Create Your Account{" "}
                </h1>
                <span className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  FREE
                </span>
              </div>
              <p className="text-sm text-[#94a3b8] mb-4">
                Already have an Account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-purple-500 hover:underline font-medium"
                >
                  Sign In →
                </button>
              </p>
            </>
          )}

          {/* Form */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your first name"
                      className="w-full bg-[#171e30] border border-slate-700/50 rounded-xl py-2.5 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your last name"
                      className="w-full bg-[#171e30] border border-slate-700/50 rounded-xl py-2.5 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email Address */}

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#94a3b8] uppercase">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3.5 flex items-center text-[#64748b]">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-[#171e30] border border-slate-700/40 rounded-xl py-3 pl-11 pr-4 text-white text-sm outline-none transition-all duration-200 placeholder-[#52525b] focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7]"
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider ">
                  GitHub Username
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaGithub className="w-4 h-4 text-slate-500" />
                  </span>
                  <input
                    type="text"
                    className="w-full bg-[#171e30] border border-slate-700/50 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all text-sm"
                    placeholder="Enter your GitHub Username"
                    required
                  />
                </div>
              </>
            )}

            {/* Password Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#94a3b8] uppercase">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3.5 flex items-center text-[#64748b]">
                  <Lock size={18} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full bg-[#171e30] border border-slate-700/40 rounded-xl py-3 pl-11 pr-11 text-white text-sm outline-none transition-all duration-200 placeholder-[#52525b] focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7]"
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3.5 flex items-center text-[#64748b] hover:text-slate-400 bg-none border-none p-0 cursor-pointer"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}

            {!isLogin && (
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#94a3b8] uppercase">
                  Confirm Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3.5 flex items-center text-[#64748b]">
                    <Lock size={18} />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full bg-[#171e30] border border-slate-700/40 rounded-xl py-3 pl-11 pr-11 text-white text-sm outline-none transition-all duration-200 placeholder-[#52525b] focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3.5 flex items-center text-[#64748b] hover:text-slate-400 bg-none border-none p-0 cursor-pointer"
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-3 px-4 rounded-xl text-sm mt-2 transition-opacity duration-200 hover:opacity-95 shadow-[0_10px_15px_-3px_rgba(147,51,234,0.25)]"
            >
              {isLogin ? "Sign in to your account" : "Create your DevTrack profile"}
            </button>
          </form>
          <div className="relative flex items-center justify-center my-6">
            <div className="border-t border-[#1e293b] w-full"></div>
            <span className="absolute bg-[#111625] px-3 text-xs text-[#64748b] uppercase tracking-wider">
              or continue with
            </span>
          </div>
          <button className="w-full bg-[#171e30] border border-slate-700/40 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2.5 text-sm font-medium transition-colors duration-200 hover:bg-[#1e263d]">
            <FaGithub className="w-5 h-5 text-white fill-current" />
            Sign in with GitHub
          </button>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-[48%] bg-[#141b2d] border-t md:border-t-0 md:border-l border-slate-700/50 p-8 md:p-12 flex flex-col justify-center gap-10">
          <div className="max-w-[340px]">
            <h2 className="text-2xl font-bold text-white leading-snug mb-3">
              Engineered for modern developers.
            </h2>
            <p className="text-sm text-[#94a3b8] leading-relaxed">
              Track your daily impact, automate your portfolio, and supercharge
              your technical career.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* Box 1 */}
            <div className="bg-[#0b0f19] border border-slate-700/30 rounded-[14px] p-5 transition-colors duration-200 hover:border-purple-500/40">
              <span className="text-[#a855f7] mb-3 block">
                <GitBranch className="w-5 h-5" />
              </span>
              <h3 className="text-sm font-semibold text-white mb-1.5">
                1-Click Sync
              </h3>
              <p className="text-xs text-[#64748b] leading-normal">
                Connect your GitHub and let us handle the rest.
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-[#0b0f19] border border-slate-700/30 rounded-[14px] p-5 transition-colors duration-200 hover:border-purple-500/40">
              <span className="text-[#34d399] mb-3 block">
                <CheckCircle2 className="w-5 h-5" />
              </span>
              <h3 className="text-sm font-semibold text-white mb-1.5">
                Verified Proof
              </h3>
              <p className="text-xs text-[#64748b] leading-normal">
                Showcase real code metrics to employers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
