import { Route, Routes } from "react-router-dom"
import Landing from "../../Pages/Landing/Landing"
import { Login } from "../../Pages/Login/Login"

const AppRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Login />}/>
        
    </Routes>
  )
}

export default AppRouter