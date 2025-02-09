import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { sessionManager } from "../util/session.js";
import '../css/Nav.css';

const Nav = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (sessionManager.isLogged()) {
            setUser(sessionManager.getLoggedUser());
        }
    }, []);

    const handleLogout = () => {
        sessionManager.logout();
        document.cookie = "loggedUser=; path=/; domain=miarma.net; max-age=0; secure;";
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-md sticky-top border-bottom bg-dark">
            <div className="container-fluid d-flex justify-content-between">
                <Link className="navbar-brand ms-1 d-flex align-items-center" to="/perfil">
                    <img 
                        src={user ? `https://mineskin.eu/helm/${user.username}/40.png?v=${Date.now()}` : "https://mineskin.eu/avatar/Steve/40.png?v=${Date.now()}"}
                        width="40" height="40" className="d-inline-block m-0 p-0" alt="Perfil" 
                    />
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapse">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="navbar-collapse collapse" id="collapse">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                <i className="fa-solid fa-house me-2"></i>Inicio
                            </Link>
                        </li>

                        {user && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/feedback">
                                    <i className="fa-solid fa-comments me-2"></i>Feedback
                                </Link>
                            </li>
                        )}

                        {user?.rol === "admin" && (
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" data-bs-toggle="dropdown">
                                    <i className="fa-solid fa-gear me-2"></i>Gestión
                                </Link>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" to="/usuarios">
                                            <i className="fa-solid fa-users me-2"></i>Gestionar usuarios
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        )}

                        <li className="nav-item">
                            <a className="nav-link" href="https://miarma.net/miarmacraft/ayuda/">
                                <i className="fa-solid fa-question-circle me-2"></i>Ayuda
                            </a>
                        </li>
                    </ul>

                    {user ? (
                        <button className="btn btn-danger" onClick={handleLogout}>
                            <i className="fa-solid fa-sign-out me-2"></i>Cerrar sesión
                        </button>
                    ) : null}
                </div>
            </div>
        </nav>
    );
};

export default Nav;
