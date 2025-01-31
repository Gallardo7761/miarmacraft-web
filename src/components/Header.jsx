import StatusBar from "./StatusBar.jsx";
import '../css/Header.css';

const Header = (props) => {
    return (
        <header id="header" className="row">
            <StatusBar />
            <div className="col-12 p-4 header-bg-2 text-center position-relative">
                <a href="/"><img src={"images/"+props.src} className="img-fluid col-lg-6 col-xxl-4" alt=""/></a>
            </div>
        </header>

    )
}

export default Header;