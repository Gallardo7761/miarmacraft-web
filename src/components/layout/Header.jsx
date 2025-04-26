import { useState } from 'react';
import { Container, Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../css/Header.css';

const Header = () => {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => setOpen(!open);
    const closeMenu = () => setOpen(false);

    return (
        <header className="header position-relative glassmorphism sticky-top">
            <Container fluid className="d-flex justify-content-between align-items-center p-0">
                <div className="header-logo">MIARMACRAFT</div>
                {/**<a href="/miarmacraft/">
                    <img src="/miarmacraft/images/title.png" className="img-fluid col-lg-4" alt="" />
                </a> */}
                <button
                    className="menu-toggle d-lg-none"
                    onClick={toggleMenu}
                    aria-controls="header-collapse"
                    aria-expanded={open}
                >
                    {open ? '✖' : '☰'}
                </button>

                <nav className="header-nav d-none d-lg-flex gap-4 align-items-center">
                    <Link to="/" className='nav-link'>
                        INICIO
                    </Link>
                    <Link to="/sugerencias" className='nav-link'>
                        SUGERENCIAS
                    </Link>
                    <Link to="/mods" className='nav-link'>
                        MODS
                    </Link>
                    <Link to="/jugadores" className='nav-link'>
                        JUGADORES
                    </Link>
                    <Link to="/login">
                        <button disabled className="minecraft-btn">
                            INICIAR SESION
                        </button>
                    </Link>
                </nav>
            </Container>

            <Collapse in={open}>
                <div id="header-collapse" className="header-nav-mobile d-lg-none">
                    <Link to="/" className='nav-link'>
                        INICIO
                    </Link>
                    <Link to="/sugerencias" onClick={closeMenu} className='nav-link'>
                        SUGERENCIAS
                    </Link>
                    <Link to="/mods" onClick={closeMenu} className='nav-link'>
                        MODS
                    </Link>
                    <Link to="/jugadores" onClick={closeMenu} className='nav-link'>
                        JUGADORES
                    </Link>
                    <Link to="/login" onClick={closeMenu}>
                        <button disabled className="minecraft-btn mt-2">
                            INICIAR SESION
                        </button>
                    </Link>
                </div>
            </Collapse>

        </header>
    );
}

export default Header;
