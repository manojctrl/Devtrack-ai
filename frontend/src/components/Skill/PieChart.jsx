import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart2 } from "lucide-react";
import { useMemo } from "react";

const COLORS = ["#818CF8", "#38BDF8", "#34D399", "#FCD34D", "#C084FC", "#F87171", "#FF8A8A"];

const PieChart = ({ languages }) => {
  const chartData = useMemo(() => {
    if (!languages || Object.keys(languages).length === 0) {
      return [
        { name: "JavaScript", score: 85, color: COLORS[0] },
        { name: "TypeScript", score: 65, color: COLORS[1] },
        { name: "Python", score: 45, color: COLORS[2] },
      ];
    }
    const entries = Object.entries(languages);
    const total = entries.reduce((acc, [_, count]) => acc + count, 0);
    return entries
      .map(([name, count], index) => ({
        name,
        score: Math.round((count / total) * 100),
        color: COLORS[index % COLORS.length],
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  }, [languages]);

  return (
    <div className="bg-[#1a2035] rounded-xl p-6 border border-slate-800 flex flex-col h-[400px] shadow-md w-full justify-between">
      <div className="flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-gray-400">
        <BarChart2 className="w-4 h-4 text-indigo-400" />
        <span>Skill Strength Chart</span>
      </div>

      <div className="w-full h-[280px] pr-2 pt-4">
        {chartData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-500 text-xs font-mono">
            No statistics available.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 5, left: -25, bottom: 0 }}
              barSize={24}
            >
              <CartesianGrid 
                vertical={false} 
                stroke="#334155" 
                strokeDasharray="3 3" 
                opacity={0.3} 
              />

              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 600 }}
                dy={8}
              />

              <YAxis 
                domain={[0, 100]} 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: "#94a3b8", fontSize: 11, fontMono: true }}
                tickCount={6}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#111625",
                  borderColor: "#334155",
                  borderRadius: "8px",
                  color: "#f3f4f6",
                  fontSize: "12px"
                }}
                cursor={{ fill: "rgba(255,255,255,0.02)" }}
              />

              <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default PieChart;
