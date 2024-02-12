import { useAuth } from "./context/AuthProvider";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

// if going through google oauth, the user will be redirected to the /oath route
// otherwise, the user will be redirected to the /login route
// creating checking if a user exists and if not throwing an error
// if the user exists, then the user will be logged in and redirected to the /landing route
export const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useCookies("token", "");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const login = {username:username, pwd:password};
        const promise = await fetch("https://localhost:8000/account/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(login),
        });
       
        const response = await promise.json();
        const ourToken = response.token;
        
        setToken("token", ourToken);
        if (ourToken) {
            navigate("/landing");
        } else {
            alert("Login Failed");
        }
    };

    const oauthLogin = async (e) => {
        const promise = await fetch("https://localhost:8000/request", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const response = await promise.json();
        const url = response.url;
        console.log(url)
        window.location.href = url;
    };
    
    
    return (
        <>
        <h2>Login (Public)</h2>
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} required />
        <input 
            type="text"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} required /> 
        <button type="submit">Sign in</button>
        </form>
        <div className="centered-container"><button onClick={oauthLogin}>Or Login with Google</button></div>
        
        </>
    );
    }