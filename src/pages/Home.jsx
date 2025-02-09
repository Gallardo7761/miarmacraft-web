import { useEffect } from "react";
import Card from "../components/Card";
import CookiePopup from "../components/CookiePopup";
import CardButton from "../components/CardButton";
import IpButton from "../components/IpButton";

const Home = () => {
    useEffect(() => {
        const copyIP = () => {
            navigator.clipboard.writeText("miarma.net");
            alert("IP copiada: miarma.net");
        };

        document.getElementById("copy-ip")?.addEventListener("click", copyIP);
        return () => document.getElementById("copy-ip")?.removeEventListener("click", copyIP);
    }, []);

    return (
        <div className="container-fluid body-img m-0 p-0">
            <main className="row p-0 m-0">
                <section className="col-sm-12 row text-center mt-5 mb-5 ms-0 p-0">
                    <h1 className="display-5 shadowed p-0">¿Cómo entro al server? 🤔</h1>
                </section>
                <section className="row justify-content-center mb-5">
                    <Card title="Paso 1: Descargar" description="Tienes dos opciones para descargar el Launcher:">
                        <CardButton text="Comprar Minecraft" color="primary" onClick={() => window.open("https://www.minecraft.net/es-es/store/minecraft-java-edition")} />
                        <CardButton text="Descargar SKLauncher" color="outline-danger" onClick={() => alert("Descarga de SKLauncher")} />
                    </Card>
                    <Card
                        title="Paso 2: Configurar"
                        description={
                            <>
                                Asegúrate de que tu PC cumple con los <a href="https://www.minecraft.net/es-es/store/minecraft-deluxe-collection-pc#accordionv1-4686892541-item-f61b04d998:~:text=Requisitos%20M%C3%ADnimos%3A-,MINECRAFT%3A%20REQUISITOS%20DEL%20SISTEMA%20DE%20JAVA%20EDITION,-Minecraft%3A%20requisitos%20del">requisitos</a> de Minecraft y <a href="ram_tutorial.html">asigna más memoria</a> al juego.
                            </>
                        }
                    />
                    <Card 
                        title="Paso 3: Conectar" 
                        description={
                            <>
                                Añade la IP del server:
                                <ul style={{ fontSize: "1.2rem" }}>
                                    <li>Escríbela a mano: <i>miarma.net</i></li>
                                    <li>Cópiala en el botón de abajo!</li>
                                </ul>
                                <small className="text-muted" style={{ fontSize: "1rem", lineHeight: "0.1" }}>
                                    Ten en cuenta que el servidor es <strong style={{ color: "tomato" }}>SOLO</strong> <u>Java Edition</u> por el momento
                                </small>
                            </>
                        }
                    >
                        <IpButton />
                    </Card>

                </section>
                <section className="col-sm-12 row justify-content-center ms-0 p-0 ">
                    <article className="col-sm-3 mx-4 p-3 m-0">
                        <blockquote className="blockquote">
                            <p style={{ color: "white" }}>
                                <cite>"Just bootleg it. If you still like it and can afford it in the future, buy it then. Of course, don't forget to feel bad about it."</cite>
                            </p>
                            <footer className="blockquote-footer" style={{ color: "#b9b9b9" }}>Notch, creador de Minecraft.</footer>
                        </blockquote>
                    </article>
                </section>
                <CookiePopup />
            </main>
        </div>
    );
};

export default Home;
