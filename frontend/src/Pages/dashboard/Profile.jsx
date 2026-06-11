import Navbar from "../../components/dashboard/Navbar";
import Sidebar from "../../components/dashboard/sidebar";
import ProfileLeft from "../../components/Profile/ProfileLeft";
import ProfileRight from "../../components/Profile/ProfileRight";

const Profile = () => {
  return (
    <div className="min-h-screen bg-[#111625] flex text-gray-100 font-sans">
      <Sidebar />
      
      <div className="flex-1 pl-64">
        <Navbar />
        
        <main className="p-8 pt-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            <div className="lg:col-span-1">
              <ProfileLeft />
            </div>
            
            <div className="lg:col-span-2">
              <ProfileRight />
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;