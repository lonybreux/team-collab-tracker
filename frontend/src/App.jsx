import { Navigate, Route, Routes } from "react-router-dom"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"


export const App = () => {
  
  return (
    <Routes>
      <Route path="/" element={<Navigate to={'/login'} replace></Navigate>}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
    </Routes>
  )
}