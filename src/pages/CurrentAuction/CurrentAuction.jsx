import React, { useEffect, useRef, useState } from "react";
import "./CurrentAuction.css"; // Import CSS for styling
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { joinNewAuction } from "../../redux/apiRequest";
import { joinAuctionInitial } from "../../redux/auctionSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { joinAuctionValidate } from "../../redux/apiRequest";
import { countPendingTimeLeft } from "../../redux/messageSlice";

function CurrentAuction() {
    const { currentUser } = useSelector((state) => state.auth.profile);
    const error = useSelector((state) => state.auction.joinAuction.error);
    const token = useSelector((state) => state.auth.login.currentToken.token);
    const message = useSelector((state) => state.message.websocketPendingMessage);
    const joinValid = useSelector((state) => state.auction.joinValidate.currentStatus);
    const timeLeft = useSelector((state) => state.message.pendingTimeLeft);
    const [isTimerCompleted, setIsTimerCompleted] = useState(false); // Cờ để kiểm tra xem countdown đã kết thúc chưa

    const [timerDays, setTimerDays] = useState("0");
    const [timerHours, setTimerHours] = useState("0");
    const [timerMinutes, setTimerMinutes] = useState("0");
    const [timerSeconds, setTimerSeconds] = useState("0");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const notify = () => toast.error(error.message);

    let interval = useRef(null);

    const startTimer = async () => {
        if (!message?.start_time || isTimerCompleted) return;
        const countdownDate = new Date(message.start_time).getTime();

        await new Promise((resolve) => {
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
                    clearInterval(interval);
                    resolve(); // Resolve the promise when the timer reaches zero
                } else {
                    // update timer
                    setTimerDays(days);
                    setTimerHours(hours);
                    setTimerMinutes(minutes);
                    setTimerSeconds(seconds);
                }
            }, 1000);
        });

        dispatch(countPendingTimeLeft(0));
    };

    useEffect(() => {
        if (message?.start_time) {
            startTimer();
        }
        return () => {
            // Cleanup interval khi component unmount hoặc message thay đổi
            if (interval.current) {
                clearInterval(interval.current);
                interval.current = null;
            }
        };
    }, [message]);

    const handleJoinAuction = (e) => {
        e.preventDefault();
        console.log(token);
        console.log(currentUser.id);
        console.log(message.auction_id);
        joinNewAuction(token, currentUser.id, message.auction_id, dispatch, navigate);
    };

    useEffect(() => {
        if (error !== null) {
            notify();
            dispatch(joinAuctionInitial());
        }
    }, [error]);

    useEffect(() => {
        if (message !== null) {
            joinAuctionValidate(token, message.auction_id, currentUser.id, dispatch);
        }
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
                {
                    timeLeft === 0 ? "Auction is happening"
                        : message ? "Auction will start in"
                            : ""
                }
            </h1>
            <div className="col-lg-6 mx-auto">
                {message ? (
                    <>
                        <div className="lead mb-4 fs-1 fw-light">
                            { timeLeft !== 0 ?
                                <span>
                                    {
                                        timerDays == 1
                                            ? timerDays + " day"
                                            : timerDays == 0
                                                ? ""
                                                : timerDays + " days"
                                    }{" "}
                                    {
                                        timerHours < 10
                                            ? "0" + timerHours + ":"
                                            : timerHours == 0
                                                ? ""
                                                : timerHours + ":"
                                    }
                                    {
                                        timerMinutes < 10
                                            ? "0" + timerMinutes + ":"
                                            : timerMinutes == 0
                                                ? ""
                                                : timerMinutes + ":"
                                    }
                                    {
                                        timerSeconds < 10
                                            ? "0" + timerSeconds
                                            : timerSeconds == 0
                                                ? ""
                                                : timerSeconds
                                    }
                                </span>
                                : <span></span>
                            }
                        </div>
                        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">

                            {
                                joinValid === "Joined auction" ? (
                                    <Link
                                        type="button"
                                        className="btn btn-success btn-lg px-4 me-sm-3"
                                        // onClick={handleJoinAuction}
                                        to={"/auctionView"}
                                    >
                                        View Auction
                                    </Link>
                                ) : (
                                    <Link
                                        type="button"
                                        className="btn btn-success btn-lg px-4 me-sm-3"
                                        onClick={handleJoinAuction}
                                    >
                                        Join Auction
                                    </Link>
                                )
                            }
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
