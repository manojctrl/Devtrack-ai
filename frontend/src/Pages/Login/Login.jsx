import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, EyeOff, Eye, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import axios from "axios"; 

import {
  BarChart3,
  FileText,
  TrendingUp,
  BrainCircuit,
  Link2,
  Users,
} from "lucide-react";

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gitHubUserName: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await axios.post("http://localhost:5000/api/auth/login", {
          email: loginData.email,
          password: loginData.password,
        });

        if (response.data) {
          alert("Login successful!");
          localStorage.setItem("token", response.data.token); 
          navigate("/dashboard"); 
        }
      } else {
        if (registerData.password !== registerData.confirmPassword) {
          return alert("Passwords do not match!");
        }
        const response = await axios.post("http://localhost:5000/api/auth/register", registerData);
        alert("Registration Successful! Please login.");
        setIsLogin(true);
      }
    } catch (error) {
      console.error("Authentication Failed", error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
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
                  type="button"
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
                  type="button"
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
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          firstName: e.target.value,
                        })
                      }
                      value={registerData.firstName}
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
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          lastName: e.target.value,
                        })
                      }
                      value={registerData.lastName}
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
                  value={isLogin ? loginData.email : registerData.email}
                  className="w-full bg-[#171e30] border border-slate-700/40 rounded-xl py-3 pl-11 pr-4 text-white text-sm outline-none transition-all duration-200 placeholder-[#52525b] focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7]"
                  onChange={(e) =>
                    isLogin
                      ? setLoginData({ ...loginData, email: e.target.value })
                      : setRegisterData({
                          ...registerData,
                          email: e.target.value,
                        })
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
                    value={registerData.gitHubUserName}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        gitHubUserName: e.target.value,
                      })
                    }
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
                  value={isLogin ? loginData.password : registerData.password}
                  required
                  className="w-full bg-[#171e30] border border-slate-700/40 rounded-xl py-3 pl-11 pr-11 text-white text-sm outline-none transition-all duration-200 placeholder-[#52525b] focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7]"
                  onChange={(e) =>
                    isLogin
                      ? setLoginData({ ...loginData, password: e.target.value })
                      : setRegisterData({
                          ...registerData,
                          password: e.target.value,
                        })
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
                    placeholder="Confirm your password"
                    value={registerData.confirmPassword}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full bg-[#171e30] border border-slate-700/40 rounded-xl py-3 pl-11 pr-11 text-white text-sm outline-none transition-all duration-200 placeholder-[#52525b] focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7]"
                    required
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
              {isLogin
                ? "Sign in to your account"
                : "Create your DevTrack profile"}
            </button>
          </form>

          {/* Social login logic */}
          <div className="relative flex items-center justify-center my-6">
            <div className="border-t border-[#1e293b] w-full"></div>
            <span className="absolute bg-[#111625] px-3 text-xs text-[#64748b] uppercase tracking-wider">
              {isLogin ? "or continue with" : "or sign up with"}
            </span>
          </div>
          <button className="w-full bg-[#171e30] border border-slate-700/40 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2.5 text-sm font-medium transition-colors duration-200 hover:bg-[#1e263d]">
            <span>
              <FaGithub className="w-5 h-5 text-white fill-current" />
            </span>
            {isLogin ? "Sign in with GitHub" : "Sign up with GitHub"}
          </button>
        </div>

        {/* Right Side UI Details */}
        <div className="w-full md:w-[48%] bg-[#141b2d] border-t md:border-t-0 md:border-l border-slate-700/50 p-8 md:p-12 flex flex-col justify-center gap-10">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-6">
              {isLogin ? "DevTrack Features" : "What you get"}
            </span>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#1d263b] flex items-center justify-center text-slate-400 shrink-0">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">
                    {isLogin ? "GitHub synced" : "Live GitHub stats"}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {isLogin
                      ? "Auto-pulls repos, commits & contribution graph"
                      : "Repos, commits, stars & heatmap auto-synced."}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#1d263b] flex items-center justify-center text-emerald-400 shrink-0">
                  {isLogin ? (
                    <TrendingUp className="w-5 h-5" />
                  ) : (
                    <FileText className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">
                    {isLogin ? "Skill analytics" : "PDF resume generator"}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {isLogin
                      ? "Data-driven proficiency scores — no guessing."
                      : "One click — professional resume from your data."}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#1d263b] flex items-center justify-center text-purple-400 shrink-0">
                  {isLogin ? (
                    <BrainCircuit className="w-5 h-5" />
                  ) : (
                    <Link2 className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">
                    {isLogin ? "AI coach" : "Recruiter share link"}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {isLogin
                      ? "Gemini-powered career roadmap built for you."
                      : "devtrack.io/yourname — live portfolio URL."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials section */}
          {isLogin ? (
            <div className="border-t border-slate-800/80 pt-6 mt-8">
              <p className="text-xs italic text-slate-400 leading-relaxed">
                "Got my first job offer 2 weeks after sharing my DevTrack profile."
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-7 h-7 bg-purple-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                  RK
                </div>
                <span className="text-xs font-medium text-slate-300">
                  Rahul K. — Java Dev, Bangalore
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-[#171e30]/80 border border-slate-800/80 rounded-xl p-4 mt-8">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-semibold text-white">
                  2,400+ developers joined
                </span>
              </div>
              <div className="flex -space-x-2 overflow-hidden mb-2">
                <div className="inline-block h-6 w-6 rounded-full ring-2 ring-[#171e30] bg-purple-500 text-[9px] flex items-center justify-center font-bold text-white">
                  MK
                </div>
                <div className="inline-block h-6 w-6 rounded-full ring-2 ring-[#171e30] bg-emerald-500 text-[9px] flex items-center justify-center font-bold text-white">
                  RS
                </div>
                <div className="inline-block h-6 w-6 rounded-full ring-2 ring-[#171e30] bg-blue-500 text-[9px] flex items-center justify-center font-bold text-white">
                  AP
                </div>
              </div>
              <p className="text-[11px] text-slate-400">4.9 / 5 from 340 reviews</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};