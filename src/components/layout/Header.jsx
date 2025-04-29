import { useState } from 'react';
import { Container, Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import IfAuthenticated from '../auth/IfAuthenticated.jsx';
import IfNotAuthenticated from '../auth/IfNotAuthenticated.jsx';
import IfRole from '../auth/IfRole.jsx';
import { CONSTANTS } from '../../constants.js';
import { useAuth } from '../../hooks/useAuth.js';
import ProfilePicture from '../auth/ProfilePicture.jsx';

const Header = () => {
    const [open, setOpen] = useState(false);
    const { user, logout } = useAuth();

    const toggleMenu = () => setOpen(!open);
    const closeMenu = () => setOpen(false);

    const Menu =
    <svg
        className='pixel-icon big'
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24"
    >
        <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm16 5H4v2h16v-2z" fill="currentColor"/>
    </svg>;

    const Close = 
    <svg 
        className='pixel-icon big'
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24"
    > 
        <path d="M5 5h2v2H5V5zm4 4H7V7h2v2zm2 2H9V9h2v2zm2 0h-2v2H9v2H7v2H5v2h2v-2h2v-2h2v-2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2v-2zm2-2v2h-2V9h2zm2-2v2h-2V7h2zm0 0V5h2v2h-2z" fill="currentColor"/> 
    </svg>

    return (
        <header className="header position-relative glassmorphism sticky-top">
            <Container fluid className="d-flex justify-content-between align-items-center p-0">
                <div className="header-logo">MIARMACRAFT</div>
                <button
                    className="menu-toggle d-lg-none"
                    onClick={toggleMenu}
                    aria-controls="header-collapse"
                    aria-expanded={open}
                >
                    {open ? Close : Menu}
                </button>

                <nav className="header-nav d-none d-lg-flex gap-4 align-items-center">
                    <Link to="/" className='nav-link'>
                        INICIO
                    </Link>
                    <IfRole roles={[CONSTANTS.ADMIN_ROLE, CONSTANTS.PLAYER_ROLE]}>
                        <Link to="/mods" className='nav-link'>
                            MODS
                        </Link>
                    </IfRole>
                    <IfRole roles={[CONSTANTS.ADMIN_ROLE]}>
                        <Link to="/jugadores" className='nav-link'>
                            JUGADORES
                        </Link>
                    </IfRole>
                    <IfAuthenticated>
                        <ProfilePicture userName={user?.user_name} part="helm" />
                    </IfAuthenticated>
                    <IfNotAuthenticated>
                        <ProfilePicture userName="Steve" part="avatar" />
                    </IfNotAuthenticated>
                    <IfNotAuthenticated>
                        <Link to="/login">
                            <button className="minecraft-btn">
                                INICIAR SESION
                            </button>
                        </Link>
                    </IfNotAuthenticated>
                    <IfAuthenticated>
                        <button className="minecraft-btn danger" onClick={logout}>
                            CERRAR SESION
                        </button>
                    </IfAuthenticated>
                </nav>
            </Container>

            <Collapse in={open}>
                <div id="header-collapse" className="header-nav-mobile d-lg-none">
                    <Link to="/" className='nav-link' onClick={closeMenu}>
                        INICIO
                    </Link>
                    <IfRole roles={[CONSTANTS.ADMIN_ROLE, CONSTANTS.PLAYER_ROLE]}>
                        <Link to="/mods" className='nav-link' onClick={closeMenu}>
                            MODS
                        </Link>
                    </IfRole>
                    <IfRole roles={[CONSTANTS.ADMIN_ROLE]}>
                        <Link to="/jugadores" className='nav-link' onClick={closeMenu}>
                            JUGADORES
                        </Link>
                    </IfRole>
                    <IfNotAuthenticated>
                        <Link to="/login">
                            <button className="minecraft-btn" onClick={closeMenu}>
                                INICIAR SESION
                            </button>
                        </Link>
                    </IfNotAuthenticated>
                    <IfAuthenticated>
                        <button className="minecraft-btn danger" onClick={() => { logout(); closeMenu(); }}>
                            CERRAR SESION
                        </button>
                    </IfAuthenticated>
                </div>
            </Collapse>

        </header>
    );
}

export default Header;
