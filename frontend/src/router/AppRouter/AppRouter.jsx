import { Route, Routes } from "react-router-dom"
import Landing from "../../Pages/Landing/Landing"
import { Login } from "../../Pages/Login/Login"
import Dashboard from "../../Pages/dashboard/Dashboard"

const AppRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Login />}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        
    </Routes>
  )
}

export default AppRouter