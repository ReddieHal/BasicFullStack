import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === password2) {
            const promise = await fetch("https://localhost:8000/account/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username:username, pwd:password}),
            });
            const response = await promise;

            if (response.ok) {
                alert("Account Created");
                navigate("/login")
            } else if (response.status === 401 && response.body === "Bad Password") {
                alert("Bad Password\nPassword must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number");
            } else if (response.status === 401 && response.body === "User Exists") {
                alert("User Already Exists!");
            } else {
                alert("Account Creation Failed");
            }
        } else {
            alert("Passwords Don't Match");
        }
    }
    return (
        <>
        <h2>Signup (Public)</h2>
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
        <input 
            type="text"
            placeholder="re-enter password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)} required /> 
        <button type="submit">Sign up</button>
        </form>
        </>
    );
    }