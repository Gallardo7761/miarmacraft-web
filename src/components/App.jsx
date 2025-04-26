import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import { ADMIN_ROLE } from "constants";
import Header from "./layout/Header";
import NavBar from "./layout/NavBar";
import Inicio from "./pages/Inicio";
import Sugerencias from "./pages/Sugerencias";
import Mods from "./pages/Mods";
import Jugadores from "./pages/Jugadores";

const App = () => {
    return (
        <>
            <Header />
            <NavBar />
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/sugerencias" element={
                    <ProtectedRoute>
                        <Sugerencias />
                    </ProtectedRoute>
                } />
                <Route path="/mods" element={
                    <ProtectedRoute>
                        <Mods />
                    </ProtectedRoute>
                } />
                <Route path="/jugadores" element={
                    <ProtectedRoute minimumRoles={[ADMIN_ROLE]}>
                        <Jugadores />
                    </ProtectedRoute>
                } />
            </Routes>
        </>
    );
}

export default App;