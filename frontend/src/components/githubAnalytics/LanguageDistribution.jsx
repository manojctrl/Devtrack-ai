import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { IconChartPie } from '@tabler/icons-react';

const data = [
  { name: 'JavaScript', value: 45, color: '#818CF8' },
  { name: 'TypeScript', value: 25, color: '#34D399' },
  { name: 'Java', value: 20, color: '#FCD34D' },
  { name: 'HTML/CSS', value: 10, color: '#C084FC' },
];

const LanguageDistribution = () => {
  return (
    <div className="bg-[#1a2035] rounded-xl p-6 border border-slate-800 flex flex-col h-[380px] shadow-lg">
      <div className="flex items-center gap-2 text-sm font-semibold uppercase text-gray-400 mb-5">
        <IconChartPie className="w-4 h-4 text-indigo-400" />
        <span>Language Distribution</span>
      </div>

      <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="w-[240px] h-[240px] relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#111625',
                  borderColor: '#334155',
                  borderRadius: '8px',
                  color: '#f3f4f6',
                  fontSize: '12px',
                }}
              />
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute text-center">
            <span className="text-3xl font-bold text-gray-100">{data.length}</span>
            <span className="text-[11px] font-medium uppercase tracking-wider text-gray-400 block">
              Languages
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full md:w-auto">
          {data.map((entry, index) => (
            <div
              key={index}
              className="flex items-center gap-3 text-sm text-gray-300"
            >
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="font-medium">{entry.name}</span>
              <span className="ml-auto text-gray-400 font-mono text-xs">
                {entry.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageDistribution;
