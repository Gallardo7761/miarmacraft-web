import '../css/CookiePopup.css';
import { useState, useEffect } from "react";

const CookiePopup = () => {
    const getCookie = (name) => {
        const cookies = document.cookie.split("; ").find(cookie => cookie.startsWith(name + "="));
        return cookies ? cookies.split("=")[1] : null;
    };

    const [cookieAccepted, setCookieAccepted] = useState(getCookie("cookieConsent") === "true");

    useEffect(() => {
        const cookieElement = document.getElementById("cookieElement");
        if (cookieAccepted) {
            cookieElement.style.display = "none";
        } else {
            cookieElement.style.display = "flex";
        }
    }, [cookieAccepted]);

    const acceptCookie = () => {
        const d = new Date();
        d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 días
        document.cookie = `cookieConsent=true; expires=${d.toUTCString()}; path=/; secure; samesite=strict; domain=miarma.net;`;
        
        setCookieAccepted(true);
    };

    return (
        <div id="cookieElement" className="cookie justify-content-between align-items-center" style={{ display: cookieAccepted ? 'none' : 'flex' }}>
            <p className="m-0">🍪 Al navegar por nuestro sitio aceptas nuestras cookies.</p>
            <button id="cookieAccept" className="btn btn-success" onClick={acceptCookie}>Aceptar</button>
        </div>
    );
}

export default CookiePopup;
