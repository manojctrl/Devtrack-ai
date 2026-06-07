import React, { useState } from 'react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS   = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

// Generate 52 weeks × 7 days of dummy contribution data
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

// GitHub green color stops
const COLORS = {
  0: { bg: '#161b22', border: '#1e2430' },
  1: { bg: '#0e4429', border: '#145e39' },
  2: { bg: '#006d32', border: '#008a3e' },
  3: { bg: '#26a641', border: '#2fbd4d' },
  4: { bg: '#39d353', border: '#45e861' },
};

function getMonthLabels() {
  const labels = [];
  // Place month label at the first week of each month (approx 4-5 weeks apart)
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
  const CELL = 13;
  const GAP  = 3;
  const STEP = CELL + GAP;

  return (
    <div style={{
      background: '#0d1117',
      border: '1px solid #30363d',
      borderRadius: 12,
      padding: '20px 24px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      display: 'inline-block',
      minWidth: 720,
    }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <div style={{ color: '#e6edf3', fontSize: 15, fontWeight: 600, marginBottom: 3 }}>
            🔥 Coding Consistency
          </div>
          <div style={{ color: '#7d8590', fontSize: 12, fontFamily: 'monospace' }}>
            {totalContributions} contributions in 2024
          </div>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 7,
          padding: '5px 13px', borderRadius: 20,
          background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)',
          fontSize: 12, fontWeight: 600, color: '#3fb950',
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%', background: '#3fb950',
            boxShadow: '0 0 7px #3fb950',
            animation: 'pulse 2s infinite',
          }} />
          Active
        </div>
      </div>

      {/* Graph */}
      <div style={{ overflowX: 'auto' }}>
        <svg
          width={STEP * 53 + 28}
          height={STEP * 7 + 26}
          style={{ display: 'block' }}
        >
          {/* Month labels */}
          {monthLabels.map(({ weekIdx, name }) => (
            <text
              key={name}
              x={28 + weekIdx * STEP}
              y={10}
              fill="#7d8590"
              fontSize={11}
              fontFamily="-apple-system, sans-serif"
            >
              {name}
            </text>
          ))}

          {/* Day labels */}
          {DAYS.map((day, i) => (
            <text
              key={i}
              x={0}
              y={22 + i * STEP + CELL / 2 + 3}
              fill="#7d8590"
              fontSize={10}
              fontFamily="-apple-system, sans-serif"
              textAnchor="start"
            >
              {day}
            </text>
          ))}

          {/* Cells */}
          {WEEK_DATA.map((week, wi) =>
            week.map((level, di) => {
              const x = 28 + wi * STEP;
              const y = 16 + di * STEP;
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
                  style={{ cursor: 'pointer', transition: 'all 0.1s' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.setAttribute('opacity', '0.8');
                    setTooltip({
                      x: e.clientX,
                      y: e.clientY,
                      level,
                      count: level * 3,
                    });
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.setAttribute('opacity', '1');
                    setTooltip(null);
                  }}
                />
              );
            })
          )}
        </svg>
      </div>

      {/* Legend + total */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginTop: 12, paddingTop: 12, borderTop: '1px solid #21262d',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#7d8590' }}>
          <span>Less</span>
          {[0, 1, 2, 3, 4].map(l => (
            <div key={l} style={{
              width: 11, height: 11, borderRadius: 2,
              background: COLORS[l].bg, border: `0.5px solid ${COLORS[l].border}`,
            }} />
          ))}
          <span>More</span>
        </div>
        <span style={{ fontSize: 11, color: '#7d8590', fontFamily: 'monospace' }}>
          2024
        </span>
      </div>

      {/* Bottom stats */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 0, marginTop: 16, paddingTop: 16, borderTop: '1px solid #21262d',
      }}>
        {[
          { val: '14',  color: '#3fb950', label: 'day streak'          },
          { val: '182', color: '#e6edf3', label: 'total contributions'  },
          { val: '6',   color: '#e6edf3', label: 'days/week avg'        },
          { val: 'Jun', color: '#818cf8', label: 'best month'           },
        ].map(({ val, color, label }) => (
          <div key={label}>
            <div style={{ fontSize: 20, fontWeight: 700, color, fontFamily: 'monospace', marginBottom: 3 }}>
              {val}
            </div>
            <div style={{ fontSize: 11, color: '#7d8590', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div style={{
          position: 'fixed',
          left: tooltip.x + 12,
          top: tooltip.y - 36,
          background: '#1c2128',
          border: '1px solid #30363d',
          borderRadius: 6,
          padding: '5px 10px',
          fontSize: 12,
          color: '#e6edf3',
          pointerEvents: 'none',
          zIndex: 9999,
          whiteSpace: 'nowrap',
          fontFamily: '-apple-system, sans-serif',
        }}>
          {tooltip.count === 0
            ? 'No contributions'
            : `${tooltip.count} contributions`}
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}