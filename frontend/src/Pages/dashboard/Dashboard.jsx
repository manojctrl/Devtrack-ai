import Sidebar from "../../components/dashboard/sidebar";
import Navbar from "../../components/dashboard/Navbar";
import WelcomHero from "../../components/dashboard/WelcomHero";
import StatesFlex from "../../components/dashboard/StatesFlex";
import Heatmap from "../../components/dashboard/Heatmap";
import SkillsAiInsigts from "../../components/dashboard/SkillsAiInsigts";
import ActivityAndProjects from "../../components/dashboard/ActivityAndProjects";
import LearningRoadMapAndRecentActivity from "../../components/dashboard/LearningRoadMapAndRecentActivity";
import DeveloperLevelAndQuickActions from "../../components/dashboard/DeveloperLevelAndQuickActions";


const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111625] flex text-slate-800 dark:text-gray-100 font-sans transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 pl-64">
        
        <Navbar />
        
        <main className="p-8 pt-24 max-w-7xl mx-auto space-y-8">
          <WelcomHero />
          <StatesFlex />
          <Heatmap />
          <SkillsAiInsigts />
          <ActivityAndProjects />
          <LearningRoadMapAndRecentActivity />
          <DeveloperLevelAndQuickActions />
       
          
        </main>

      </div>
    </div>
  );
};

export default Dashboard;
