import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";

export const Home = () => { 
  const {value} = useAuth();
  return (
    <>
      <h2>Home (Public)</h2>
      <div> Authenticated as {value.token}</div>
      {/* <button type="button" onClick={value.onLogin}>
        Sign In
      </button> */}
  </>
);
};
  
  