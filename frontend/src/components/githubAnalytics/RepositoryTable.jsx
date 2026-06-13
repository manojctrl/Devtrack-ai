import {
  IconTable,
  IconStar,
  IconGitFork,
  IconExternalLink,
} from "@tabler/icons-react";

const RepositoryList = () => {
  const repositories = [
    {
      name: "DevTrack AI",
      desc: "Developer analytics platform",
      lang: "JavaScript",
      langColor: "bg-indigo-400",
      stars: 20,
      forks: 4,
      updated: "2 days ago",
      url: "#",
    },
    {
      name: "Travel Agency",
      desc: "Full-stack travel booking app",
      lang: "TypeScript",
      langColor: "bg-emerald-400",
      stars: 15,
      forks: 3,
      updated: "1 week ago",
      url: "#",
    },
    {
      name: "Gym Management System",
      desc: "Desktop management system",
      lang: "Java",
      langColor: "bg-amber-400",
      stars: 10,
      forks: 2,
      updated: "3 weeks ago",
      url: "#",
    },
    {
      name: "meroByapar",
      desc: "Inventory and billing system",
      lang: "Java",
      langColor: "bg-amber-400",
      stars: 8,
      forks: 1,
      updated: "1 month ago",
      url: "#",
    },
  ];

  return (
    <div className="bg-[#1a2035] rounded-xl p-6 border border-slate-800 flex flex-col gap-4 shadow-md w-full">
      <div className="flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-gray-400">
        <IconTable className="w-4 h-4 text-indigo-400" />
        <span>Repository List</span>
      </div>

      <div className="w-full overflow-x-auto rounded-lg border border-slate-800/60">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#111625]/80 border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-gray-400">
              <th className="py-3.5 px-4">Name</th>
              <th className="py-3.5 px-4">Language</th>
              <th className="py-3.5 px-4">Stars</th>
              <th className="py-3.5 px-4">Forks</th>
              <th className="py-3.5 px-4">Updated</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/60 text-xs font-medium text-gray-300">
            {repositories.map((repo, idx) => (
              <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-100 text-sm tracking-wide">
                      {repo.name}
                    </span>
                    <span className="text-[11px] text-gray-500 font-normal mt-0.5">
                      {repo.desc}
                    </span>
                  </div>
                </td>

                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${repo.langColor}`}
                    />
                    <span>{repo.lang}</span>
                  </div>
                </td>

                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-1 font-mono text-gray-400">
                    <IconStar className="w-3.5 h-3.5 text-amber-400/80 fill-amber-400/5" />
                    <span>{repo.stars}</span>
                  </div>
                </td>

                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-1 font-mono text-gray-400">
                    <IconGitFork className="w-3.5 h-3.5 text-slate-500" />
                    <span>{repo.forks}</span>
                  </div>
                </td>

                <td className="py-3.5 px-4 text-gray-400 font-normal">
                  {repo.updated}
                </td>

                <td className="py-3.5 px-4 text-right">
                  <a
                    href={repo.url}
                    className="inline-flex items-center justify-center p-1.5 rounded-md bg-slate-800 hover:bg-indigo-600 hover:text-white text-gray-400 transition-colors border border-slate-700/50"
                    title="View Repository"
                  >
                    <IconExternalLink className="w-3.5 h-3.5" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RepositoryList;
