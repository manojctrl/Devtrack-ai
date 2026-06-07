import React, { useState } from "react";
import { Flame } from "lucide-react"; 

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS   = ["", "Mon", "", "Wed", "", "Fri", ""];

// 52 Weeks * 7 Days ko realistic static data array matrix
const STATIC_WEEK_DATA = [
  [0, 1, 0, 2, 1, 3, 0], [1, 2, 3, 0, 2, 4, 1], [2, 0, 1, 2, 3, 0, 0], [4, 3, 2, 1, 2, 0, 0], // Jan
  [1, 2, 0, 3, 4, 2, 1], [0, 1, 2, 2, 3, 4, 0], [2, 3, 4, 1, 0, 2, 1], [4, 4, 3, 2, 1, 0, 0], // Feb
  [0, 0, 1, 2, 3, 2, 1], [2, 3, 1, 0, 4, 3, 0], [4, 2, 3, 1, 2, 4, 1], [1, 2, 0, 3, 4, 0, 0], // Mar
  [2, 3, 4, 1, 0, 2, 1], [0, 1, 2, 3, 4, 2, 0], [1, 2, 3, 4, 3, 1, 1], [4, 3, 2, 1, 0, 2, 0], // Apr
  [3, 4, 4, 3, 2, 1, 0], [1, 2, 3, 0, 2, 4, 1], [0, 1, 2, 2, 3, 4, 0], [2, 3, 4, 1, 0, 2, 1], // May
  [4, 4, 3, 4, 4, 3, 2], [3, 4, 4, 3, 4, 4, 1], [4, 3, 4, 4, 3, 4, 0], [4, 4, 4, 3, 4, 4, 2], // Jun (Best Month: High Intensity)
  [2, 3, 1, 0, 2, 1, 0], [0, 1, 2, 3, 1, 2, 0], [1, 2, 0, 2, 3, 1, 1], [3, 2, 1, 0, 1, 2, 0], // Jul
  [0, 1, 2, 3, 4, 2, 1], [2, 3, 1, 0, 2, 4, 0], [4, 2, 3, 1, 2, 3, 1], [1, 2, 0, 3, 4, 0, 0], // Aug
  [2, 3, 4, 1, 0, 2, 1], [0, 1, 2, 3, 4, 2, 0], [1, 2, 3, 4, 3, 1, 1], [4, 3, 2, 1, 0, 2, 0], // Sep
  [1, 2, 0, 3, 4, 2, 1], [0, 1, 2, 2, 3, 4, 0], [2, 3, 4, 1, 0, 2, 1], [4, 4, 3, 2, 1, 0, 0], // Oct
  [0, 0, 1, 2, 3, 2, 1], [2, 3, 1, 0, 4, 3, 0], [4, 2, 3, 1, 2, 4, 1], [1, 2, 0, 3, 4, 0, 0], // Nov
  [2, 3, 4, 1, 0, 2, 1], [0, 1, 2, 3, 4, 2, 0], [1, 2, 3, 4, 3, 1, 1], [4, 3, 2, 1, 0, 2, 0]  // Dec
];

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
  
  // Total contributions static real numeric calculate (Level * 3 commits factor standard pattern mapping)
  const totalContributions = 1605; 
  const monthLabels = getMonthLabels();
  
  const CELL = 11; 
  const GAP  = 3;
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

      {/* Scrollable Heatmap Graph */}
      <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-800/80">
        <div className="min-w-[760px] flex flex-col justify-center">
          <svg
            width={(STEP * 53) + 32}
            height={(STEP * 7) + 20}
            className="mx-auto select-none"
          >
            {/* Month dynamic labels */}
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

            {/* Y-Axis Day labels */}
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

            {/* Render Static Matrix Elements */}
            {STATIC_WEEK_DATA.map((week, wi) =>
              week.map((level, di) => {
                const x = 32 + (wi * STEP);
                const y = 16 + (di * STEP);
                const col = COLORS[level];
                // Static custom dynamic calculation to display realistic commits inside tooltip trigger
                const commitsCount = level === 0 ? 0 : level === 1 ? 2 : level === 2 ? 5 : level === 3 ? 9 : 14;
                
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
                    className="cursor-pointer transition-colors duration-150"
                    onMouseEnter={(e) => {
                      e.currentTarget.setAttribute("fill", "#ffffff");
                      setTooltip({ x: e.clientX, y: e.clientY, count: commitsCount });
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.setAttribute("fill", col.bg);
                      setTooltip(null);
                    }}
                  />
                );
              })
            )}
          </svg>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-between items-center mt-3 pt-4 border-t border-gray-800/60 text-xs text-gray-400">
        <div className="flex items-center gap-1.5 select-none">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((l) => (
            <div 
              key={l} 
              className="w-[11px] h-[11px] rounded-[2px]" 
              style={{
                background: COLORS[l].bg,
                border: `0.5px solid ${COLORS[l].border}`
              }} 
            />
          ))}
          <span>More</span>
        </div>
        <span className="font-mono text-gray-500">2024</span>
      </div>

      {/* Bottom Metrics Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-gray-800/60">
        {[
          { val: "14", color: "text-emerald-400", label: "day streak" },
          { val: "1,605", color: "text-gray-200", label: "total contributions" },
          { val: "6", color: "text-gray-200", label: "days/week avg" },
          { val: "Jun", color: "text-indigo-400", label: "best month" },
        ].map(({ val, color, label }) => (
          <div key={label} className="bg-[#222b45]/30 p-3 rounded-xl border border-gray-800/30 text-center sm:text-left">
            <div className={`text-xl font-bold font-mono tracking-tight ${color}`}>{val}</div>
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Tooltip Component */}
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
