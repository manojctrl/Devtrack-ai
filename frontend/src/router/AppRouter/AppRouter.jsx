import { Route, Routes } from "react-router-dom"
import Landing from "../../Pages/Landing/Landing"
import { Login } from "../../Pages/Login/Login"
import Dashboard from "../../Pages/dashboard/Dashboard"
import Profile from "../../Pages/dashboard/Profile"

const AppRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Login />}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route  path="/profile" element={<Profile />}/>
        
    </Routes>
  )
}

export default AppRouter