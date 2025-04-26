import { Route, Routes } from "react-router-dom";
import Header from "./layout/Header";
import Inicio from "./pages/Inicio";
import Sugerencias from "./pages/Sugerencias";
import Mods from "./pages/Mods";
import Jugadores from "./pages/Jugadores";
import Test from "./pages/Test";

const App = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/sugerencias" element={<Sugerencias />} />
                <Route path="/mods" element={<Mods />} />
                <Route path="/jugadores" element={<Jugadores />} />
                <Route path="/test" element={<Test />} />
            </Routes>
        </>
    );
}

export default App;
