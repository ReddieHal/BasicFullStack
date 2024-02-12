import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

export const RedirectToken = () => {
    const [token, setToken] = useCookies(["token"]);
    const navigate = useNavigate();

    useEffect(() => {
        const ourToken = new URLSearchParams(window.location.search).get("token");
        console.log("ourToken", ourToken);
        if (ourToken) {
            setToken("token", ourToken);
            navigate("/landing");
        }
    });
    navigate("/home");
    
    return null;
}