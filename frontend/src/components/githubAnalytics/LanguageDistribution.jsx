import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { PieChart as LucidePieChart } from "lucide-react";
import { useMemo } from "react";

const COLOR_PALETTE = ["#6366F1", "#34D399", "#FCD34D", "#C084FC", "#F87171", "#38BDF8", "#F472B6"];

const LanguageDistribution = ({ languages }) => {
  const chartData = useMemo(() => {
    if (!languages || Object.keys(languages).length === 0) {
      return [];
    }

    const entries = Object.entries(languages);
    const total = entries.reduce((acc, [_, val]) => acc + val, 0);

    return entries
      .map(([name, count], index) => ({
        name,
        value: count,
        percentage: Math.round((count / total) * 100),
        color: COLOR_PALETTE[index % COLOR_PALETTE.length],
      }))
      .sort((a, b) => b.value - a.value);
  }, [languages]);

  return (
    <div className="bg-[#1a2035] rounded-xl p-6 border border-slate-800 flex flex-col h-[380px] shadow-lg">
      <div className="flex items-center gap-2 text-sm font-semibold uppercase text-gray-400 mb-5">
        <LucidePieChart className="w-4 h-4 text-indigo-400" />
        <span>Language Distribution</span>
      </div>

      {chartData.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-slate-500 text-xs font-mono">
          No language metrics available.
        </div>
      ) : (
        <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="w-[200px] h-[200px] relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111625",
                    borderColor: "#334155",
                    borderRadius: "8px",
                    color: "#f3f4f6",
                    fontSize: "12px",
                  }}
                />
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </RechartsPieChart>
            </ResponsiveContainer>

            <div className="absolute text-center">
              <span className="text-3xl font-bold text-gray-100">{chartData.length}</span>
              <span className="text-[11px] font-medium uppercase tracking-wider text-gray-400 block">
                Languages
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 w-full md:w-auto overflow-y-auto max-h-[220px] pr-2">
            {chartData.map((entry, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-sm text-gray-305 text-slate-300"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="font-medium truncate max-w-[100px]">{entry.name}</span>
                <span className="ml-auto text-gray-400 font-mono text-xs pl-4">
                  {entry.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageDistribution;
