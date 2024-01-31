import React from "react";
import { useAuth } from "./context/AuthProvider.js";
import { useCookies } from "react-cookie";

export const Landing = () => {
  const [token, setToken] = useCookies("");
  return (
    <>
      <h2>Landing (Protected)</h2>
      <div> Authenticated as {token.token}</div>
    </>
  );
};