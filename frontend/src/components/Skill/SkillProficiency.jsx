import { IconAdjustmentsHorizontal } from '@tabler/icons-react';

export const skillsData = [
  { name: 'Java', score: 90, level: 'Advanced', label: 'Expert', grad: 'from-[#6366F1] to-[#818CF8]', text: 'text-[#818CF8]', badge: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
  { name: 'React', score: 80, level: 'Advanced', label: 'Proficient', grad: 'from-[#0EA5E9] to-[#38BDF8]', text: 'text-[#38BDF8]', badge: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
  { name: 'MySQL', score: 80, level: 'Advanced', label: 'Proficient', grad: 'from-[#10B981] to-[#34D399]', text: 'text-[#34D399]', badge: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
  { name: 'Node.js', score: 70, level: 'Intermediate', label: 'Growing', grad: 'from-[#F59E0B] to-[#FCD34D]', text: 'text-[#FCD34D]', badge: 'text-amber-400 border-amber-500/30 bg-amber-500/8' },
  { name: 'Express.js', score: 60, level: 'Intermediate', label: 'Learning', grad: 'from-[#A855F7] to-[#C084FC]', text: 'text-[#C084FC]', badge: 'text-amber-400 border-amber-500/30 bg-amber-500/8' },
  { name: 'Spring Boot', score: 55, level: 'Intermediate', label: 'Growing', grad: 'from-[#F43F5E] to-[#F87171]', text: 'text-[#F87171]', badge: 'text-amber-400 border-amber-500/30 bg-amber-500/8' },
];

const SkillProficiency = () => {
  return (
    <div className="bg-[#1a2035] rounded-xl p-6 border border-slate-800 flex flex-col h-[400px] shadow-md w-full justify-between">
      <div className="flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-gray-400">
        <IconAdjustmentsHorizontal className="w-4 h-4 text-indigo-400" />
        <span>Skill Proficiency</span>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-3.5 mt-2">
        {skillsData.map((skill, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-100 tracking-wide">{skill.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded border ${skill.badge}`}>
                  {skill.level}
                </span>
              </div>
              <span className={`font-mono font-bold ${skill.text}`}>{skill.score}%</span>
            </div>

            <div className="w-full h-5 bg-[#111625]/80 rounded-md overflow-hidden p-[2px] border border-slate-800/40">
              <div 
                className={`h-full rounded-[4px] bg-gradient-to-r ${skill.grad} flex items-center pl-2 transition-all duration-500`}
                style={{ width: `${skill.score}%` }}
              >
                <span className="text-[9px] font-black uppercase tracking-wider text-white/90 drop-shadow-sm">
                  {skill.label}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillProficiency;