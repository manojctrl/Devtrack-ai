import {
  FolderGit2,
  Star,
  GitFork,
  Code,
  ExternalLink
} from "lucide-react";
import { useMemo } from "react";

const TopRepositories = ({ repos }) => {
  const repositories = useMemo(() => {
    const list = repos || [];
    return list.slice(0, 3).map((repo) => ({
      name: repo.name,
      desc: repo.description || "No description available on GitHub.",
      stars: repo.stars,
      forks: repo.forks,
      htmlUrl: repo.htmlUrl,
      language: repo.language || "Code",
      iconBg: "bg-indigo-600/10",
    }));
  }, [repos]);

  return (
    <div className="space-y-4 mt-6">
      <div className="flex items-center justify-between">
        <div className="text-xs font-bold tracking-wider uppercase text-gray-400 flex items-center gap-2">
          <FolderGit2 className="w-4 h-4 text-indigo-400" />
          <span>Top Repositories</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {repositories.length > 0 ? (
          repositories.map((repo, idx) => (
            <div
              key={idx}
              onClick={() => window.open(repo.htmlUrl, "_blank")}
              className="bg-[#1a2035] rounded-xl p-5 border border-slate-800 flex flex-col justify-between gap-4 shadow-md transition-all hover:border-slate-700 hover:scale-[1.01] cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center bg-indigo-500/10`}
                >
                  <FolderGit2 className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">
                  <Star className="w-3.5 h-3.5 fill-amber-400/20" />
                  <span>{repo.stars}</span>
                </div>
              </div>

              <div className="space-y-1 flex-1">
                <h3 className="text-base font-bold text-gray-100 tracking-wide line-clamp-1 group-hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  {repo.name} <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                  {repo.desc}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded border text-indigo-400 border-indigo-500/25 bg-indigo-500/10 flex items-center gap-1">
                    <Code size={8} /> {repo.language}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                  <GitFork className="w-3.5 h-3.5 text-gray-500" />
                  <span>{repo.forks}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 py-8 text-center text-slate-500 text-xs font-mono border border-dashed border-slate-800 rounded-xl">
            No repositories found. Sync your profile first.
          </div>
        )}
      </div>
    </div>
  );
};

export default TopRepositories;
