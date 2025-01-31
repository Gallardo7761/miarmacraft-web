import '../css/StatusBar.css';

const StatusBar = () => {
    return (
        <div className="col-12 barra-superior text-light bg-dark py-1 px-1 text-start">
            <img id="favicon" src="" width="24px" height="24px"/>
            <span id="status" className="ms-3"><i
                className="fa-solid fa-circle me-1 fa-fade text-danger"></i> Offline</span>
            <span id="players" className="ms-3"><i
                className="fa-solid fa-user me-1 text-light"></i> 0/0</span>
            <span id="version" className="ms-3"><i
                className="fa-solid fa-cog me-1 text-light"></i> Desconocida</span>
        </div>
    )
}

export default StatusBar;