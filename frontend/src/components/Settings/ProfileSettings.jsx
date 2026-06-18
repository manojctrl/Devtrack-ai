import { MapPin, Globe, FileText, Upload, Check } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const ProfileSettings = ({
  profile,
  setProfile,
  handleProfileSubmit,
  linkedinRef,
  resumeRef,
  resumeFile,
  handleFileChange,
  getAccentClass,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm space-y-6 animate-fadeUp">
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
        <h2 className="text-xl font-bold text-slate-950 dark:text-white">
          Profile Settings
        </h2>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
          Configure your DevTrack AI public profile presence.
        </p>
      </div>

      <form onSubmit={handleProfileSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* GitHub Username */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <FaGithub size={14} /> GitHub Username{" "}
              <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={profile.github}
              onChange={(e) =>
                setProfile({ ...profile, github: e.target.value })
              }
              className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 dark:bg-slate-850/30 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-sm outline-none transition-all ${getAccentClass(
                "borderFocus"
              )}`}
              placeholder="github_username"
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin size={14} /> Location
            </label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) =>
                setProfile({ ...profile, location: e.target.value })
              }
              className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 dark:bg-slate-850/30 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-sm outline-none transition-all ${getAccentClass(
                "borderFocus"
              )}`}
              placeholder="e.g. Kathmandu, Nepal"
            />
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Bio
          </label>
          <textarea
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            rows={4}
            className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 dark:bg-slate-850/30 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-sm outline-none transition-all resize-none ${getAccentClass(
              "borderFocus"
            )}`}
            placeholder="Tell the DevTrack community about yourself..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Portfolio URL */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Globe size={14} /> Portfolio URL
            </label>
            <input
              type="url"
              value={profile.portfolio}
              onChange={(e) =>
                setProfile({ ...profile, portfolio: e.target.value })
              }
              className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 dark:bg-slate-850/30 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-sm outline-none transition-all ${getAccentClass(
                "borderFocus"
              )}`}
              placeholder="https://yourportfolio.dev"
            />
          </div>

          {/* LinkedIn URL */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <FaLinkedin size={14} /> LinkedIn URL
            </label>
            <input
              ref={linkedinRef}
              type="url"
              value={profile.linkedin}
              onChange={(e) =>
                setProfile({ ...profile, linkedin: e.target.value })
              }
              className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 dark:bg-slate-850/30 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-sm outline-none transition-all ${getAccentClass(
                "borderFocus"
              )}`}
              placeholder="https://linkedin.com/in/username"
            />
          </div>
        </div>

        {/* Resume Upload Section */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <FileText size={14} /> Resume / CV
          </label>

          <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center hover:border-slate-400 dark:hover:border-slate-600 transition-colors cursor-pointer relative bg-slate-50/20 dark:bg-slate-900/10">
            <input
              ref={resumeRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center justify-center gap-2.5">
              <div className={`p-3 rounded-full ${getAccentClass("bgLight")}`}>
                <Upload size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {resumeFile ? resumeFile.name : "Upload your resume"}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {resumeFile
                    ? `Ready to update • ${(resumeFile.size / 1024).toFixed(1)} KB`
                    : "Drag & drop files or browse. Supports PDF, DOC, DOCX up to 5MB."}
                </p>
              </div>
              {resumeFile && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-500 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/25 px-2.5 py-1 rounded-full font-medium mt-1">
                  <Check size={12} /> File attached
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className={`px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 shadow-md ${getAccentClass(
            "bg"
          )} hover:-translate-y-0.5 ${getAccentClass("shadow")}`}
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;
