import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/login'
import SignUP from './pages/signUp'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUP />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App




