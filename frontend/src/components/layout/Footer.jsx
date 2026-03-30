import PropTypes from "prop-types";

const Footer = () => (
  <footer className={`minecraft-footer py-5`}>
    <div className="footer-content">
      <p>© 2025 <a href="https://miarma.net/">miarma.net</a> | Todos los derechos reservados.</p>
      <div className="footer-links">
        <a href="/privacy.txt" className="minecraft-btn">
          Politica de Privacidad
        </a>
      </div>
    </div>
  </footer>
);

Footer.propTypes = {
  sticky: PropTypes.bool,
};

export default Footer;
