import Sidebar from "../../components/dashboard/sidebar";
import Navbar from "../../components/dashboard/Navbar";
import WelcomHero from "../../components/dashboard/WelcomHero";
import StatesFlex from "../../components/dashboard/StatesFlex";
import Heatmap from "../../components/dashboard/Heatmap";

const Dashboard = () => {
  return (
    <div className=" min-h-screen bg-[#111625] flex text-gray-100 font-sans">
      <Sidebar />
      <div className="flex-1 pl-64">
        
        <Navbar />
        
        <main className="p-8 pt-24 max-w-7xl mx-auto space-y-8">
          <WelcomHero />
          <StatesFlex />
          <Heatmap />
          
          
        </main>

      </div>
    </div>
  );
};

export default Dashboard;
