import '../css/Footer.css';

const Footer = () => {
    return (
        <footer className="footer custom-footer row p-3 text-center border-top bg-dark">
            <div className="d-flex justify-content-center mb-2">
                <h6 className="m-0 p-0">
                    <a
                        rel="cc:attributionURL"
                        href="https://miarma.net/miarmacraft">MiarmaCraft</a> by <a
                    rel="cc:attributionURL dct:creator" 
                    href="https://miarma.net">miarma</a> is licensed under <a
                    href="https://creativecommons.org/licenses/by-nc-nd/4.0/?ref=chooser-v1" target="_blank"
                    rel="license noopener noreferrer" style={{ display: 'inline-block' }}>CC BY-NC-ND 4.0<img
                    style={{ height: '22px', marginLeft: '3px', verticalAlign: 'text-bottom' }}
                    src="images/icons/cc.svg" alt=""/><img
                    style={{ height: '22px', marginLeft: '3px', verticalAlign: 'text-bottom' }}
                    src="images/icons/by.svg" alt=""/><img
                    style={{ height: '22px', marginLeft: '3px', verticalAlign: 'text-bottom' }}
                    src="images/icons/nc.svg" alt=""/><img
                    style={{ height: '22px', marginLeft: '3px', verticalAlign: 'text-bottom' }}
                    src="images/icons/nd.svg" alt=""/></a>
                </h6>
            </div>
            <small className="m-0 p-0 text-muted">El dominio original de miarma.net es <strong
                style={{ color: 'tomato' }}>ÚNICO</strong> y es <strong style={{ color: 'tomato' }}>ESTE</strong>. No nos hacemos responsables de posibles copias
                malintencionadas.</small>
        </footer>
    );
}

export default Footer;
