import { IconMapPin } from "@tabler/icons-react";
import { IconBrandGithubCopilot } from "@tabler/icons-react";
import { IconCalendarEvent } from "@tabler/icons-react";
import { IconChartPie2 } from "@tabler/icons-react";
import { IconLink } from "@tabler/icons-react";
import { IconExternalLinkOff } from "@tabler/icons-react";
import { IconBrandLinkedin } from "@tabler/icons-react";
import { IconWorld } from "@tabler/icons-react";
import { IconAddressBook } from "@tabler/icons-react";
import { IconMail } from "@tabler/icons-react";
import { IconMapPinCheck } from "@tabler/icons-react";
const ProfileLeft = () => {
  return (
    <div className="  w-full md:w-[360px] flex flex-col gap-5 text-gray-200 antialiased">
      <div className="bg-[#1e1e2e] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="h-24 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
        <div className="px-6 pb-6 relative flex flex-col items-center md:items-start">
          <div className="relative -mt-12 mb-3">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-2xl font-bold text-white border-4 border-[#1e1e2e] shadow-lg">
              MK
            </div>
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-[#1e1e2e] rounded-full"></span>
          </div>
          <h2 className="text-xl font-bold text-gray-100 tracking-tight">
            Manoj Katwal
          </h2>
          <p className="text-sm font-medium text-indigo-400 mt-0.5">
            Full Stack Developer
          </p>
          <div className="mt-4 space-y-2 w-full text-xs text-gray-400">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <IconMapPin size={16} className="text-gray-500" />
              <span>Itahari, Nepal</span>
            </div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <IconBrandGithubCopilot size={16} className="text-gray-500" />
              <span className="font-mono">manojkatwal</span>
            </div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <IconCalendarEvent size={16} className="text-gray-500" />
              <span>Joined Aug 2025</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#1e1e2e] border border-gray-800 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 mb-4">
          <IconChartPie2 size={18} className="text-indigo-400" />
          <span>Profile Strength</span>
        </div>

        <div className="text-3xl font-extrabold text-gray-100">80%</div>
        <div className="text-xs text-gray-500 mt-0.5 mb-3">
          Profile Completion
        </div>

        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
          <div className="w-[80%] h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
        </div>

        <div className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
          Missing
        </div>
        <div className="space-y-2">
          {["LinkedIn URL", "Bio / About Me", "Resume Upload"].map(
            (item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-xs text-gray-400"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80"></span>
                <span>{item}</span>
              </div>
            ),
          )}
        </div>
      </div>
      <div className="bg-[#1e1e2e] border border-gray-800 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 mb-4">
          <IconLink size={18} className="text-indigo-400" />
          <span>Social Links</span>
        </div>

        <div className="flex flex-col gap-2.5">
          <a
            href="#"
            className="flex items-center justify-between p-2.5 rounded-xl bg-gray-800/40 hover:bg-gray-800 border border-gray-800/60 hover:border-gray-700 transition group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-700/30 text-gray-300">
                <IconBrandGithubCopilot size={18} />
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-200">
                  GitHub
                </div>
                <div className="text-[11px] text-gray-500 font-mono mt-0.5">
                  github.com/manojkatwal
                </div>
              </div>
            </div>
            <IconExternalLinkOff
              size={14}
              className="text-gray-600 group-hover:text-gray-400 transition"
            />
          </a>

          <a
            href="#"
            className="flex items-center justify-between p-2.5 rounded-xl bg-blue-500/5 hover:bg-blue-500/10 border border-blue-500/10 hover:border-blue-500/20 transition group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                <IconBrandLinkedin size={18} />
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-200">
                  LinkedIn
                </div>
                <div className="text-[11px] text-gray-500 font-mono mt-0.5">
                  Not added yet
                </div>
              </div>
            </div>
            <IconExternalLinkOff
              size={14}
              className="text-gray-600 group-hover:text-blue-400 transition"
            />
          </a>

          <a
            href="#"
            className="flex items-center justify-between p-2.5 rounded-xl bg-indigo-500/5 hover:bg-indigo-500/10 border border-indigo-500/10 hover:border-indigo-500/20 transition group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                <IconWorld size={18} />
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-200">
                  Portfolio
                </div>
                <div className="text-[11px] text-gray-500 font-mono mt-0.5">
                  manojkatwal.dev
                </div>
              </div>
            </div>
            <IconExternalLinkOff
              size={14}
              className="text-gray-600 group-hover:text-indigo-400 transition"
            />
          </a>
        </div>
      </div>
      <div className="bg-[#1e1e2e] border border-gray-800/80 rounded-2xl p-5 shadow-xl transition-all duration-300">
        <div className="flex items-center gap-2.5 text-sm font-semibold text-gray-400 mb-3 pb-3 border-b border-gray-800/60">
          <IconAddressBook size={18} className="text-indigo-400" />
          <span className="tracking-wide">Contact Information</span>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4.5 p-2.5 rounded-xl bg-gray-800/20 border border-transparent hover:border-gray-800 hover:bg-gray-800/40 transition-all duration-200 group">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 group-hover:scale-105 transition-all duration-200 shrink-0">
              <IconMail size={19} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                Email Address
              </span>
              <span className="text-xs font-medium text-gray-300 mt-0.5 truncate group-hover:text-gray-100 transition-colors">
                manoj@example.com
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4.5 p-2.5 rounded-xl bg-gray-800/20 border border-transparent hover:border-gray-800 hover:bg-gray-800/40 transition-all duration-200 group">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:scale-105 transition-all duration-200 shrink-0">
              <IconMapPinCheck size={19} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                Current Location
              </span>
              <span className="text-xs font-medium text-gray-300 mt-0.5 truncate group-hover:text-gray-100 transition-colors">
                Itahari, Nepal
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLeft;
