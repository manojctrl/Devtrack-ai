import { Route, Routes } from "react-router-dom"
import Landing from "../../Pages/Landing/Landing"
import { Login } from "../../Pages/Login/Login"
import Register from "../../Pages/Register/Register"

const AppRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register/>}/>
        
    </Routes>
  )
}

export default AppRouter