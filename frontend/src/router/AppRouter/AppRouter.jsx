import { Route, Routes } from "react-router-dom"
import Landing from "../../Pages/Landing/Landing"
import { Login } from "../../Pages/Login/Login"
import Dashboard from "../../Pages/dashboard/Dashboard"
import Profile from "../../Pages/dashboard/Profile"
import GitHubAnalytics from "../../Pages/dashboard/GitHubAnalytics"
import Skills from "../../Pages/dashboard/Skills"
import Resume from "../../Pages/dashboard/Resume"

const AppRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Login />}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route  path="/profile" element={<Profile />}/>
        <Route path="/github-analytics" element={<GitHubAnalytics />}/> 
        <Route path="/skills" element={<Skills />} />
        <Route path="/resume" element={<Resume />}/>

        
    </Routes>
  )
}

export default AppRouter