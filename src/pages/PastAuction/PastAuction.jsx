
function PastAuction() {

    return (
        <div className="container px-4 py-5" id="hanging-icons">
            <h2 className="pb-2 border-bottom fw-bold">Auction History</h2>
            <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
                <div className="col d-flex align-items-start">
                    <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
                        <svg className="bi" width="1em" height="1em">
                            <use xlinkHref="#tools"></use>
                        </svg>
                    </div>
                    <div>
                        <h4>Auction #1</h4>
                        <p>
                            21/03/2023, 9:00 AM - 22/03/2023, 10:00 PM <br />
                            <span className="fw-bold">Variation: Karasugoi</span>
                        </p>
                        <a href="#" className="btn btn-outline-info">
                            View Detail
                        </a>
                    </div>
                </div>
                <div className="col d-flex align-items-start">
                    <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
                        <svg className="bi" width="1em" height="1em">
                            <use xlinkHref="#cpu-fill"></use>
                        </svg>
                    </div>
                    <div>
                        <h4>Auction #2</h4>
                        <p>
                            15/05/2023, 9:00 AM - 17/05/2023, 10:00 PM <br />
                            <span className="fw-bold">Variation: Kin Showa</span>
                        </p>
                        <a href="#" className="btn btn-outline-info">
                            View Detail
                        </a>
                    </div>
                </div>
                <div className="col d-flex align-items-start">
                    <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
                        <svg className="bi" width="1em" height="1em">
                            <use xlinkHref="#toggles2"></use>
                        </svg>
                    </div>
                    <div>
                        <h4>Lunar New Year Auction</h4>
                        <p>
                            13/02/2024, 9:00 AM - 14/02/2024, 10:00 PM <br />
                            <span className="fw-bold">Variation: Kigoi</span>
                        </p>
                        <a href="#" className="btn btn-outline-info">
                            View Detail
                        </a>
                    </div>
                </div>
                <div className="col d-flex align-items-start">
                    <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
                        <svg className="bi" width="1em" height="1em">
                            <use xlinkHref="#tools"></use>
                        </svg>
                    </div>
                    <div>
                        <h4>Auction #4</h4>
                        <p>
                            21/03/2023, 9:00 AM - 22/03/2023, 10:00 PM <br />
                            <span className="fw-bold">Variation: Karasugoi</span>
                        </p>
                        <a href="#" className="btn btn-outline-info">
                            View Detail
                        </a>
                    </div>
                </div>
                <div className="col d-flex align-items-start">
                    <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
                        <svg className="bi" width="1em" height="1em">
                            <use xlinkHref="#cpu-fill"></use>
                        </svg>
                    </div>
                    <div>
                        <h4>Auction #5</h4>
                        <p>
                            15/05/2023, 9:00 AM - 17/05/2023, 10:00 PM <br />
                            <span className="fw-bold">Variation: Kin Showa</span>
                        </p>
                        <a href="#" className="btn btn-outline-info">
                            View Detail
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PastAuction