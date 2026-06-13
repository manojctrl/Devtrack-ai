import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { IconChartBar } from '@tabler/icons-react';
import { skillsData } from './SkillProficiency'; 

const chartData = skillsData.map(item => ({
  name: item.name,
  score: item.score,
  color: item.name === 'Java' ? '#818CF8' :
         item.name === 'React' ? '#38BDF8' :
         item.name === 'MySQL' ? '#34D399' :
         item.name === 'Node.js' ? '#FCD34D' :
         item.name === 'Express.js' ? '#C084FC' : '#F87171'
}));

const PieChart = () => {
  return (
    <div className="bg-[#1a2035] rounded-xl p-6 border border-slate-800 flex flex-col h-[400px] shadow-md w-full justify-between">
      {/* Title */}
      <div className="flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-gray-400">
        <IconChartBar className="w-4 h-4 text-indigo-400" />
        <span>Skill Strength Chart</span>
      </div>

      {/* Bar Chart Container */}
      <div className="w-full h-[280px] pr-2 pt-4">
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
              tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
              dy={8}
            />

            <YAxis 
              domain={[0, 100]} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 11, fontMono: true }}
              tickCount={6}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: '#111625',
                borderColor: '#334155',
                borderRadius: '8px',
                color: '#f3f4f6',
                fontSize: '12px'
              }}
              cursor={{ fill: 'rgba(255,255,255,0.02)' }}
            />

            <Bar dataKey="score" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChart;