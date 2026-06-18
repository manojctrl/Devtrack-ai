import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { 
  IconMapPin, 
  IconBrandGithubCopilot, 
  IconCalendarEvent, 
  IconChartPie2, 
  IconLink, 
  IconExternalLinkOff, 
  IconBrandLinkedin, 
  IconWorld, 
  IconAddressBook, 
  IconMail, 
  IconMapPinCheck 
} from "@tabler/icons-react";

const ProfileLeft = ({ githubProfile }) => {
  const { user, loading } = useContext(AuthContext);

  const displayName = user?.name || `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Developer";
  
  const getInitials = () => {
    if (user?.firstName || user?.lastName) {
      return ((user.firstName?.[0] || "") + (user.lastName?.[0] || "")).toUpperCase();
    }
    if (user?.name) {
      return user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
    }
    return "DV";
  };

  const getProfileStrength = () => {
    const fields = [
      { name: "First Name", val: user?.firstName },
      { name: "Last Name", val: user?.lastName },
      { name: "Email", val: user?.email },
      { name: "GitHub Connected", val: user?.githubUsername },
      { name: "Bio / About Me", val: user?.bio },
      { name: "Location", val: user?.location },
      { name: "LinkedIn URL", val: user?.linkedin },
      { name: "Portfolio Website", val: user?.website },
      { name: "Profile Picture", val: user?.profilePicture || githubProfile?.avatarUrl }
    ];
    const filled = fields.filter(f => f.val && String(f.val).trim() !== "");
    const percentage = Math.round((filled.length / fields.length) * 100);
    const missing = fields.filter(f => !f.val || String(f.val).trim() === "").map(f => f.name);
    return { percentage, missing };
  };

  if (loading) {
    return <div className="w-full md:w-[360px] h-[600px] bg-[#1e1e2e] border border-gray-800 rounded-2xl animate-pulse" />;
  }

  const avatarUrl = user?.profilePicture || githubProfile?.avatarUrl;
  const location = user?.location || githubProfile?.location || "Not set";
  const githubUsername = user?.githubUsername || "Not connected";
  const joinedDate = user?.createdAt 
    ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })
    : "Aug 2025";
  const { percentage, missing } = getProfileStrength();

  return (
    <div className="w-full md:w-[360px] flex flex-col gap-5 text-gray-200 antialiased">
      
      {/* CARD 1: Basic Info */}
      <div className="bg-[#1e1e2e] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="h-24 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
        <div className="px-6 pb-6 relative flex flex-col items-center md:items-start">
          <div className="relative -mt-12 mb-3">
            {avatarUrl ? (
              <img 
                src={avatarUrl} 
                alt={displayName} 
                className="w-24 h-24 rounded-2xl border-4 border-[#1e1e2e] shadow-lg object-cover bg-[#1e1e2e]" 
              />
            ) : (
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-2xl font-bold text-white border-4 border-[#1e1e2e] shadow-lg">
                {getInitials()}
              </div>
            )}
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-[#1e1e2e] rounded-full"></span>
          </div>
          <h2 className="text-xl font-bold text-gray-100 tracking-tight">
            {displayName}
          </h2>
          <p className="text-sm font-medium text-indigo-400 mt-0.5">
            {user?.role || "Full Stack Developer"}
          </p>
          <div className="mt-4 space-y-2 w-full text-xs text-gray-400">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <IconMapPin size={16} className="text-gray-500" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <IconBrandGithubCopilot size={16} className="text-gray-500" />
              <span className="font-mono">{githubUsername}</span>
            </div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <IconCalendarEvent size={16} className="text-gray-500" />
              <span>Joined {joinedDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* CARD 2: Profile Strength */}
      <div className="bg-[#1e1e2e] border border-gray-800 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 mb-4">
          <IconChartPie2 size={18} className="text-indigo-400" />
          <span>Profile Strength</span>
        </div>
        <div className="text-3xl font-extrabold text-gray-100">{percentage}%</div>
        <div className="text-xs text-gray-500 mt-0.5 mb-3">Profile Completion</div>
        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        {missing.length > 0 && (
          <>
            <div className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Missing</div>
            <div className="space-y-2">
              {missing.slice(0, 4).map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80"></span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* CARD 3: Social Links */}
      <div className="bg-[#1e1e2e] border border-gray-800 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 mb-4">
          <IconLink size={18} className="text-indigo-400" />
          <span>Social Links</span>
        </div>
        <div className="flex flex-col gap-2.5">
          <a 
            href={githubProfile?.htmlUrl || (user?.githubUsername ? `https://github.com/${user.githubUsername}` : "#")} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-between p-2.5 rounded-xl bg-gray-800/40 hover:bg-gray-800 border border-gray-800/60 hover:border-gray-700 transition group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-700/30 text-gray-300">
                <IconBrandGithubCopilot size={18} />
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-200">GitHub</div>
                <div className="text-[11px] text-gray-500 font-mono mt-0.5">
                  {user?.githubUsername ? `github.com/${user.githubUsername}` : "Not connected"}
                </div>
              </div>
            </div>
            {user?.githubUsername && <IconExternalLinkOff size={14} className="text-gray-600 group-hover:text-gray-400 transition rotate-180" />}
          </a>
          
          <a 
            href={user?.linkedin ? (user.linkedin.startsWith("http") ? user.linkedin : `https://${user.linkedin}`) : "#"} 
            target={user?.linkedin ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className={`flex items-center justify-between p-2.5 rounded-xl transition group ${
              user?.linkedin 
                ? "bg-blue-500/5 hover:bg-blue-500/10 border border-blue-500/10 hover:border-blue-500/20" 
                : "bg-gray-800/20 border border-gray-800/40 opacity-60 cursor-not-allowed"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                <IconBrandLinkedin size={18} />
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-200">LinkedIn</div>
                <div className="text-[11px] text-gray-500 font-mono mt-0.5 truncate max-w-[180px]">
                  {user?.linkedin || "Not added yet"}
                </div>
              </div>
            </div>
            {user?.linkedin && <IconExternalLinkOff size={14} className="text-gray-600 group-hover:text-blue-400 transition rotate-180" />}
          </a>

          <a 
            href={user?.website ? (user.website.startsWith("http") ? user.website : `https://${user.website}`) : "#"} 
            target={user?.website ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className={`flex items-center justify-between p-2.5 rounded-xl transition group ${
              user?.website 
                ? "bg-indigo-500/5 hover:bg-indigo-500/10 border border-indigo-500/10 hover:border-indigo-500/20" 
                : "bg-gray-800/20 border border-gray-800/40 opacity-60 cursor-not-allowed"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                <IconWorld size={18} />
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-200">Portfolio</div>
                <div className="text-[11px] text-gray-500 font-mono mt-0.5 truncate max-w-[180px]">
                  {user?.website || "Not added yet"}
                </div>
              </div>
            </div>
            {user?.website && <IconExternalLinkOff size={14} className="text-gray-600 group-hover:text-indigo-400 transition rotate-180" />}
          </a>
        </div>
      </div>

      {/* CARD 4: Contact Info */}
      <div className="bg-[#1e1e2e] border border-gray-800/80 rounded-2xl p-5 shadow-xl transition-all duration-300">
        <div className="flex items-center gap-2.5 text-sm font-semibold text-gray-400 mb-3 pb-3 border-b border-gray-800/60">
          <IconAddressBook size={18} className="text-indigo-400" />
          <span className="tracking-wide">Contact Information</span>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4 p-2.5 rounded-xl bg-gray-800/20 border border-transparent hover:border-gray-800 hover:bg-gray-800/40 transition-all duration-200 group">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 group-hover:scale-105 transition-all duration-200 shrink-0">
              <IconMail size={19} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Email Address</span>
              <span className="text-xs font-medium text-gray-300 mt-0.5 truncate group-hover:text-gray-100 transition-colors">
                {user?.email || "Not set"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 p-2.5 rounded-xl bg-gray-800/20 border border-transparent hover:border-gray-800 hover:bg-gray-800/40 transition-all duration-200 group">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:scale-105 transition-all duration-200 shrink-0">
              <IconMapPinCheck size={19} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Current Location</span>
              <span className="text-xs font-medium text-gray-300 mt-0.5 truncate group-hover:text-gray-100 transition-colors">
                {location}
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProfileLeft;