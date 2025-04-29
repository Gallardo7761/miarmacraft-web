import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className={`minecraft-footer`}>
    <div className="footer-content">
      <p>© 2025 <a href="https://miarma.net/">miarma.net</a> | Todos los derechos reservados.</p>
      <div className="footer-links">
        <Link to="/privacidad" className="minecraft-btn">
          Politica de Privacidad
        </Link>
      </div>
    </div>
  </footer>
);

Footer.propTypes = {
  sticky: PropTypes.bool,
};

export default Footer;
