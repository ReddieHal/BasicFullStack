import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useCookies } from "react-cookie";

export const ProtectedRoute = ({ children }) => {
  const [token, setToken] = useCookies("");
  if (token.token === undefined || token.token === "") {
    return <Navigate to="/home" replace />;
  }
  return children;
}; 

