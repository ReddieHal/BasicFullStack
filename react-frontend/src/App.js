import { Routes, Route, Link, NavLink, useNavigate } from "react-router-dom";
import { Home } from "./Home";
import { Landing } from "./Landing";
import { Signup } from "./Signup";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { fakeAuth } from "./utils/FakeAuth";
import { useAuth, AuthProvider } from "./context/AuthProvider";
import React, { useState, useEffect, useContext } from "react";
import { Login } from "./Login";

export const AuthContext = React.createContext(null);

const App = () => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    return (
    <>
      <AuthProvider>
    <h1>React Router</h1>
        <Navigation />
        <Routes>
        <Route index element={<Home />} />
        <Route path="landing" element={<ProtectedRoute><Landing /></ProtectedRoute>} />
        <Route path="home" element={<Home />}/>
        <Route path="login" element={<Login />} />  
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </AuthProvider>
    </>
    );
};

const Navigation = () => {
  const navigate = useNavigate();
  const { value } = useAuth();

  const handleLogin = async () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    value.onLogout();
  };

  return (
    <nav>
      <Link to="/home">Home</Link>
      <NavLink to="/landing">Landing</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/signup">Signup</NavLink>
      {value.token ? (
     <button onClick={handleLogout}>Sign Out</button>
    ) : (
     <button onClick={handleLogin}>Sign In</button>
    )}
    </nav>
  
  )
};

export default App;