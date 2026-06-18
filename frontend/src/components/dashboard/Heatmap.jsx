import { useState, useMemo } from "react";
import { Flame } from "lucide-react";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["", "Mon", "", "Wed", "", "Fri", ""];

const COLORS = {
  0: { bg: "#161b22", border: "#21262d" },
  1: { bg: "#0e4429", border: "#145e39" },
  2: { bg: "#006d32", border: "#008a3e" },
  3: { bg: "#26a641", border: "#2fbd4d" },
  4: { bg: "#39d353", border: "#45e861" },
};

export default function ContributionHeatmap({ profile }) {
  const [selectedYear, setSelectedYear] = useState("lastYear");
  const [tooltip, setTooltip] = useState(null);

  // Extract unique years from the contribution heatmap dates
  const years = useMemo(() => {
    const heatmap = profile?.contributionHeatmap || {};
    const yearSet = new Set();
    Object.keys(heatmap).forEach(dateStr => {
      const yr = dateStr.split("-")[0];
      if (yr && yr.length === 4) {
        yearSet.add(yr);
      }
    });
    // Ensure current year is always included
    yearSet.add(new Date().getFullYear().toString());
    return Array.from(yearSet).sort((a, b) => b - a);
  }, [profile]);

  const { grid, totalContributions, currentStreak, bestMonth, monthLabels, weeksCount } = useMemo(() => {
    const heatmap = profile?.contributionHeatmap || {};
    let start;
    let weeks = 53;

    if (selectedYear === "lastYear") {
      const today = new Date();
      start = new Date(today);
      start.setDate(today.getDate() - 364); // 52 weeks * 7 days
      // Align to Sunday
      const dayOfWeek = start.getDay();
      start.setDate(start.getDate() - dayOfWeek);
    } else {
      const yr = parseInt(selectedYear, 10);
      // Start on Jan 1 of that year
      start = new Date(yr, 0, 1);
      // Align to Sunday
      const dayOfWeek = start.getDay();
      start.setDate(start.getDate() - dayOfWeek);
      
      // End on Dec 31 of that year
      const end = new Date(yr, 11, 31);
      
      // Calculate weeks to render
      const diffMs = end - start;
      const diffDays = Math.ceil(diffMs / 86400000);
      weeks = Math.ceil(diffDays / 7);
    }

    const tempGrid = [];
    let totalConts = 0;
    const monthCounts = {};
    const labels = [];
    let prevMonth = -1;

    for (let w = 0; w < weeks; w++) {
      const week = [];
      for (let d = 0; d < 7; d++) {
        const currentDate = new Date(start);
        currentDate.setDate(start.getDate() + w * 7 + d);
        const dateStr = currentDate.toISOString().split("T")[0];
        
        // Filter: only get count if it matches the selected year, or if it is "lastYear"
        let count = 0;
        if (selectedYear === "lastYear" || currentDate.getFullYear() === parseInt(selectedYear, 10)) {
          count = heatmap[dateStr] || 0;
        }

        totalConts += count;

        let level = 0;
        if (count > 0 && count <= 2) level = 1;
        else if (count > 2 && count <= 5) level = 2;
        else if (count > 5 && count <= 10) level = 3;
        else if (count > 10) level = 4;

        week.push({
          date: dateStr,
          count,
          level,
        });

        // Track month labels
        const m = currentDate.getMonth();
        if (d === 0 && m !== prevMonth) {
          labels.push({ weekIdx: w, name: MONTHS[m] });
          prevMonth = m;
        }

        // Aggregate month counts
        if (selectedYear === "lastYear" || currentDate.getFullYear() === parseInt(selectedYear, 10)) {
          const monthName = MONTHS[m];
          monthCounts[monthName] = (monthCounts[monthName] || 0) + count;
        }
      }
      tempGrid.push(week);
    }

    // Calculate Streak based on full history relative to today
    let streak = 0;
    const today = new Date();
    const checkDate = new Date(today);
    while (true) {
      const dateStr = checkDate.toISOString().split("T")[0];
      if (heatmap[dateStr] && heatmap[dateStr] > 0) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        if (checkDate.toDateString() === today.toDateString()) {
          checkDate.setDate(checkDate.getDate() - 1);
          continue;
        }
        break;
      }
    }

    // Best Month
    let bestM = "N/A";
    let maxMonthVal = 0;
    Object.entries(monthCounts).forEach(([m, val]) => {
      if (val > maxMonthVal) {
        maxMonthVal = val;
        bestM = m;
      }
    });

    return {
      grid: tempGrid,
      totalContributions: totalConts,
      currentStreak: streak,
      bestMonth: bestM,
      monthLabels: labels,
      weeksCount: weeks
    };
  }, [profile, selectedYear]);

  const CELL = 11;
  const GAP = 3;
  const STEP = CELL + GAP;

  return (
    <div className="w-full bg-[#1a2035] border border-gray-800/60 p-6 rounded-2xl shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <div className="text-left">
          <div className="text-gray-100 text-base font-bold flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
            Coding Consistency
          </div>
          <div className="text-gray-400 text-xs mt-0.5">
            {totalContributions.toLocaleString()} contributions {selectedYear === "lastYear" ? "in the last year" : `in ${selectedYear}`}
          </div>
        </div>

        {/* Year Pills Filter */}
        {years.length > 0 && (
          <div className="flex flex-wrap items-center gap-1 bg-slate-900/50 p-1 rounded-xl border border-slate-800/80 self-start sm:self-center">
            <button
              onClick={() => setSelectedYear("lastYear")}
              className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition cursor-pointer ${
                selectedYear === "lastYear"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-650/15"
                  : "text-slate-450 hover:text-slate-200"
              }`}
            >
              Last 1 Year
            </button>
            {years.map((yr) => (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr)}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition cursor-pointer ${
                  selectedYear === yr
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-650/15"
                    : "text-slate-455 hover:text-slate-205 text-slate-450 hover:text-slate-200"
                }`}
              >
                {yr}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-800/80">
        <div className="min-w-[760px] flex flex-col justify-center">
          <svg
            width={STEP * weeksCount + 32}
            height={STEP * 7 + 20}
            className="mx-auto select-none"
          >
            {monthLabels.map(({ weekIdx, name }) => (
              <text
                key={`${name}-${weekIdx}`}
                x={32 + weekIdx * STEP}
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
                y={18 + i * STEP + CELL / 2 + 2}
                fill="#6b7280"
                fontSize={9}
                fontWeight={500}
                fontFamily="sans-serif"
              >
                {day}
              </text>
            ))}

            {grid.map((week, wi) =>
              week.map((cell, di) => {
                const x = 32 + wi * STEP;
                const y = 16 + di * STEP;
                const col = COLORS[cell.level];

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
                      setTooltip({ x: e.clientX, y: e.clientY, count: cell.count, date: cell.date });
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

      <div className="flex justify-between items-center mt-3 pt-4 border-t border-gray-800/60 text-xs text-gray-400">
        <div className="flex items-center gap-1.5 select-none">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((l) => (
            <div
              key={l}
              className="w-[11px] h-[11px] rounded-[2px]"
              style={{
                background: COLORS[l].bg,
                border: `0.5px solid ${COLORS[l].border}`,
              }}
            />
          ))}
          <span>More</span>
        </div>
        <span className="font-mono text-gray-500">{selectedYear === "lastYear" ? new Date().getFullYear() : selectedYear}</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-gray-800/60">
        {[
          { val: `${currentStreak} days`, color: "text-emerald-400", label: "current streak" },
          { val: totalContributions.toLocaleString(), color: "text-gray-200", label: "total contributions" },
          { val: `${(totalContributions / (weeksCount || 52)).toFixed(1)}/wk`, color: "text-gray-200", label: "weekly average" },
          { val: bestMonth, color: "text-indigo-400", label: "best month" },
        ].map(({ val, color, label }) => (
          <div key={label} className="bg-[#222b45]/30 p-3 rounded-xl border border-gray-800/30 text-center sm:text-left">
            <div className={`text-xl font-bold font-mono tracking-tight ${color}`}>{val}</div>
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {tooltip && (
        <div
          className="fixed bg-[#222b45] border border-gray-700 shadow-xl rounded-lg px-2.5 py-1.5 text-xs text-gray-200 pointer-events-none z-[9999] whitespace-nowrap font-medium"
          style={{ left: tooltip.x + 12, top: tooltip.y - 40 }}
        >
          {tooltip.count === 0 ? "No contributions" : `${tooltip.count} contributions`} on {tooltip.date}
        </div>
      )}
    </div>
  );
}
