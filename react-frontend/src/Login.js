import { useAuth } from "./context/AuthProvider";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

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
        
        </>
    );
    }