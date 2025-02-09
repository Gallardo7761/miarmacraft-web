const Card = ({ title, description, children }) => {
    return (
        <article className="card col-lg-3 mb-5 mx-4 shadow border-0 p-0">
            <div className="card-header text-center header-bg-2">
                <h2 className="m-0"><strong>{title}</strong></h2>
            </div>
            <div className="card-body d-flex flex-column">
                <h3 className="mb-4 flex-grow-1">{description}</h3>
                <div className="mt-auto m-0 p-0">
                    {children}
                </div>
            </div>
        </article>
    );
};

export default Card;
