import { SiMoneygram } from "react-icons/si";
import { SiWebmoney } from "react-icons/si";
import { useNavigate, Link } from 'react-router-dom';
import { topupWalletRequest } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { useState} from "react";


function Topup() {
    const [money, setMoney] = useState(0);
    const user = useSelector((state) => state.auth.profile?.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleTopup = (e) => {
        e.preventDefault();
        const body = {
            amount: money,
            memberId: user.id,
        }
        topupWalletRequest(body, dispatch, navigate);
    }

    return (
        <div class="col-lg-8 mx-auto p-4 py-md-5">
            <header class="d-flex align-items-center pb-3 mb-5 border-bottom">
                <a href="/" class="d-flex align-items-center text-body-emphasis text-decoration-none">
                    <svg class="bi" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
                    <h2 class="text-body-emphasis fw-bold"><SiMoneygram /> Top-Up Wallet</h2>
                </a>
            </header>

            <main>
                <div className="row g-5">
                    {/* Slider */}
                    <div className="col-md-5 col-lg-4 order-md-last">
                        <div id="carouselExampleInterval" className="carousel slide w-50" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active" data-bs-interval="2000">
                                    <img src="https://image.pitchbook.com/NnFfxhDvWjAmuagDUXWkynzPILY1636639243171_200x200" className="d-block w-100 rounded" alt="..." />
                                </div>
                                <div className="carousel-item" data-bs-interval="2000">
                                    <img src="https://warburgpincus.com/wp-content/uploads/2018/10/MoMo_logo-1.png" className="d-block w-100 rounded" alt="..." />
                                </div>
                                <div className="carousel-item" data-bs-interval="2000">
                                    <img src="https://th.bing.com/th/id/R.d201a5b0e53d870fa436d64438b00621?rik=x54aoJ6P6TkufQ&pid=ImgRaw&r=0" className="d-block w-100 rounded" alt="..." />
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>

                    {/* Input */}
                    <div className="col-md-7 col-lg-8">
                        <div class="form-floating">
                            <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                                <option></option>
                                <option value="1" selected>VNPay</option>
                                <option value="2">MoMo (Updating)</option>
                                <option value="3">Visa Card (Updating)</option>
                            </select>
                            <label for="floatingSelect">Top-up Method</label>
                        </div>
                        <form class="card p-3 mt-4">
                            <div class="input-group">
                                <span class="input-group-text">$</span>
                                <input type="number" class="form-control" placeholder="Enter Money Here" onChange={(e) => setMoney(e.target.value)}/>
                                <button type="submit" class="btn btn-outline-danger" onClick={handleTopup}>Top-up</button>
                            </div>
                        </form>
                    </div>
                </div>

                <hr class="col-3 col-md-2 mb-5" />

                <div class="row g-5">
                    <div class="col-md-12">
                        <h2 class="text-body-emphasis"><SiWebmoney /> History Transaction</h2>
                        <div className="card mt-4">
                            <div className="card-body">
                                <ul className="list-group list-group-flush rounded-3" style={{ height: '210px', maxHeight: '210px', overflowY: 'auto' }}>
                                    <li className="list-group-item justify-content-between align-items-center p-3">
                                        <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                            <div class="d-flex gap-2 w-100 justify-content-between row">
                                                <div className="col-sm-5">
                                                    <h6 className="mb-0">Auction #10 - End date: 12/3/2024</h6>
                                                </div>
                                                <div className='col-sm-4'>Winner: hahaha</div>
                                                <div className="col-sm-2">
                                                    <Link to='/'>View Detail</Link>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="list-group-item justify-content-between align-items-center p-3">
                                        <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                            <div class="d-flex gap-2 w-100 justify-content-between row">
                                                <div className="col-sm-5">
                                                    <h6 className="mb-0">Auction #10 - End date: 12/3/2024</h6>
                                                </div>
                                                <div className='col-sm-4'>Winner: hahaha</div>
                                                <div className="col-sm-2">
                                                    <Link to='/'>View Detail</Link>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="list-group-item justify-content-between align-items-center p-3">
                                        <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                            <div class="d-flex gap-2 w-100 justify-content-between row">
                                                <div className="col-sm-5">
                                                    <h6 className="mb-0">Auction #10 - End date: 12/3/2024</h6>
                                                </div>
                                                <div className='col-sm-4'>Winner: hahaha</div>
                                                <div className="col-sm-2">
                                                    <Link to='/'>View Detail</Link>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="list-group-item justify-content-between align-items-center p-3 auction">
                                        <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                            <img src="https://github.com/twbs.png" alt="twbs" width="32" height="32" class="rounded-circle flex-shrink-0" />
                                            <div class="d-flex gap-2 w-100 justify-content-between">
                                                <div>
                                                    <h6 class="mb-0">Third heading</h6>
                                                    <p class="mb-0 opacity-75">Some placeholder content in a paragraph.</p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Topup