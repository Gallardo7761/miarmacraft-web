import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./layout/Header";
import Inicio from "./pages/Inicio";
import Sugerencias from "./pages/Sugerencias";
import Mods from "./pages/Mods";
import Jugadores from "./pages/Jugadores";
import Footer from "./layout/Footer";
import Login from "./pages/Login";

const App = () => {
    const location = useLocation().pathname.replace(import.meta.env.BASE_URL, '/');
    const routesWithFooter = ["/", "/login"]
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/sugerencias" element={<Sugerencias />} />
                <Route path="/mods" element={<Mods />} />
                <Route path="/jugadores" element={<Jugadores />} />
                <Route path="/login" element={<Login />} />
                <Route path="/privacidad" element={null} />
            </Routes>
            {routesWithFooter.includes(location) ? <Footer /> : null}
        </>
    );
}

export default App;
