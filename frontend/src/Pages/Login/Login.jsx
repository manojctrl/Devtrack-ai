import { Link } from "react-router-dom";
import { Mail, Lock, EyeOff, Eye, ArrowLeft } from "lucide-react"; // ArrowLeft थपिएको छ
import { useState } from "react";
import { FaGithub } from "react-icons/fa";


export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
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

          <h1 className="text-3xl font-bold mb-4">Welcome to DevTrack</h1>
          <p className="text-sm text-[#94a3b8] mb-8">
            New here?{" "}
            <Link
              to="/register"
              className="text-purple-500 hover:underline font-medium"
            >
              Create a free Account →{" "}
            </Link>
          </p>

          {/* Form */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Email Address */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#94a3b8]">
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
                  onChange={(e)=>setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#94a3b8]">
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
                  onChange={(e)=>setFormData({...formData, password: e.target.value})}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3.5 flex items-center text-[#64748b] hover:text-slate-400 bg-none border-none p-0 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-3 px-4 rounded-xl text-sm mt-2 transition-opacity duration-200 hover:opacity-95 shadow-[0_10px_15px_-3px_rgba(147,51,234,0.25)]"
            >
              Sign in to your account
            </button>
          </form>
         <div className="relative flex items-center justify-center my-6">
            <div className="border-t border-[#1e293b] w-full"></div>
            <span className="absolute bg-[#111625] px-3 text-xs text-[#64748b] uppercase tracking-wider">or continue with</span>
          </div>
          <button className="w-full bg-[#171e30] border border-slate-700/40 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2.5 text-sm font-medium transition-colors duration-200 hover:bg-[#1e263d]">
            <FaGithub className="w-5 h-5 text-white fill-current" />
            Sign in with GitHub
          </button>
          
        </div>

        {/* Right Side */}
        <div className="w-full md:w-[48%] p-8 md:p-12 flex flex-col justify-center bg-[#141b2d] border-t md:border-t-0 md:border-l border-slate-700/50">
          RIGHT
        </div>
      </div>
    </div>
  );
};
