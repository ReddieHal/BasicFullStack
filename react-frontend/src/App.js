import { Routes, Route, Link, NavLink, useNavigate } from "react-router-dom";
import { Home } from "./Home";
import { Landing } from "./Landing";
import { Signup } from "./Signup";
import { RedirectToken } from "./utils/RedirectToken";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { fakeAuth } from "./utils/FakeAuth";
import { useAuth, AuthProvider } from "./context/AuthProvider";
import React, { useState, useEffect, useContext } from "react";
import { Login } from "./Login";
import { useCookies } from "react-cookie";

export const AuthContext = React.createContext(null);

const App = () => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useCookies(["token"]);
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
        <Route path="redirect" element={<RedirectToken />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </AuthProvider>
    </>
    );
};

const Navigation = () => {
  const navigate = useNavigate();
  const [token, setToken] = useCookies(["token"]);

  const handleLogin = async () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    setToken("token", "");
  };

  return (
    <nav>
      <Link to="/home">Home</Link>
      <NavLink to="/landing">Landing</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/signup">Signup</NavLink>
      {token.token ? (
     <button onClick={handleLogout}>Sign Out</button>
    ) : (
     <button onClick={handleLogin}>Sign In</button>
    )}
    </nav>
  
  )
};

export default App;