import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./layout/Header";
import Inicio from "./pages/Inicio";
import Sugerencias from "./pages/Sugerencias";
import Mods from "./pages/Mods";
import Jugadores from "./pages/Jugadores";
import Footer from "./layout/Footer";

const App = () => {
    const routesWithFooter = ["/"]
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/sugerencias" element={<Sugerencias />} />
                <Route path="/mods" element={<Mods />} />
                <Route path="/jugadores" element={<Jugadores />} />
            </Routes>
            {routesWithFooter.includes(useLocation().pathname) ? <Footer /> : null}
        </>
    );
}

export default App;
