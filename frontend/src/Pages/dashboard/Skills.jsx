import Navbar from "../../components/dashboard/Navbar";
import Sidebar from "../../components/dashboard/sidebar";
import AIRecommendations from "../../components/Skill/AIRecommendations";
import LearningRoadmap from "../../components/Skill/LearningRoadmap";
import PieChart from "../../components/Skill/PieChart";
import SkillCategories from "../../components/Skill/SkillCategories";
import SkillOverview from "../../components/Skill/SkillOverview";
import SkillProficiency from "../../components/Skill/SkillProficiency";
import TechnologyRadar from "../../components/Skill/TechnologyRadar";

const Skills = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111625] flex text-slate-800 dark:text-gray-100 font-sans transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 pl-64">
        <Navbar />
        <main className="p-8 pt-24 max-w-7xl mx-auto space-y-8">
          <SkillOverview />
           <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2">
              <SkillProficiency />
            </div>
            <div className="lg:col-span-3">
              <PieChart />
            </div>
          </div>
          <SkillCategories />
          <TechnologyRadar />
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2">
              <LearningRoadmap />
            </div>
            <div className="lg:col-span-3">
              <AIRecommendations />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Skills;
