import React, { useEffect } from "react";
import { useAuth } from "./context/AuthProvider.js";
import { useCookies } from "react-cookie";
import "./user-table.css";
const queryParameters = new URLSearchParams(window.location.search);
const google_token = queryParameters.get("token");


export const Landing = () => {
  const [token, setToken] = useCookies("");
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);


  useEffect(() => {
    const getUsers = async () => {
      const promise = await fetch("https://localhost:8000/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token.token}`,
        },
      });
      const response = await promise.json();
      if (response.detail === "Invalid token") {
        alert("Invalid token");
        return;
      }
      setUsers(response);
      setLoading(false);
    };
    getUsers();
  }, []);

  console.log(users);
  

  return (
    <>
      <h2>Landing (Protected)</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="user-table">
          <thead>
          <tr>
          <th colSpan="2">Potential Contacts</th>
          </tr>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.username}</td>
              </tr>
            ))}
          </tbody>
        </table>)}
      <div> Authenticated as {token.token}</div>
    </>
  );
};