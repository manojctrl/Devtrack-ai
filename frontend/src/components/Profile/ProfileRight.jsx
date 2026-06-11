import React from 'react';
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

const ProfileRight = () => {
  const skills = [
    { name: 'Java', icon: <IconCoffee />, styles: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
    { name: 'React', icon: <IconBrandReact />, styles: 'bg-sky-500/10 text-sky-400 border-sky-500/20' },
    { name: 'MySQL', icon: <IconDatabase />, styles: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
    { name: 'Node.js', icon: <IconBrandNodejs />, styles: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
    { name: 'Express', icon: <IconServer />, styles: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
    { name: 'Spring Boot', icon: null, styles: 'bg-green-500/10 text-green-400 border-green-500/20' },
    { name: 'Git', icon: <IconBrandGit />, styles: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
    { name: 'GitHub', icon: <IconBrandGithub />, styles: 'bg-slate-800 text-slate-300 border-slate-700' },
    { name: 'Tailwind CSS', icon: <IconWind />, styles: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
    { name: 'REST APIs', icon: null, styles: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
  ];

  const projects = [
    {
      name: 'DevTrack AI',
      desc: 'Developer analytics & personal branding platform with GitHub integration',
      stars: 48,
      icon: <IconDeviceAnalytics />,
      iconBg: 'bg-indigo-500/10 text-indigo-400',
      tags: ['React', 'Express', 'MySQL'],
    },
    {
      name: 'Travel Agency Dashboard',
      desc: 'Full-stack travel booking web application with real-time availability',
      stars: 32,
      icon: <IconPlane />,
      iconBg: 'bg-emerald-500/10 text-emerald-400',
      tags: ['React', 'Node.js'],
    },
    {
      name: 'Gym Management System',
      desc: 'Desktop application for gym management with member tracking',
      stars: 21,
      icon: <IconBarbell />,
      iconBg: 'bg-amber-500/10 text-amber-400',
      tags: ['Java', 'Swing'],
    },
  ];

  const achievements = [
    { 
      icon: <IconTrophy />, 
      iconBg: 'bg-amber-500/10 text-amber-400',
      val: '25', 
      label: 'GitHub Repos', 
      color: 'text-gray-100' 
    },
    { 
      icon: <IconBrandGithub />, 
      iconBg: 'bg-red-500/10 text-red-400',
      val: '1,600', 
      label: 'Contributions', 
      color: 'text-gray-100' 
    },
    { 
      icon: <IconStar />, 
      iconBg: 'bg-amber-500/10 text-amber-400',
      val: '75', 
      label: 'Stars Earned', 
      color: 'text-gray-100' 
    },
    { 
      icon: <IconCode />, 
      iconBg: 'bg-emerald-500/10 text-emerald-400',
      val: '10+', 
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
        <p className="text-gray-400 leading-relaxed text-sm">
          Passionate Full Stack Developer focused on building scalable web applications
          using React, Node.js, Java, and MySQL. Currently pursuing BSc (Hons) Computing
          at Itahari International College. I love building developer tools that make
          workflows faster and portfolios more impressive.
        </p>
      </section>

      <section className="bg-[#1a2035] rounded-xl p-6 shadow-md border border-slate-800">
        <h2 className="text-lg font-semibold text-gray-100 flex items-center gap-2 mb-4">
          <IconCode className="w-5 h-5 text-indigo-400" /> Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${skill.styles}`}
            >
              {skill.icon && React.cloneElement(skill.icon, { className: 'w-3.5 h-3.5' })}
              {skill.name}
            </span>
          ))}
        </div>
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
          <button className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors bg-transparent border-none cursor-pointer">
            View all →
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {projects.map((project, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border border-slate-800 bg-[#121624]/40 hover:border-slate-700 transition-all"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2.5">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${project.iconBg}`}>
                    {React.cloneElement(project.icon, { className: 'w-4 h-4' })}
                  </div>
                  <div className="text-sm font-semibold text-gray-200">{project.name}</div>
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-gray-400">
                  <IconStar className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {project.stars}
                </div>
              </div>
              <div className="text-xs text-gray-400 mb-3">{project.desc}</div>
              <div className="flex gap-1.5">
                {project.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="text-[11px] px-2 py-0.5 rounded-md font-medium text-indigo-400 bg-indigo-500/5 border border-indigo-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
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