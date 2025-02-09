const CardButton = ({ key, color, text, onClick }) => {
    return (
        <button key={key} className={`btn btn-${color} mb-3 w-100`} onClick={onClick}>
            <span className="display-6">{text}</span>
        </button>
    );
}

export default CardButton;