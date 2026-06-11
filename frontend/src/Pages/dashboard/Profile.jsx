import Navbar from "../../components/dashboard/Navbar"
import Sidebar from "../../components/dashboard/sidebar"

const Profile = () => {
  return (
        <div className=" min-h-screen bg-[#111625] flex text-gray-100 font-sans">
            <Sidebar />
                  <div className="flex-1 pl-64">
                    <Navbar />
</div>

            </div>

  )
}

export default Profile