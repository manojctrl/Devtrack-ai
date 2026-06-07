import React, { useState } from "react";
import { Flame } from "lucide-react";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS   = ["", "Mon", "", "Wed", "", "Fri", ""];

function generateData() {
  const weeks = [];
  for (let w = 0; w < 52; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const r = Math.random();
      week.push(r < 0.3 ? 0 : r < 0.5 ? 1 : r < 0.7 ? 2 : r < 0.85 ? 3 : 4);
    }
    weeks.push(week);
  }
  return weeks;
}
const WEEK_DATA = generateData();

const COLORS = {
  0: { bg: "#161b22", border: "#21262d" },
  1: { bg: "#0e4429", border: "#145e39" },
  2: { bg: "#006d32", border: "#008a3e" },
  3: { bg: "#26a641", border: "#2fbd4d" },
  4: { bg: "#39d353", border: "#45e861" },
};

function getMonthLabels() {
  const labels = [];
  const monthStarts = [0, 4, 9, 13, 18, 22, 26, 31, 35, 40, 44, 48];
  monthStarts.forEach((weekIdx, i) => {
    labels.push({ weekIdx, name: MONTHS[i] });
  });
  return labels;
}

export default function ContributionHeatmap() {
  const [tooltip, setTooltip] = useState(null);
  const totalContributions = WEEK_DATA.flat().reduce((sum, v) => sum + v * 3, 0);
  const monthLabels = getMonthLabels();

  const CELL = 12;
  const GAP  = 4;
  const STEP = CELL + GAP;

  return (
    <div className="w-full bg-[#1a2035] border border-gray-800/60 p-6 rounded-2xl shadow-lg">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="text-gray-100 text-base font-bold flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
            Coding Consistency
          </div>
          <div className="text-gray-400 text-xs mt-0.5">
            {totalContributions.toLocaleString()} contributions in 2024
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse" />
          Active
        </div>
      </div>

      {/* Heatmap */}
      <div className="flex justify-center pb-4">
        <svg
          width={(STEP * 53) + 32}
          height={(STEP * 7) + 20}
          className="max-w-full select-none"
        >
          {monthLabels.map(({ weekIdx, name }) => (
            <text
              key={name}
              x={32 + (weekIdx * STEP)}
              y={10}
              fill="#9ca3af"
              fontSize={10}
              fontWeight={500}
              fontFamily="sans-serif"
            >
              {name}
            </text>
          ))}

          {DAYS.map((day, i) => (
            <text
              key={i}
              x={0}
              y={18 + (i * STEP) + (CELL / 2) + 2}
              fill="#6b7280"
              fontSize={9}
              fontWeight={500}
              fontFamily="sans-serif"
            >
              {day}
            </text>
          ))}

          {WEEK_DATA.map((week, wi) =>
            week.map((level, di) => {
              const x = 32 + (wi * STEP);
              const y = 16 + (di * STEP);
              const col = COLORS[level];
              return (
                <rect
                  key={`${wi}-${di}`}
                  x={x}
                  y={y}
                  width={CELL}
                  height={CELL}
                  rx={2}
                  fill={col.bg}
                  stroke={col.border}
                  strokeWidth={0.5}
                  className="cursor-pointer transition-transform duration-150 hover:scale-110 hover:shadow-md"
                  onMouseEnter={(e) => {
                    setTooltip({ x: e.clientX, y: e.clientY, count: level * 3 });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                />
              );
            })
          )}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex justify-center items-center mt-3 pt-4 border-t border-gray-800/60 text-xs text-gray-400 gap-2">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((l) => (
          <div
            key={l}
            className="w-[12px] h-[12px] rounded-[2px] transition-transform duration-200 hover:scale-110"
            style={{
              background: COLORS[l].bg,
              border: `0.5px solid ${COLORS[l].border}`
            }}
          />
        ))}
        <span>More</span>
        <span className="ml-4 font-mono text-gray-500">2024</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-gray-800/60">
        {[
          { val: "14", color: "text-emerald-400", label: "day streak" },
          { val: "1,605", color: "text-gray-200", label: "total contributions" },
          { val: "6", color: "text-gray-200", label: "days/week avg" },
          { val: "Jun", color: "text-indigo-400", label: "best month" },
        ].map(({ val, color, label }) => (
          <div key={label} className="bg-[#222b45]/30 p-3 rounded-xl border border-gray-800/30 text-center sm:text-left">
            <div className={`text-lg font-bold font-mono tracking-tight ${color}`}>{val}</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed bg-[#222b45] border border-gray-700 shadow-xl rounded-lg px-2.5 py-1.5 text-xs text-gray-200 pointer-events-none z-[9999] whitespace-nowrap font-medium"
          style={{ left: tooltip.x + 12, top: tooltip.y - 40 }}
        >
          {tooltip.count === 0 ? "No contributions" : `${tooltip.count} contributions`}
        </div>
      )}
    </div>
  );
}
