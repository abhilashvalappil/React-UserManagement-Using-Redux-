import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Dashboard from './pages/dashboard';
import { useSelector } from 'react-redux';
import './App.css';

function App() {
    // Safely access the user's role
    const userRole = useSelector((state) => state.auth.user?.user?.role || null);
    console.log(userRole, "=========");

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={!userRole ? <Login /> : userRole === "admin" ? <Navigate to="/dashboard" /> : <Navigate to="/" />}  />
            <Route path="/profile" element={userRole=="user"?<Profile />:<Navigate to="/dashboard" />} />
            <Route  path="/dashboard"  element={userRole ? <Dashboard /> : <Navigate to="/login" />}  />
        </Routes>
    );
}

export default App;
