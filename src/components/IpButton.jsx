import { useState } from "react";
import CardButton from "./CardButton";

const IpButton = () => {
    const [buttonText, setButtonText] = useState("Copiar IP");

    const copyIP = () => {
        navigator.clipboard.writeText("miarma.net");
        setButtonText("¡IP Copiada!");

        setTimeout(() => {
            setButtonText("Copiar IP");
        }, 3000);
    };

    return (
        <CardButton 
            text={buttonText} 
            color="warning" 
            onClick={copyIP}
        />
    );
}

export default IpButton;
