import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { Lock } from 'lucide-react';
import { useState } from "react";
import { EyeOff , Eye} from 'lucide-react';



// import Link from "react-router-dom/Link"
export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans text-[#e2e8f0] box-border selection:bg-purple-500 selection:text-white    ">
      <div className="w-full max-w-[920px] bg-[#111625] rounded-[20px] border border-slate-700/50 overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] flex flex-col md:flex-row">
        <div className="w-full md:w-[52%] p-8 md:p-12 flex flex-col justify-center   ">
          <div className=" flex items-center gap-2.5 mb-8 ">
            <div className=" w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center overflow-hidden text-white">
              <img
                src="src/assets/logo.png"
                alt="DevTrack Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="app-name">DevTrack</span>
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
          <form>
            {/* Email Address */}
            <label>Email Address</label>
            <div className="email">
              <span>
                <Mail className="email-icon" size={18} />
              </span>
              <input type="email" placeholder="Enter your email" />
            </div>
            {/* Password Input and Address */}
            <label>Password</label>
            <div className="password">
              <span>
                <Lock className="password-icon" size={18} />
              </span>
              <input type="password" placeholder="Enter your password" />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </form>
        </div>
        <div className="w-full md:w-[48%] p-8 md:p-12 flex flex-col justify-center   ">
          RIGHT
        </div>
      </div>
    </div>
  );
};
