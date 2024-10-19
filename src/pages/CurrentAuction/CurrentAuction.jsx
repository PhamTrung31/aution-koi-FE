import React, { useEffect, useRef, useState } from 'react';
import './CurrentAuction.css'; // Import CSS for styling
import { Link } from 'react-router-dom';

function CurrentAuction() {

    const [timerDays, setTimerDays] = useState('00');
    const [timerHours, setTimerHours] = useState('00');
    const [timerMinutes, setTimerMinutes] = useState('00');
    const [timerSeconds, setTimerSeconds] = useState('00');

    let interval = useRef();

    const startTimer = () => {
      const countdownDate = new Date('10-21-2024 00:00:00').getTime();

      interval = setInterval(() => {
        const now =  new Date().getTime();
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
      },1000)
    };

    useEffect(() => {
        startTimer();
        return () => {
            clearInterval(interval.current);
        }
    })

    return (
        <div className="px-4 pt-5 my-5 text-center border-bottom">
            <h1 className="display-4 fw-bold text-center">Auction will be start in</h1>
            <div className="col-lg-6 mx-auto">
                <p className="lead mb-4 fs-1">
                    {timerDays == 1 ? (timerDays+' day') : timerDays == 0 ? ("") : timerDays+' days'} {timerHours < 10 ? '0'+timerHours : timerHours}
                    :{timerMinutes < 10 ? '0'+timerMinutes : timerMinutes}
                    :{timerSeconds < 10 ? '0'+timerSeconds : timerSeconds}
                </p>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                    <Link type="button" className="btn btn-success btn-lg px-4 me-sm-3" to={'/auctionView'}>Join Now</Link>
                    {/* <button as={Link} to="/pastAuction" type="button" className="btn btn-outline-secondary btn-lg px-4">View Past Auction</button> */}
                </div>
            </div>
            <div className="overflow-hidden" style={{ maxHeight: '30vh' }}>
                <div className="container px-5">
                    <video
                        className="img-fluid border rounded-3 shadow-lg mb-4"
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
    )
}

export default CurrentAuction