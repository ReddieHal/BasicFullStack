import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";
import { useCookies } from "react-cookie";

export const Home = () => { 
  const {value} = useAuth();
  const [token, setToken] = useCookies("");
  return (
    <>
      <h2>Home (Public)</h2>
      <div> Authenticated as {token.token}</div>
      {/* <button type="button" onClick={value.onLogin}>
        Sign In
      </button> */}
  </>
);
};
  
  