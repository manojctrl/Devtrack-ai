import Sidebar from "../../components/dashboard/sidebar";
import Navbar from "../../components/dashboard/Navbar";

const Dashboard = () => {
  return (
    <div className=" min-h-screen bg-[#111625] flex text-gray-100 font-sans">
      <Sidebar />
      <Navbar/>
    </div>
  );
};

export default Dashboard;
