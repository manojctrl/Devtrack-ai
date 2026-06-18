import { useState, useEffect } from "react";
import Navbar from "../../components/dashboard/Navbar";
import Sidebar from "../../components/dashboard/sidebar";
import ProfileLeft from "../../components/Profile/ProfileLeft";
import ProfileRight from "../../components/Profile/ProfileRight";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  const [githubData, setGithubData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const ghRes = await API.get("/github/data");
        setGithubData(ghRes.data);
      } catch (err) {
        console.warn("No GitHub stats found for profile page:", err);
        setGithubData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user?.githubUsername]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111625] flex text-slate-800 dark:text-gray-100 font-sans transition-colors duration-300">
      <Sidebar />
      
      <div className="flex-1 pl-64">
        <Navbar />
        
        <main className="p-8 pt-24 max-w-7xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
              <p className="text-xs text-slate-500 font-mono">Loading profile details...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              
              <div className="lg:col-span-1">
                <ProfileLeft githubProfile={githubData?.profile} />
              </div>
              
              <div className="lg:col-span-2">
                <ProfileRight githubProfile={githubData?.profile} repos={githubData?.repos} />
              </div>

            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;