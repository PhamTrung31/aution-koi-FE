import './AuctionView.css'
import { Link } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'bootstrap';

function AuctionView({ auctionType }) {
    return (
        <body>
            {auctionType === 1 ? (
                <IncreasingAuction />
            ) : auctionType === 2 ? (
                <AnonymousAuction />
            ) : auctionType === 3 ? (
                <BuyOutAuction />
            ) : (
                <div>Page Not Found!</div>
            )}
        </body>
    )
}

const IncreasingAuction = () => {
    const [buyOut, setBuyOut] = useState(6000000);
    const [highestBid, setHighestBid] = useState(3000000);    
    const [incre, setIncre] = useState(200000);
    const [step, setStep] = useState(1);
    const [bid, setBid] = useState(highestBid + incre*step);
    const [autoBid, setAutoBid] = useState(0);
    const [maxBid, setMaxBid] = useState(0);

    const [timerDays, setTimerDays] = useState('00');
    const [timerHours, setTimerHours] = useState('00');
    const [timerMinutes, setTimerMinutes] = useState('00');
    const [timerSeconds, setTimerSeconds] = useState('00');

    let interval = useRef();

    const startTimer = () => {
        const countdownDate = new Date('10/16/2024 00:00:00').getTime();

        interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                //stop our timer
                clearInterval(interval.current);
            } else {
                // update timer
                setTimerDays(days);
                setTimerHours(hours);
                setTimerMinutes(minutes);
                setTimerSeconds(seconds);
            }
        }, 1000)
    };

    useEffect(() => {
        startTimer();
        return () => {
            clearInterval(interval.current);
        }
    })

    const handleAutoBid = (e) => {
        e.preventDefault();
        if (autoBid === 0) setAutoBid(1)
        else setAutoBid(0)
        setBid(highestBid + highestBid * 0.1)
    }


    return (
        <div className="container" style={{ marginBottom: '28.5px' }}>
            <main>
                <div className="py-5 text-center">
                    <h2>Auction's Time Left:</h2>
                    <p className="lead mb-4 fs-1">
                        {timerDays < 1 ? timerDays + ' day' : timerDays + ' days'} {timerHours < 10 ? '0' + timerHours : timerHours}
                        :{timerMinutes < 10 ? '0' + timerMinutes : timerMinutes}
                        :{timerSeconds < 10 ? '0' + timerSeconds : timerSeconds}
                    </p>
                </div>

                <div className="row g-5">
                    <div className="col-md-5 col-lg-4 order-md-last">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-primary">Leaderboard</span>
                            <span className="badge bg-primary rounded-pill">3</span>
                        </h4>

                        {/* Leaderboard */}
                        <ul className="list-group list-group-flush mb-3 leaderboard" style={{ maxHeight: '320px', overflowY: 'auto' }}>
                            <li className="list-group-item d-flex justify-content-between lh-sm" >
                                <div>
                                    <h6 className="my-0">User #5</h6>
                                    <small className="text-body-secondary">30 minutes ago</small>
                                </div>
                                <span>{highestBid} vnd</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between lh-sm">
                                <div>
                                    <h6 className="my-0">User #8</h6>
                                    <small className="text-body-secondary">2 hours ago</small>
                                </div>
                                <span className="text-body-secondary">2500000 vnd</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between lh-sm">
                                <div>
                                    <h6 className="my-0">User #3</h6>
                                    <small className="text-body-secondary">1 day ago</small>
                                </div>
                                <span className="text-body-secondary">2000000 vnd</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between lh-sm">
                                <div>
                                    <h6 className="my-0">User #3</h6>
                                    <small className="text-body-secondary">1 day ago</small>
                                </div>
                                <span className="text-body-secondary">1500000 vnd</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between lh-sm">
                                <div>
                                    <h6 className="my-0">User #3</h6>
                                    <small className="text-body-secondary">1 day ago</small>
                                </div>
                                <span className="text-body-secondary">1000000 vnd</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between lh-sm">
                                <div>
                                    <h6 className="my-0">User #3</h6>
                                    <small className="text-body-secondary">1 day ago</small>
                                </div>
                                <span className="text-body-secondary">500000 vnd</span>
                            </li>
                        </ul>

                        <div type="button" className="p-2 btn btn-outline-success btn-lg w-100">
                            <div><span className='fw-bold'>Buy Out</span>: {buyOut} vnd</div>
                        </div><br />
                        <hr className="my-4" />

                        {/* Bid Area */}
                        <div>
                            <h4 className="mt-4">Auction's Increment: <span className='text-danger'>{incre}</span> vnd</h4>
                            <form className="needs-validation" noValidate>
                                <div className="row g-3">
                                    {autoBid === 0 ? (
                                        <> {/* Manual Bid */}
                                            <div className="col-md-6 form-floating mt-4">
                                                <div className="form-floating">
                                                    <input
                                                        type="number"
                                                        className="form-control rounded-3"
                                                        id="floatingBid"
                                                        placeholder="name@example.com"
                                                        value={bid}
                                                        onChange={e => { setBid(e.target.value) }}
                                                        onClick={() => setIncre(0)}
                                                    />
                                                    <label for="floatingBid" >Your Bid ( vnd )</label>
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <label for="floatingBid">Step</label>
                                                {/* <select
                                                    className="form-select"
                                                    id="form-label"
                                                    value={incre}
                                                    required
                                                    onChange={(e) => {
                                                        setBid(highestBid + highestBid * e.target.value)
                                                        setIncre(e.target.value)
                                                    }}>
                                                    <option value={0}> </option>
                                                    <option value={0.1}>10%</option>
                                                    <option value={0.2}>20%</option>
                                                    <option value={0.5}>50%</option>
                                                </select> */}
                                                <input
                                                    type="number"
                                                    className="form-control rounded-3"
                                                    id="floatingBid"
                                                    value={step}
                                                    onChange={(e) => {
                                                        setStep(e.target.value);
                                                        setBid(highestBid + incre * e.target.value)
                                                    }}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <button className='btn btn-danger w-100' onClick={handleAutoBid}>Auto Bid</button>
                                            </div>

                                            <hr className="my-4" />

                                            <button className="w-100 btn btn-success btn-lg" type="submit">
                                                Continue to bid
                                            </button>
                                        </>
                                    ) : (
                                        <>  {/* Auto Bid */}
                                            <div className="col-md-8 form-floating mt-4">
                                                <div className="form-floating">
                                                    <input
                                                        type="number"
                                                        className="form-control rounded-3 text-secondary"
                                                        id="floatingBid"
                                                        placeholder="name@example.com"
                                                        value={bid}
                                                    />
                                                    <label for="floatingBid">Your Bid ( vnd ) - View Only</label>
                                                </div>
                                            </div>

                                            <div className="col-md-5">
                                                <button className='btn btn-warning w-100' onClick={handleAutoBid}> Cancel Auto Bid</button>
                                            </div>

                                            <div className='col-md-7'></div>

                                            <div className="col-md-6 form-floating">
                                                <div className="form-floating">
                                                    <input
                                                        type="number"
                                                        className="form-control rounded-3"
                                                        id="floatingInput"
                                                        placeholder="name@example.com"
                                                        onChange={e => setMaxBid(e.target.value)}
                                                    />
                                                    <label for="floatingInput">Maximum ( vnd )</label>
                                                </div>
                                            </div>

                                            <div className="col-md-4 mt-2">
                                                <label for="form-label">Increment</label>
                                                <select className="form-select" id="form-label" required onChange={(e) => setBid(highestBid + highestBid * e.target.value)}>
                                                    <option value={0.1}>10%</option>
                                                    <option value={0.2}>20%</option>
                                                    <option value={0.5}>50%</option>
                                                </select>
                                            </div>

                                            <hr className="my-4" />

                                            <button className="w-100 btn btn-success btn-lg" type="submit">
                                                Start Auto Bid
                                            </button>
                                        </>
                                    )}

                                </div>


                            </form>
                        </div>

                    </div>
                    <div className="col-md-7 col-lg-8">
                        <div className="container py-4">

                            <div className="row align-items-md-stretch mb-5">
                                <div className="col-md-6"> {/* Koi Image */}
                                    <div className="h-100 w-100 p-5 rounded-3 koi-image shadow"
                                        style={{
                                            backgroundImage: 'url(https://gatwickkoi.com/wp-content/uploads/2023/10/A1048-1-scaled.jpg)',
                                            backgroundSize: '50%', /* Thu nhỏ hình nền còn 50% kích thước gốc */
                                            backgroundPosition: 'center', // Canh giữa ảnh
                                            backgroundRepeat: 'no-repeat',
                                            backgroundColor: '#069CF1'
                                        }}
                                    >
                                        <img src="https://www.whatkoi.com/wp-content/uploads/2020/03/Dainichi-Koi-Farm.jpg"
                                            alt="twbs"
                                            width="100"
                                            height="100"
                                            class="rounded-circle flex-shrink-0"
                                            style={{
                                                objectFit: 'cover'
                                            }}
                                        />
                                        <br />
                                        <span className='fs-2 fw-bold'> Showa</span>
                                    </div>
                                </div>
                                <div className="col-md-6"> {/* Koi Information */}
                                    <div className="h-100 p-5 rounded-3 bg-transparent">
                                        <div class="list-group shadow">
                                            <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                                <img src="https://static.thenounproject.com/png/935874-200.png" alt="twbs" width="32" height="32" class="rounded-circle flex-shrink-0" />
                                                <div class="d-flex gap-2 w-100 justify-content-between">
                                                    <div>
                                                        <h6 class="mb-0">Variety</h6>
                                                        <p class="mb-0 opacity-75">Some placeholder</p>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                                <img src="https://static.thenounproject.com/png/1083140-200.png" alt="twbs" width="32" height="32" class="rounded-circle flex-shrink-0" />
                                                <div class="d-flex gap-2 w-100 justify-content-between">
                                                    <div>
                                                        <h6 class="mb-0">Sex</h6>
                                                        <p class="mb-0 opacity-75">Some placeholder</p>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                                <img src="https://e7.pngegg.com/pngimages/132/68/png-clipart-tape-measures-measurement-computer-icons-tool-others-miscellaneous-text.png" alt="twbs" width="32" height="32" class="rounded-circle flex-shrink-0" />
                                                <div class="d-flex gap-2 w-100 justify-content-between">
                                                    <div>
                                                        <h6 class="mb-0">Size</h6>
                                                        <p class="mb-0 opacity-75">Some placeholder</p>
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                                <img src="https://www.freeiconspng.com/uploads/birthday-cake-icon-1.png" alt="twbs" width="32" height="32" class="rounded-circle flex-shrink-0" />
                                                <div class="d-flex gap-2 w-100 justify-content-between">
                                                    <div>
                                                        <h6 class="mb-0">Age</h6>
                                                        <p class="mb-0 opacity-75">Some placeholder</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Koi Video */}
                            <div className="p-6 rounded-3" >
                                <div className="container px-1">
                                    <video
                                        className="img-fluid border rounded-3 shadow-lg"
                                        width="700"
                                        height="500"
                                        controls
                                        muted
                                        loop
                                        autoPlay
                                    >
                                        <source src="koi-pond-video.mp4" type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

const AnonymousAuction = () => {
    return (
        <div>Anonymous Auction</div>
    );
}

const BuyOutAuction = () => {
    return (
        <div>Buy Out Auction</div>
    );
}

export default AuctionView