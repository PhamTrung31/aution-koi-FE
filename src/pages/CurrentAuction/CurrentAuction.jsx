import React, { useEffect, useRef, useState } from "react";
import "./CurrentAuction.css"; // Import CSS for styling
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { joinNewAuction } from "../../redux/apiRequest";
import { joinAuctionInitial } from "../../redux/auctionSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Client } from "@stomp/stompjs";

function CurrentAuction() {
    const { currentUser } = useSelector((state) => state.auth.profile);
    const error = useSelector((state) => state.auction.joinAuction.error);
    const token = useSelector((state) => state.auth.login?.currentToken.token);
    const notify = () => toast.error(error.message);

    const [timerDays, setTimerDays] = useState("00");
    const [timerHours, setTimerHours] = useState("00");
    const [timerMinutes, setTimerMinutes] = useState("00");
    const [timerSeconds, setTimerSeconds] = useState("00");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [message, setMessage] = useState(
        JSON.parse(sessionStorage.getItem('websocketPendingMessage')) || null
    );

    let interval = useRef();

    const startTimer = () => {
        if (!message?.start_time) return;

        const countdownDate = new Date(message.start_time).getTime();

        interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now - (7 * 60 * 60 * 1000);

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
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
        }, 1000);
    };

    useEffect(() => {
        startTimer();
        return () => {
            clearInterval(interval.current);
        };
    }, [message]);

    const handleJoinAuction = (e) => {
        e.preventDefault();
        joinNewAuction(
            token,
            currentUser.id,
            auctionPendingInfo.auction_id,
            dispatch,
            navigate
        );
    };

    useEffect(() => {
        if (error !== null) {
            notify();
            dispatch(joinAuctionInitial());
        }
    }, [error]);

    useEffect(() => {
        console.log(message);
    }, [message]);

    return (
        <div className="px-4 pt-5 my-5 text-center border-bottom">
            <h1
                className="display-5 fw-bold text-center"
                style={{
                    color: message ? "inherit" : "#d3d3d3",
                    visibility: message ? "visible" : "hidden",
                }}
            >
                {message ? "Auction will start in" : ""}
            </h1>
            <div className="col-lg-6 mx-auto">
                {message ? (
                    <>
                        <div className="lead mb-4 fs-1 fw-light">
                            <span>
                                {timerDays == 1
                                    ? timerDays + " day"
                                    : timerDays == 0
                                        ? ""
                                        : timerDays + " days"}{" "}
                                {timerHours < 10 ? "0" + timerHours : timerHours}:
                                {timerMinutes < 10 ? "0" + timerMinutes : timerMinutes}:
                                {timerSeconds < 10 ? "0" + timerSeconds : timerSeconds}
                            </span>
                        </div>
                        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                            <Link
                                type="button"
                                className="btn btn-success btn-lg px-4 me-sm-3"
                                // onClick={handleJoinAuction}
                                to={"/auctionView"}
                            // style={{
                            //     opacity: auctionPendingInfo.countdownDate === 0 ? 0.5 : 1,
                            //     pointerEvents:
                            //         auctionPendingInfo.countdownDate === 0 ? "none" : "auto",
                            // }}
                            >
                                Join Now
                            </Link>
                        </div>
                        <div className="overflow-hidden" style={{ maxHeight: "30vh" }}>
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
                    </>
                ) : (
                    <div
                        style={{
                            color: "#ccc",
                            fontSize: "2.4rem",
                            textAlign: "center",
                            marginTop: "40px",
                            fontWeight: "bold",
                        }}
                    >
                        No Scheduled Auctions
                    </div>
                )}
            </div>

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default CurrentAuction;
