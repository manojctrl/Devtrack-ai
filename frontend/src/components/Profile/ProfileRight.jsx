import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {
  IconInfoCircle,
  IconCode,
  IconCoffee,
  IconBrandReact,
  IconDatabase,
  IconBrandNodejs,
  IconServer,
  IconBrandGit,
  IconBrandGithub,
  IconWind,
  IconSchool,
  IconBuildingCommunity,
  IconCalendar,
  IconFolderCode,
  IconDeviceAnalytics,
  IconPlane,
  IconBarbell,
  IconStar,
  IconTrophy
} from '@tabler/icons-react';

const ProfileRight = ({ githubProfile, repos }) => {
  const { user } = useContext(AuthContext);

  // Fallback language styling map
  const getLanguageStyles = (lang) => {
    const map = {
      javascript: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      typescript: 'bg-sky-500/10 text-sky-450 text-sky-405 text-sky-400 border-sky-500/20',
      react: 'bg-sky-550/10 text-sky-400 border-sky-550/20',
      mysql: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      'node.js': 'bg-emerald-550/10 text-emerald-400 border-emerald-550/20',
      node: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      express: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      git: 'bg-orange-550/10 text-orange-400 border-orange-550/20',
      html: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      css: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
      python: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      java: 'bg-red-500/10 text-red-400 border-red-500/20',
      go: 'bg-cyan-550/10 text-cyan-400 border-cyan-550/20',
      cpp: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
    };
    return map[lang.toLowerCase()] || 'bg-slate-800 text-slate-300 border-slate-700';
  };

  // 1. Bio / About Me
  const aboutMe = user?.bio || githubProfile?.bio || "No biography provided yet. Add your bio in the settings page to showcase your background.";

  // 2. Languages / Skills
  const langObject = githubProfile?.languages || {};
  const languages = Object.keys(langObject).sort((a, b) => langObject[b] - langObject[a]);

  // 3. Featured Projects (GitHub Repos sorted by stars)
  const featuredProjects = repos ? [...repos].sort((a, b) => b.stars - a.stars).slice(0, 3) : [];

  // 4. Achievements Stats
  const publicReposCount = githubProfile?.publicRepos || repos?.length || 0;
  const totalStarsCount = githubProfile?.totalStars || repos?.reduce((acc, r) => acc + (r.stars || 0), 0) || 0;
  const totalCommitsCount = githubProfile?.totalCommits || 0;
  const techCount = languages.length || 0;

  const achievements = [
    { 
      icon: <IconTrophy />, 
      iconBg: 'bg-amber-500/10 text-amber-400',
      val: publicReposCount, 
      label: 'GitHub Repos', 
      color: 'text-gray-100' 
    },
    { 
      icon: <IconBrandGithub />, 
      iconBg: 'bg-red-500/10 text-red-400',
      val: totalCommitsCount > 0 ? totalCommitsCount.toLocaleString() : '—', 
      label: 'Contributions', 
      color: 'text-gray-100' 
    },
    { 
      icon: <IconStar />, 
      iconBg: 'bg-amber-500/10 text-amber-400',
      val: totalStarsCount, 
      label: 'Stars Earned', 
      color: 'text-gray-100' 
    },
    { 
      icon: <IconCode />, 
      iconBg: 'bg-emerald-500/10 text-emerald-400',
      val: techCount > 0 ? `${techCount}` : '—', 
      label: 'Technologies', 
      color: 'text-gray-100' 
    },
  ];

  return (
    <div className="w-full flex flex-col gap-6 text-gray-100">
      
      <section className="bg-[#1a2035] rounded-xl p-6 shadow-md border border-slate-800">
        <h2 className="text-lg font-semibold text-gray-100 flex items-center gap-2 mb-4">
          <IconInfoCircle className="w-5 h-5 text-indigo-400" /> About Me
        </h2>
        <p className="text-gray-400 leading-relaxed text-sm whitespace-pre-line">
          {aboutMe}
        </p>
      </section>

      <section className="bg-[#1a2035] rounded-xl p-6 shadow-md border border-slate-800">
        <h2 className="text-lg font-semibold text-gray-100 flex items-center gap-2 mb-4">
          <IconCode className="w-5 h-5 text-indigo-400" /> Primary Tech Stack
        </h2>
        {languages.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {languages.map((lang, index) => (
              <span
                key={index}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${getLanguageStyles(lang)}`}
              >
                <IconCode className="w-3.5 h-3.5" />
                {lang}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-500">Connect and sync your GitHub profile to showcase your tech stack distribution.</p>
        )}
      </section>

      <section className="bg-[#1a2035] rounded-xl p-6 shadow-md border border-slate-800">
        <h2 className="text-lg font-semibold text-gray-100 flex items-center gap-2 mb-4">
          <IconSchool className="w-5 h-5 text-indigo-400" /> Education
        </h2>
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
            <IconBuildingCommunity className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-200">Itahari International College</div>
            <div className="text-xs text-gray-400 mt-0.5">BSc (Hons) Computing</div>
            <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
              <IconCalendar className="w-3.5 h-3.5" /> 2023 – Present
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#1a2035] rounded-xl p-6 shadow-md border border-slate-800">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-100 flex items-center gap-2">
            <IconFolderCode className="w-5 h-5 text-indigo-400" /> Featured Projects
          </h2>
          {user?.githubUsername && (
            <a 
              href={`https://github.com/${user.githubUsername}?tab=repositories`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
            >
              View all on GitHub →
            </a>
          )}
        </div>

        {featuredProjects.length > 0 ? (
          <div className="flex flex-col gap-4">
            {featuredProjects.map((project, index) => (
              <a
                key={index}
                href={project.htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl border border-slate-800 bg-[#121624]/40 hover:border-slate-700 transition-all block group"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 transition-all">
                      <IconFolderCode className="w-4 h-4" />
                    </div>
                    <div className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">{project.name}</div>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-gray-400">
                    <IconStar className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {project.stars}
                  </div>
                </div>
                <div className="text-xs text-gray-400 mb-3 line-clamp-2">{project.description || "No repository description provided."}</div>
                {project.language && (
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-md font-medium border ${getLanguageStyles(project.language)}`}
                  >
                    {project.language}
                  </span>
                )}
              </a>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center rounded-xl border border-dashed border-slate-800 bg-[#121624]/20">
            <p className="text-xs text-gray-500">Connect your GitHub username to feature your top repositories here.</p>
          </div>
        )}
      </section>

      <section className="bg-[#1a2035] rounded-xl p-6 shadow-md border border-slate-800">
        <h2 className="text-lg font-semibold text-gray-100 flex items-center gap-2 mb-4">
          <IconTrophy className="w-5 h-5 text-indigo-400" /> Achievements
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-5 rounded-xl border border-slate-800 bg-[#121624]/40 text-center hover:border-slate-700 transition-all"
            >
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg mb-3 ${item.iconBg}`}>
                {React.cloneElement(item.icon, { className: 'w-5 h-5' })}
              </div>
              
              <div className={`text-xl font-bold leading-tight ${item.color}`}>{item.val}</div>
              <div className="text-[11px] font-semibold text-gray-400 mt-1 uppercase tracking-wider">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default ProfileRight;