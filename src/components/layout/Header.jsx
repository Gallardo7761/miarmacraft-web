import { useState } from 'react';
import { Container, Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import IfAuthenticated from '@/components/auth/IfAuthenticated.jsx';
import IfNotAuthenticated from '@/components/auth/IfNotAuthenticated.jsx';
import IfRole from '@/components/auth/IfRole.jsx';
import { CONSTANTS } from '@/constants.js';
import { useAuth } from '@/hooks/useAuth.js';
import ProfilePicture from '@/components/auth/ProfilePicture.jsx';
import Icons from '@/icons.jsx';

const Header = () => {
    const [open, setOpen] = useState(false);
    const { user, logout } = useAuth();

    const toggleMenu = () => setOpen(!open);
    const closeMenu = () => setOpen(false);

    return (
        <header className="header position-relative glassmorphism sticky-top">
            <Container fluid className="d-flex justify-content-between align-items-center p-0">
                <div className="header-logo">
                    <img
                        src={`${import.meta.env.BASE_URL}images/miarmacraft.svg`}
                        className="img-fluid"
                        style={{ maxHeight: '60px' }}
                    />
                </div>
                <button
                    className="menu-toggle d-lg-none"
                    onClick={toggleMenu}
                    aria-controls="header-collapse"
                    aria-expanded={open}
                >
                    {open ? Icons.Close : Icons.Menu}
                </button>

                <nav className="header-nav d-none d-lg-flex gap-4 align-items-center">
                    <Link to="" className='nav-link'>
                        <div className='align-items-center d-flex gap-2'>
                            {Icons.Home}
                            INICIO
                        </div>
                    </Link>
                    <IfRole roles={[CONSTANTS.ADMIN_ROLE, CONSTANTS.PLAYER_ROLE]}>
                        <Link to="mods" className='nav-link'>
                            <div className='align-items-center d-flex gap-2'>
                                {Icons.AddGrid}
                                MODS
                            </div>
                        </Link>
                    </IfRole>
                    <IfRole roles={[CONSTANTS.ADMIN_ROLE]}>
                        <Link to="jugadores" className='nav-link'>
                            <div className='align-items-center d-flex gap-2'>
                                {Icons.Users}
                                JUGADORES
                            </div>
                        </Link>
                    </IfRole>
                    <IfAuthenticated>
                        <ProfilePicture userName={user?.user_name} part="helm" />
                    </IfAuthenticated>
                    <IfNotAuthenticated>
                        <ProfilePicture userName="Steve" part="avatar" />
                    </IfNotAuthenticated>
                    <IfNotAuthenticated>
                        <Link to="login">
                            <button className="minecraft-btn">
                                <div className='align-items-center d-flex gap-2'>
                                    {Icons.Login}
                                    INICIAR SESION
                                </div>
                            </button>
                        </Link>
                    </IfNotAuthenticated>
                    <IfAuthenticated>
                        <button className="minecraft-btn danger" onClick={logout}>
                            <div className='align-items-center d-flex gap-2'>
                                {Icons.Logout}
                                CERRAR SESION
                            </div>
                        </button>
                    </IfAuthenticated>
                </nav>
            </Container>

            <Collapse in={open}>
                <div id="header-collapse" className="header-nav-mobile d-lg-none">
                    <Link to="" className='nav-link mt-4' onClick={closeMenu}>
                        <div className='align-items-center d-flex gap-2'>
                            {Icons.Home}
                            INICIO
                        </div>
                    </Link>
                    <IfRole roles={[CONSTANTS.ADMIN_ROLE, CONSTANTS.PLAYER_ROLE]}>
                        <Link to="mods" className='nav-link mt-4' onClick={closeMenu}>
                            <div className='align-items-center d-flex gap-2'>
                                {Icons.AddGrid}
                                MODS
                            </div>
                        </Link>
                    </IfRole>
                    <IfRole roles={[CONSTANTS.ADMIN_ROLE]}>
                        <Link to="jugadores" className='nav-link mt-4' onClick={closeMenu}>
                            <div className='align-items-center d-flex gap-2'>
                                {Icons.Users}
                                JUGADORES
                            </div>
                        </Link>
                    </IfRole>
                    <IfNotAuthenticated>
                        <Link to="login">
                            <button className="minecraft-btn mt-4" onClick={closeMenu}>
                                <div className='align-items-center d-flex gap-2'>
                                    {Icons.Login}
                                    INICIAR SESION
                                </div>
                            </button>
                        </Link>
                    </IfNotAuthenticated>
                    <IfAuthenticated>
                        <button className="minecraft-btn danger mt-4" onClick={() => { logout(); closeMenu(); }}>
                            <div className='align-items-center d-flex gap-2'>
                                {Icons.Logout}
                                CERRAR SESION
                            </div>
                        </button>
                    </IfAuthenticated>
                </div>
            </Collapse>

        </header>
    );
}

export default Header;
