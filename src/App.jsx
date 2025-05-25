import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/login'
import SignUp from './pages/SignUp'
import Admin from './pages/Admin'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/dashboard" element={<Admin />} />
    </Routes>

   
  )
}

export default App




