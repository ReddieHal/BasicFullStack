import { useAuth } from "./context/AuthProvider";
import { useState } from "react";

export const Login = () => {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { value } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const login = {username:username, pwd:password};
        const promise = await fetch("http://localhost:8000/account/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(login),
        });
       
        const response = await promise;
        if (response.ok) {
            const token = await response.text();
            value.onLogin(token);
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