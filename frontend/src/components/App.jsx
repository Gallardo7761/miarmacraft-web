import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./layout/Header";
import Inicio from "../pages/Inicio";
import Mods from "../pages/Mods";
import Jugadores from "../pages/Jugadores";
import Footer from "./layout/Footer";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import ProtectedRoute from "./auth/ProtectedRoute";
import { CONSTANTS } from "@/util/constants";
import useSessionRenewal from "@/hooks/useSessionRenewal";

const App = () => {
    const location = useLocation().pathname.replace(import.meta.env.BASE_URL, '/');
    const routesWithFooter = ["/", "/login"]
    const { modal: renewalModal } = useSessionRenewal();
    
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/mods" element={
                    <ProtectedRoute minimumRoles={[CONSTANTS.ADMIN_ROLE, CONSTANTS.DEV_ROLE, CONSTANTS.PLAYER_ROLE]}>
                        <Mods />
                    </ProtectedRoute>
                } />
                <Route path="/jugadores" element={
                    <ProtectedRoute minimumRoles={[CONSTANTS.ADMIN_ROLE, CONSTANTS.DEV_ROLE]}>
                        <Jugadores />
                    </ProtectedRoute>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/perfil" element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                } />
                <Route path="/privacidad" element={null} />
            </Routes>
            {routesWithFooter.includes(location) ? <Footer /> : null}
            {renewalModal}
        </>
    );
}

export default App;
