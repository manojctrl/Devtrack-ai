import {
  IconFolderCode,
  IconStar,
  IconGitFork,
  IconDeviceAnalytics,
  IconPlane,
  IconBarbell,
} from "@tabler/icons-react";

const TopRepositories = () => {
  const repositories = [
    {
      name: "DevTrack AI",
      desc: "Developer analytics & personal branding platform with GitHub integration",
      stars: 20,
      forks: 4,
      icon: <IconDeviceAnalytics className="w-5 h-5 text-indigo-400" />,
      iconBg: "bg-indigo-600/10",
      tags: [
        {
          label: "React",
          color: "text-indigo-400 border-indigo-500/25 bg-indigo-500/10",
        },
        {
          label: "Express",
          color: "text-purple-400 border-purple-500/25 bg-purple-500/10",
        },
      ],
    },
    {
      name: "Travel Agency",
      desc: "Full-stack travel booking web application with real-time availability",
      stars: 15,
      forks: 3,
      icon: <IconPlane className="w-5 h-5 text-emerald-400" />,
      iconBg: "bg-emerald-500/10",
      tags: [
        {
          label: "React",
          color: "text-indigo-400 border-indigo-500/25 bg-indigo-500/10",
        },
        {
          label: "Node.js",
          color: "text-lime-400 border-lime-500/25 bg-lime-500/10",
        },
      ],
    },
    {
      name: "Gym Management System",
      desc: "Desktop application for gym management with member tracking",
      stars: 10,
      forks: 2,
      icon: <IconBarbell className="w-5 h-5 text-amber-400" />,
      iconBg: "bg-amber-500/10",
      tags: [
        {
          label: "Java",
          color: "text-indigo-400 border-indigo-500/25 bg-indigo-500/10",
        },
        {
          label: "Swing",
          color: "text-sky-400 border-sky-500/25 bg-sky-500/10",
        },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-xs font-bold tracking-wider uppercase text-gray-400 flex items-center gap-2">
          <IconFolderCode className="w-4 h-4 text-indigo-400" />
          <span>Top Repositories</span>
        </div>
        <button className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors bg-none border-none cursor-pointer">
          View all →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {repositories.map((repo, idx) => (
          <div
            key={idx}
            className="bg-[#1a2035] rounded-xl p-5 border border-slate-800 flex flex-col justify-between gap-4 shadow-md transition-all hover:border-slate-700 hover:scale-[1.01]"
          >
            <div className="flex items-center justify-between">
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center ${repo.iconBg}`}
              >
                {repo.icon}
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">
                <IconStar className="w-3.5 h-3.5 fill-amber-400/20" />
                <span>{repo.stars}</span>
              </div>
            </div>

            <div className="space-y-1 flex-1">
              <h3 className="text-base font-bold text-gray-100 tracking-wide line-clamp-1">
                {repo.name}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                {repo.desc}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
              <div className="flex items-center gap-1.5">
                {repo.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded border ${tag.color}`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                <IconGitFork className="w-3.5 h-3.5 text-gray-500" />
                <span>{repo.forks}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRepositories;
