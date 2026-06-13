import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { IconChartLine } from '@tabler/icons-react';

const data = [
  { name: 'Jan', commits: 45 },
  { name: 'Feb', commits: 120 },
  { name: 'Mar', commits: 75 },
  { name: 'Apr', commits: 210 },
  { name: 'May', commits: 145 },
  { name: 'Jun', commits: 185 },
];

const CommitActivity = () => {
  return (
    <div className="bg-[#1a2035] rounded-xl p-6 border border-slate-800 flex flex-col gap-4 shadow-md w-full">
      <div className="flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-gray-400">
        <IconChartLine className="w-4 h-4 text-indigo-400" />
        <span>Commit Activity</span>
      </div>

      <div className="w-full h-[220px] pr-2 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>

              <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6366F1" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
              </linearGradient>
            </defs>

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
              tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
              dy={10}
            />

            <YAxis 
              domain={[0, 220]} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 11, fontMono: true }}
              tickCount={5}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: '#111625',
                borderColor: '#334155',
                borderRadius: '8px',
                color: '#f3f4f6',
                fontSize: '12px'
              }}
              labelStyle={{ color: '#94a3b8', fontWeight: 600 }}
              cursor={{ stroke: '#475569', strokeWidth: 1, strokeDasharray: '4 4' }}
            />

            <Area
              type="monotone" 
              dataKey="commits"
              stroke="url(#lineGrad)"
              strokeWidth={2.5}
              fill="url(#areaGrad)"
              activeDot={{ r: 5, stroke: '#1a2035', strokeWidth: 2, fill: '#818CF8' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CommitActivity;