import {
  Table,
  Star,
  GitFork,
  ExternalLink,
} from "lucide-react";
import { useMemo } from "react";

const LANGUAGE_BG_COLORS = {
  JavaScript: "bg-indigo-400",
  TypeScript: "bg-emerald-400",
  Python: "bg-yellow-400",
  HTML: "bg-orange-400",
  CSS: "bg-purple-400",
  Java: "bg-amber-400",
  Go: "bg-cyan-400",
  Ruby: "bg-rose-450",
  PHP: "bg-violet-400",
};

const RepositoryList = ({ repos }) => {
  const repositories = useMemo(() => {
    const list = repos || [];
    return list.map((repo) => {
      const langColor = LANGUAGE_BG_COLORS[repo.language] || "bg-slate-400";
      const updatedDate = new Date(repo.updatedAt);
      const formattedDate = isNaN(updatedDate.getTime())
        ? "Recently"
        : updatedDate.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });

      return {
        name: repo.name,
        desc: repo.description || "No description provided.",
        lang: repo.language || "Web Tech",
        langColor,
        stars: repo.stars,
        forks: repo.forks,
        updated: formattedDate,
        url: repo.htmlUrl,
      };
    });
  }, [repos]);

  return (
    <div className="bg-[#1a2035] rounded-xl p-6 border border-slate-800 flex flex-col gap-4 shadow-md w-full mt-6">
      <div className="flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-gray-400">
        <Table className="w-4 h-4 text-indigo-400" />
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
            {repositories.length > 0 ? (
              repositories.map((repo, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-100 text-sm tracking-wide">
                        {repo.name}
                      </span>
                      <span className="text-[11px] text-gray-500 font-normal mt-0.5 max-w-sm truncate">
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
                      <Star className="w-3.5 h-3.5 text-amber-400/80 fill-amber-400/5" />
                      <span>{repo.stars}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1 font-mono text-gray-400">
                      <GitFork className="w-3.5 h-3.5 text-slate-500" />
                      <span>{repo.forks}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-gray-400 font-normal">
                    {repo.updated}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center p-1.5 rounded-md bg-slate-800 hover:bg-indigo-600 hover:text-white text-gray-400 transition-colors border border-slate-700/50 cursor-pointer"
                      title="View Repository"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500 text-xs font-mono">
                  No repositories available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RepositoryList;
