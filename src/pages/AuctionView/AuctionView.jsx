import "./AuctionView.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "bootstrap";
import { Client } from "@stomp/stompjs";
import { getUserProfile, placeBidTraditional, placeBidAnonymous } from "../../redux/apiRequest";
import {initialTraditionalBid,
        initialAnonymousBid} from "../../redux/bidSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { countStartTimeLeft } from "../../redux/messageSlice";


function AuctionView({ auctionType }) {
  return (
    <body>
      {auctionType === "TRADITIONAL" ? (
        <IncreasingAuction />
      ) : auctionType === "ANONYMOUS" ? (
        <AnonymousAuction />
      ) : auctionType === "FIXED_PRICE" ? (
        <BuyOutAuction />
      ) : (
        <div>Page Not Found!</div>
      )}
    </body>
  );
}

const IncreasingAuction = () => {
  const currentWinner = useSelector((state) => state.message.websocketPlaceBidMessage);
  const { currentUser } = useSelector((state) => state.auth.profile);
  const endMessage = useSelector((state) => state.message.websocketEndMessage);
  const startPrice = useSelector((state) => state.message.websocketStartMessage.start_price);
  const message = useSelector((state) => state.message.websocketStartMessage);
  const [step, setStep] = useState(1);
  const [highestBid, setHighestBid] = useState(currentWinner ? currentWinner.highest_price + message.increment_step : startPrice + message.increment_step);
  const [bid, setBid] = useState(highestBid);
  const [autoBid, setAutoBid] = useState(0);
  const [maxBid, setMaxBid] = useState(0);
  const { token } = useSelector((state) => state.auth.login.currentToken);
  const { traditionalBid } = useSelector((state) => state.bid);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  let interval = useRef();
  const countdownDate = useRef(null);

  const startTimer = async () => {
    if (!message?.end_time) return;

    // Đặt countdownDate ban đầu
    countdownDate.current = new Date(message.end_time).getTime() - 7 * 60 * 60 * 1000;

    await new Promise((resolve) => {
      interval = setInterval(() => {
        const now = new Date().getTime();

        const distance = countdownDate.current - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance < 0) {
          //stop our timer
          clearInterval(interval.current);
          resolve();
        } else {
          // update timer
          setTimerDays(days);
          setTimerHours(hours);
          setTimerMinutes(minutes);
          setTimerSeconds(seconds);
        }
      }, 1000);
    });

    dispatch(countStartTimeLeft(0));
  };

  useEffect(() => {
    if (message?.end_time) {
      startTimer();
    }
    return () => {
      clearInterval(interval.current);
    };
  }, [message]);

  const handleAutoBid = (e) => {
    e.preventDefault();
    if (autoBid === 0) setAutoBid(1);
    else setAutoBid(0);
    setBid(highestBid + highestBid * 0.1);
  };

  const handlePlaceBidTraditional = (e) => {
    e.preventDefault();
    console.log(bid);
    const bidData = {
      auctionId: message.auction_id,
      userId: currentUser.id,
      bidAmount: bid,
      isAutoBid: false,
      maxBidAmount: 0
    };
    dispatch(placeBidTraditional(token, bidData, currentUser.id, dispatch));
  };

  useEffect(() => {
    if (traditionalBid.status != null) {
      toast.success(traditionalBid.status);
      dispatch(initialTraditionalBid());
    }
    if (traditionalBid.error != null) {
      toast.error(traditionalBid.error.message);
      dispatch(initialTraditionalBid());
    }
  }, [traditionalBid]);

  useEffect(() => {
    setHighestBid(currentWinner ? currentWinner.highest_price : startPrice);
    if (currentWinner?.end_time) {
      countdownDate.current = new Date(currentWinner.end_time).getTime() - 7 * 60 * 60 * 1000;
    }
  }, [currentWinner]);

  useEffect(() => {
    if (endMessage != null) {
      toast.success(
        <div>
          <span className="fw-bold fs-5">{endMessage.user_fullname}</span> is the WINNERRRR with <b className="text-warning fs-5">{endMessage.highest_prices} $</b>
        </div>
      );
      getUserProfile(token, dispatch);
      setTimeout(() => {
        navigate("/currentAuction");
      }, 10000);
    }

  }, [endMessage]);

  return (
    <div className="container" style={{ marginBottom: "28.5px" }}>
      {message ? <main>
        <div className="py-5 text-center">
          <h2 className="fw-bolder">Traditional auction's Time Left:</h2>
          <p className="lead mb-4 fs-1">
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
          </p>
        </div>

        <div className="row g-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary fw-bold">Highest Bid User</span>
              {/* <span className="badge bg-primary rounded-pill">3</span> */}
            </h4>

            {/* Leaderboard */}
            {/* <ul
              className="list-group list-group-flush mb-3 leaderboard"
              style={{ maxHeight: "320px", overflowY: "auto" }}
            >
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">User #5</h6>
                  <small className="text-body-secondary">30 minutes ago</small>
                </div>
                <span>{highestBid} $</span>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">User #8</h6>
                  <small className="text-body-secondary">2 hours ago</small>
                </div>
                <span className="text-body-secondary">2500000 $</span>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">User #3</h6>
                  <small className="text-body-secondary">1 day ago</small>
                </div>
                <span className="text-body-secondary">2000000 $</span>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">User #3</h6>
                  <small className="text-body-secondary">1 day ago</small>
                </div>
                <span className="text-body-secondary">1500000 $</span>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">User #3</h6>
                  <small className="text-body-secondary">1 day ago</small>
                </div>
                <span className="text-body-secondary">1000000 $</span>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">User #3</h6>
                  <small className="text-body-secondary">1 day ago</small>
                </div>
                <span className="text-body-secondary">500000 $</span>
              </li>
            </ul> */}
            {
              currentWinner?.highest_price ? (
                <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                  <div class="col p-4 d-flex flex-column position-static">
                    <h3 class="mb-0">Placed Bid: <span className="fw-bolder text-danger">{Intl.NumberFormat("de-DE").format(currentWinner.highest_price)} $</span></h3>
                    <strong class="d-inline-block mb-2 text-primary-emphasis">#{currentWinner.winner_fullname}</strong>
                    <div class="mb-1 text-body-secondary"></div>
                  </div>
                  <div class="col-auto d-none d-lg-block">
                    <img width="200" height="140" src="https://www.svgrepo.com/show/50481/winner-with-trophy.svg" alt="" />
                  </div>
                </div>
              ) : (
                <></>
              )
            }


            <div
              type="button"
              className="p-2 btn btn-outline-success btn-lg w-100"
            >
              <div
                onClick={(e) => {
                  setBid(message.buy_out);
                  console.log(message.buy_out);
                  handlePlaceBidTraditional(e);
                }}
              >
                <span className="fw-bold">Buy Out</span>: {Intl.NumberFormat("de-DE").format(message.buy_out)} $
              </div>
            </div>
            <br />
            <hr className="my-4" />

            {/* Bid Area */}
            <div>
              <h4 className="mt-4">
                Auction's Increment:{" "}
                <span className="text-danger">{Intl.NumberFormat("de-DE").format(message.increment_step)}</span> $
              </h4>
              <form className="needs-validation" noValidate>
                <div className="row g-3">
                  {autoBid === 0 ? (
                    <>
                      {" "}
                      {/* Manual Bid */}
                      <div className="col-md-6 form-floating mt-4">
                        <div className="form-floating">
                          <input
                            type="number"
                            className="form-control rounded-3"
                            id="floatingBid"
                            placeholder="name@example.com"
                            value={bid}
                            onChange={(e) => {
                              setBid(e.target.value);
                            }}
                          // onClick={() => setIncre(0)}
                          />
                          <label for="floatingBid">Your Bid ( $ )</label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <label for="floatingBid">Step</label>
                        <input
                          type="number"
                          className="form-control rounded-3"
                          id="floatingBid"
                          value={Intl.NumberFormat("de-DE").format(step)}
                          onChange={(e) => {
                            const value = e.target.value < 1 ? 1 : e.target.value;
                            setStep(value);
                            setBid(highestBid + message.increment_step * value);
                          }}
                        />
                      </div>
                      {/* <div className="col-md-4">
                        <button
                          className="btn btn-danger w-100"
                          onClick={handleAutoBid}
                        >
                          Auto Bid
                        </button>
                      </div> */}
                      <hr className="my-4" />
                      <button
                        className="w-100 btn btn-success btn-lg"
                        type="submit"
                        onClick={handlePlaceBidTraditional}
                      >
                        Continue to bid
                      </button>
                    </>
                  ) : (
                    <>
                      {" "}
                      {/* Auto Bid */}
                      <div className="col-md-8 form-floating mt-4">
                        <div className="form-floating">
                          <input
                            type="number"
                            className="form-control rounded-3 text-secondary"
                            id="floatingBid"
                            placeholder="name@example.com"
                            value={bid}
                          />
                          <label for="floatingBid">
                            Your Bid ( $ ) - View Only
                          </label>
                        </div>
                      </div>
                      <div className="col-md-5">
                        <button
                          className="btn btn-warning w-100"
                          onClick={handleAutoBid}
                        >
                          {" "}
                          Cancel Auto Bid
                        </button>
                      </div>
                      <div className="col-md-7"></div>
                      <div className="col-md-6 form-floating">
                        <div className="form-floating">
                          <input
                            type="number"
                            className="form-control rounded-3"
                            id="floatingInput"
                            placeholder="name@example.com"
                            onChange={(e) => setMaxBid(e.target.value)}
                          />
                          <label for="floatingInput">Maximum ( $ )</label>
                        </div>
                      </div>
                      <div className="col-md-4 mt-2">
                        <label for="form-label">Increment</label>
                        <select
                          className="form-select"
                          id="form-label"
                          required
                          onChange={(e) =>
                            setBid(highestBid + highestBid * e.target.value)
                          }
                        >
                          <option value={0.1}>10%</option>
                          <option value={0.2}>20%</option>
                          <option value={0.5}>50%</option>
                        </select>
                      </div>
                      <hr className="my-4" />
                      <button
                        className="w-100 btn btn-success btn-lg"
                        type="submit"
                      >
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
                <div className="col-md-6">
                  {" "}
                  {/* Koi Image */}
                  <div
                    className="h-100 w-100 p-5 rounded-3 koi-image shadow"
                    style={{
                      backgroundImage:
                        `url(${message.imageUrl})`,
                      backgroundSize:
                        "50%" /* Thu nhỏ hình nền còn 50% kích thước gốc */,
                      backgroundPosition: "center", // Canh giữa ảnh
                      backgroundRepeat: "no-repeat",
                      backgroundColor: "#069CF1",
                    }}
                  >
                    <img
                      src="https://www.whatkoi.com/wp-content/uploads/2020/03/Dainichi-Koi-Farm.jpg"
                      alt="twbs"
                      width="100"
                      height="100"
                      class="rounded-circle flex-shrink-0"
                      style={{
                        objectFit: "cover",
                      }}
                    />
                    <br />
                    <span className="fs-2 fw-bold">{message.fish_name}</span>
                  </div>
                </div>
                <div className="col-md-6">
                  {" "}
                  {/* Koi Information */}
                  <div className="h-100 p-5 rounded-3 bg-transparent">
                    <div class="list-group shadow">
                      <a
                        href="#"
                        class="list-group-item list-group-item-action d-flex gap-3 py-3"
                        aria-current="true"
                      >
                        <img
                          src="https://static.thenounproject.com/png/935874-200.png"
                          alt="twbs"
                          width="32"
                          height="32"
                          class="rounded-circle flex-shrink-0"
                        />
                        <div class="d-flex gap-2 w-100 justify-content-between">
                          <div>
                            <h6 class="mb-0">Variety</h6>
                            <p class="mb-0 opacity-75">{message.fish_name}</p>
                          </div>
                        </div>
                      </a>
                      <a
                        href="#"
                        class="list-group-item list-group-item-action d-flex gap-3 py-3"
                        aria-current="true"
                      >
                        <img
                          src="https://static.thenounproject.com/png/1083140-200.png"
                          alt="twbs"
                          width="32"
                          height="32"
                          class="rounded-circle flex-shrink-0"
                        />
                        <div class="d-flex gap-2 w-100 justify-content-between">
                          <div>
                            <h6 class="mb-0">Sex</h6>
                            <p class="mb-0 opacity-75">{message.fish_sex}</p>
                          </div>
                        </div>
                      </a>
                      <a
                        href="#"
                        class="list-group-item list-group-item-action d-flex gap-3 py-3"
                        aria-current="true"
                      >
                        <img
                          src="https://e7.pngegg.com/pngimages/132/68/png-clipart-tape-measures-measurement-computer-icons-tool-others-miscellaneous-text.png"
                          alt="twbs"
                          width="32"
                          height="32"
                          class="rounded-circle flex-shrink-0"
                        />
                        <div class="d-flex gap-2 w-100 justify-content-between">
                          <div>
                            <h6 class="mb-0">Size</h6>
                            <p class="mb-0 opacity-75">{message.fish_size} cm</p>
                          </div>
                        </div>
                      </a>
                      <a
                        href="#"
                        class="list-group-item list-group-item-action d-flex gap-3 py-3"
                        aria-current="true"
                      >
                        <img
                          src="https://www.freeiconspng.com/uploads/birthday-cake-icon-1.png"
                          alt="twbs"
                          width="32"
                          height="32"
                          class="rounded-circle flex-shrink-0"
                        />
                        <div class="d-flex gap-2 w-100 justify-content-between">
                          <div>
                            <h6 class="mb-0">Age</h6>
                            <p class="mb-0 opacity-75">{message.fish_age} years</p>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Koi Video */}
              <div className="p-6 rounded-3">
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
                    <source src={message.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
        :
        <p>Waiting for notification...</p>
      }
      <ToastContainer
        position="top-center"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Flip
      />
    </div>
  );
};

const AnonymousAuction = () => {
  const currentWinner = useSelector((state) => state.message.websocketPlaceBidMessage);
  const { currentUser } = useSelector((state) => state.auth.profile);
  const endMessage = useSelector((state) => state.message.websocketEndMessage);
  const startPrice = useSelector((state) => state.message.websocketStartMessage.start_price);
  const message = useSelector((state) => state.message.websocketStartMessage);
  const [step, setStep] = useState(1);
  const [highestBid, setHighestBid] = useState(currentWinner ? currentWinner.highest_price + message.increment_step : startPrice + message.increment_step);
  const [bid, setBid] = useState(highestBid);
  const [autoBid, setAutoBid] = useState(0);
  const [maxBid, setMaxBid] = useState(0);
  const { token } = useSelector((state) => state.auth.login.currentToken);
  const { anonymousBid } = useSelector((state) => state.bid);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  let interval = useRef();
  const countdownDate = useRef(null);

  const startTimer = async () => {
    if (!message?.end_time) return;

    // Đặt countdownDate ban đầu
    countdownDate.current = new Date(message.end_time).getTime() - 7 * 60 * 60 * 1000;

    await new Promise((resolve) => {
      interval = setInterval(() => {
        const now = new Date().getTime();

        const distance = countdownDate.current - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance < 0) {
          //stop our timer
          clearInterval(interval.current);
          resolve();
        } else {
          // update timer
          setTimerDays(days);
          setTimerHours(hours);
          setTimerMinutes(minutes);
          setTimerSeconds(seconds);
        }
      }, 1000);
    });

    dispatch(countStartTimeLeft(0));
  };

  useEffect(() => {
    if (message?.end_time) {
      startTimer();
    }
    return () => {
      clearInterval(interval.current);
    };
  }, [message]);

  const handleAutoBid = (e) => {
    e.preventDefault();
    if (autoBid === 0) setAutoBid(1);
    else setAutoBid(0);
    setBid(highestBid + highestBid * 0.1);
  };

  const handlePlaceBid = (e) => {
    e.preventDefault();
    const bidData = {
      auctionId: message.auction_id,
      userId: currentUser.id,
      bidAmount: bid,
      isAutoBid: false,
      incrementAutobid: null,
      maxBidAmount: null
    };
    placeBidAnonymous(token, bidData, currentUser.id, dispatch);
  };

  useEffect(() => {
    if (anonymousBid.status != null) {
      toast.success(anonymousBid.status);
      dispatch(initialAnonymousBid());
    }
    if (anonymousBid.error != null) {
      toast.error(anonymousBid.error.message);
      dispatch(initialAnonymousBid());
    }
  }, [anonymousBid]);

  useEffect(() => {
    setHighestBid(currentWinner ? currentWinner.highest_price : startPrice);
    if (currentWinner?.end_time) {
      countdownDate.current = new Date(currentWinner.end_time).getTime() - 7 * 60 * 60 * 1000;
    }
  }, [currentWinner]);

  useEffect(() => {
    if (endMessage != null) {
      toast.success(
        <div>
          <span className="fw-bold fs-5">{endMessage.user_fullname}</span> is the WINNERRRR with <b className="text-warning fs-5">{endMessage.highest_prices} $</b>
        </div>
      );
      getUserProfile(token, dispatch);
      setTimeout(() => {
        navigate("/currentAuction");
      }, 10000);
    }

  }, [endMessage]);

  return (
    <div className="container" style={{ marginBottom: "28.5px" }}>
      {message ? <main>
        <div className="py-5 text-center">
          <h2 className="fw-bolder">Anonymous auction's Time Left:</h2>
          <p className="lead mb-4 fs-1">
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
          </p>
        </div>

        <div className="row g-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-danger fw-bold fs-2">Start Price: </span>
              <span>{message.start_price} $</span>
              {/* <span className="badge bg-primary rounded-pill">3</span> */}
            </h4>
            <hr className="my-4" />

            {/* Bid Area */}
            <div>
              <h4 className="mt-4">
                Auction's Increment:{" "}
                <span className="text-danger">{Intl.NumberFormat("de-DE").format(message.increment_step)}</span> $
              </h4>
              <form className="needs-validation" noValidate>
                <div className="row g-3">
                  {autoBid === 0 ? (
                    <>
                      {" "}
                      {/* Manual Bid */}
                      <div className="col-md-6 form-floating mt-4">
                        <div className="form-floating">
                          <input
                            type="number"
                            className="form-control rounded-3"
                            id="floatingBid"
                            placeholder="name@example.com"
                            value={bid}
                            onChange={(e) => {
                              setBid(e.target.value);
                            }}
                          // onClick={() => setIncre(0)}
                          />
                          <label for="floatingBid">Your Bid ( $ )</label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <label for="floatingBid">Step</label>
                        <input
                          type="number"
                          className="form-control rounded-3"
                          id="floatingBid"
                          value={Intl.NumberFormat("de-DE").format(step)}
                          onChange={(e) => {
                            const value = e.target.value < 1 ? 1 : e.target.value;
                            setStep(value);
                            setBid(highestBid + message.increment_step * value);
                          }}
                        />
                      </div>
                      {/* <div className="col-md-4">
                        <button
                          className="btn btn-danger w-100"
                          onClick={handleAutoBid}
                        >
                          Auto Bid
                        </button>
                      </div> */}
                      <hr className="my-4" />
                      <button
                        className="w-100 btn btn-success btn-lg"
                        type="submit"
                        onClick={handlePlaceBid}
                      >
                        Continue to bid
                      </button>
                    </>
                  ) : (
                    <>
                      {" "}
                      {/* Auto Bid */}
                      <div className="col-md-8 form-floating mt-4">
                        <div className="form-floating">
                          <input
                            type="number"
                            className="form-control rounded-3 text-secondary"
                            id="floatingBid"
                            placeholder="name@example.com"
                            value={bid}
                          />
                          <label for="floatingBid">
                            Your Bid ( $ ) - View Only
                          </label>
                        </div>
                      </div>
                      <div className="col-md-5">
                        <button
                          className="btn btn-warning w-100"
                          onClick={handleAutoBid}
                        >
                          {" "}
                          Cancel Auto Bid
                        </button>
                      </div>
                      <div className="col-md-7"></div>
                      <div className="col-md-6 form-floating">
                        <div className="form-floating">
                          <input
                            type="number"
                            className="form-control rounded-3"
                            id="floatingInput"
                            placeholder="name@example.com"
                            onChange={(e) => setMaxBid(e.target.value)}
                          />
                          <label for="floatingInput">Maximum ( $ )</label>
                        </div>
                      </div>
                      <div className="col-md-4 mt-2">
                        <label for="form-label">Increment</label>
                        <select
                          className="form-select"
                          id="form-label"
                          required
                          onChange={(e) =>
                            setBid(highestBid + highestBid * e.target.value)
                          }
                        >
                          <option value={0.1}>10%</option>
                          <option value={0.2}>20%</option>
                          <option value={0.5}>50%</option>
                        </select>
                      </div>
                      <hr className="my-4" />
                      <button
                        className="w-100 btn btn-success btn-lg"
                        type="submit"
                      >
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
                <div className="col-md-6">
                  {" "}
                  {/* Koi Image */}
                  <div
                    className="h-100 w-100 p-5 rounded-3 koi-image shadow"
                    style={{
                      backgroundImage:
                        `url(${message.imageUrl})`,
                      backgroundSize:
                        "50%" /* Thu nhỏ hình nền còn 50% kích thước gốc */,
                      backgroundPosition: "center", // Canh giữa ảnh
                      backgroundRepeat: "no-repeat",
                      backgroundColor: "#069CF1",
                    }}
                  >
                    <img
                      src="https://www.whatkoi.com/wp-content/uploads/2020/03/Dainichi-Koi-Farm.jpg"
                      alt="twbs"
                      width="100"
                      height="100"
                      class="rounded-circle flex-shrink-0"
                      style={{
                        objectFit: "cover",
                      }}
                    />
                    <br />
                    <span className="fs-2 fw-bold">{message.fish_name}</span>
                  </div>
                </div>
                <div className="col-md-6">
                  {" "}
                  {/* Koi Information */}
                  <div className="h-100 p-5 rounded-3 bg-transparent">
                    <div class="list-group shadow">
                      <a
                        href="#"
                        class="list-group-item list-group-item-action d-flex gap-3 py-3"
                        aria-current="true"
                      >
                        <img
                          src="https://static.thenounproject.com/png/935874-200.png"
                          alt="twbs"
                          width="32"
                          height="32"
                          class="rounded-circle flex-shrink-0"
                        />
                        <div class="d-flex gap-2 w-100 justify-content-between">
                          <div>
                            <h6 class="mb-0">Variety</h6>
                            <p class="mb-0 opacity-75">{message.fish_name}</p>
                          </div>
                        </div>
                      </a>
                      <a
                        href="#"
                        class="list-group-item list-group-item-action d-flex gap-3 py-3"
                        aria-current="true"
                      >
                        <img
                          src="https://static.thenounproject.com/png/1083140-200.png"
                          alt="twbs"
                          width="32"
                          height="32"
                          class="rounded-circle flex-shrink-0"
                        />
                        <div class="d-flex gap-2 w-100 justify-content-between">
                          <div>
                            <h6 class="mb-0">Sex</h6>
                            <p class="mb-0 opacity-75">{message.fish_sex}</p>
                          </div>
                        </div>
                      </a>
                      <a
                        href="#"
                        class="list-group-item list-group-item-action d-flex gap-3 py-3"
                        aria-current="true"
                      >
                        <img
                          src="https://e7.pngegg.com/pngimages/132/68/png-clipart-tape-measures-measurement-computer-icons-tool-others-miscellaneous-text.png"
                          alt="twbs"
                          width="32"
                          height="32"
                          class="rounded-circle flex-shrink-0"
                        />
                        <div class="d-flex gap-2 w-100 justify-content-between">
                          <div>
                            <h6 class="mb-0">Size</h6>
                            <p class="mb-0 opacity-75">{message.fish_size} cm</p>
                          </div>
                        </div>
                      </a>
                      <a
                        href="#"
                        class="list-group-item list-group-item-action d-flex gap-3 py-3"
                        aria-current="true"
                      >
                        <img
                          src="https://www.freeiconspng.com/uploads/birthday-cake-icon-1.png"
                          alt="twbs"
                          width="32"
                          height="32"
                          class="rounded-circle flex-shrink-0"
                        />
                        <div class="d-flex gap-2 w-100 justify-content-between">
                          <div>
                            <h6 class="mb-0">Age</h6>
                            <p class="mb-0 opacity-75">{message.fish_age} years</p>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Koi Video */}
              <div className="p-6 rounded-3">
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
                    <source src={message.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
        :
        <p>Waiting for notification...</p>
      }
      <ToastContainer
        position="top-center"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Flip
      />
    </div>
  );
};

const BuyOutAuction = () => {
  const [message, setMessage] = useState(null);

  const [auctionStartInfo, setAuctionStartInfo] = useState({
    auction_id: 0,
    fish_id: 0,
    fish_name: "",
    fish_age: 0,
    fish_size: 0,
    fish_sex: "",
    imageUrl: "",
    videoUrl: "",
    auction_status: "",
    deposit_amount: 0,
    start_time: "",
    end_time: "",
    buy_out: 0,
    highestBid: 0,
  });
  const [buyOut, setBuyOut] = useState(6000000);
  const [highestBid, setHigestBid] = useState(3000000);
  const [bid, setBid] = useState(highestBid + highestBid * 0.1);
  const [autoBid, setAutoBid] = useState(0);
  const [maxBid, setMaxBid] = useState(0);
  const [incre, setIncre] = useState(0);

  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  let interval = useRef();

  useEffect(() => {
    // Configure the Stomp client
    const client = new Client({
      // Use ws:// for STOMP over WebSocket
      brokerURL: "ws://localhost:8081/auctionkoi/ws",

      connectHeaders: {
        login: "guest",
        passcode: "guest",
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log("Connected to WebSocket");

        // Subscribe to the auction topic
        client.subscribe("/auctions/test", (message) => {
          console.log("Connect to the start topic");

          console.log("Message body still invalid!");
          if (message.body) {
            const data = JSON.parse(message.body);
            console.log("Message body is valid!");
            console.log("Check buyout value of data: ", data.buy_out);
            setMessage(data);
            const startDate = new Date(data.start_time);
            const currentDate = new Date();
            const countdownTime = startDate.getTime() - currentDate.getTime();

            setAuctionStartInfo((prev) => ({
              ...prev,
              ...data,
              countdownDate: countdownTime > 0 ? countdownTime : 0,
            }));
          }
        });
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
    });

    // Start the connection
    client.activate();

    // Clean up the connection on component unmount
    return () => {
      client.deactivate();
    };
  }, []);

  useEffect(() => {
    if (auctionStartInfo.countdownDate > 0) {
      interval.current = setInterval(() => {
        setAuctionStartInfo((prev) => ({
          ...prev,
          countdownDate: prev.countdownDate - 1000,
        }));
      }, 1000);
      console.log(auctionStartInfo);
    }

    return () => clearInterval(interval.current);
  }, [auctionStartInfo.countdownDate]);

  // Format countdown time to mm:ss
  const formatCountdown = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };

  const handleAutoBid = (e) => {
    e.preventDefault();
    setAutoBid(autoBid === 0 ? 1 : 0); // Toggle autoBid
    setBid(auctionStartInfo.highestBid + auctionStartInfo.highestBid * 0.1); // Set new bid
  };

  return (
    <div className="container" style={{ marginBottom: "28.5px" }}>
      <main>
        <div className="py-5 text-center">
          <h2>Auction's Time Left:</h2>
          <p className="lead mb-4 fs-1">
            <div>
              Countdown: {formatCountdown(auctionStartInfo.countdownDate)}
            </div>
          </p>
        </div>

        <div className="row g-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Leaderboard</span>
              <span className="badge bg-primary rounded-pill">3</span>
            </h4>

            {/* Leaderboard */}
            <ul
              className="list-group list-group-flush mb-3 leaderboard"
              style={{ maxHeight: "320px", overflowY: "auto" }}
            >
              {/* Leaderboard items can be rendered here */}
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">User #5</h6>
                  <small className="text-body-secondary">30 minutes ago</small>
                </div>
                <span>{auctionStartInfo.highestBid} $</span>
              </li>
              {/* Additional leaderboard items */}
            </ul>

            <div
              type="button"
              className="p-2 btn btn-outline-success btn-lg w-100"
            >
              <div>
                <span className="fw-bold">Buy Out</span>:{" "}
                {auctionStartInfo.buy_out} $
              </div>
            </div>
            <br />

            {/* Bid Area */}
            <div>
              <h4 className="mt-4">Put Your Bid Here</h4>
              <form className="needs-validation" noValidate>
                <div className="row g-3">
                  {autoBid === 0 ? (
                    <>
                      {/* Manual Bid */}
                      <div className="col-md-6 form-floating mt-4">
                        <input
                          type="number"
                          className="form-control rounded-3"
                          id="floatingBid"
                          placeholder="Your Bid"
                          value={bid}
                          onChange={(e) => setBid(e.target.value)}
                        />
                        <label htmlFor="floatingBid">Your Bid ( $ )</label>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="form-label">Increment</label>
                        <select
                          className="form-select"
                          id="form-label"
                          value={incre}
                          required
                          onChange={(e) => {
                            setBid(
                              auctionStartInfo.highestBid +
                              auctionStartInfo.highestBid * e.target.value
                            );
                            setIncre(e.target.value);
                          }}
                        >
                          <option value={0}> </option>
                          <option value={0.1}>10%</option>
                          <option value={0.2}>20%</option>
                          <option value={0.5}>50%</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <button
                          className="btn btn-danger w-100"
                          onClick={handleAutoBid}
                        >
                          Auto Bid
                        </button>
                      </div>
                      <hr className="my-4" />
                      <button
                        className="w-100 btn btn-success btn-lg"
                        type="submit"
                      >
                        Continue to bid
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Auto Bid */}
                      <div className="col-md-8 form-floating mt-4">
                        <input
                          type="number"
                          className="form-control rounded-3 text-secondary"
                          id="floatingBid"
                          placeholder="Your Bid"
                          value={bid}
                          readOnly
                        />
                        <label htmlFor="floatingBid">
                          Your Bid ( $ ) - View Only
                        </label>
                      </div>
                      <div className="col-md-5">
                        <button
                          className="btn btn-warning w-100"
                          onClick={handleAutoBid}
                        >
                          Cancel Auto Bid
                        </button>
                      </div>
                      <div className="col-md-6 form-floating">
                        <input
                          type="number"
                          className="form-control rounded-3"
                          id="floatingInput"
                          placeholder="Maximum Bid"
                          onChange={(e) => setMaxBid(e.target.value)}
                        />
                        <label htmlFor="floatingInput">Maximum ( $ )</label>
                      </div>
                      <div className="col-md-4 mt-2">
                        <label htmlFor="form-label">Increment</label>
                        <select
                          className="form-select"
                          id="form-label"
                          required
                          onChange={(e) =>
                            setBid(
                              auctionStartInfo.highestBid +
                              auctionStartInfo.highestBid * e.target.value
                            )
                          }
                        >
                          <option value={0.1}>10%</option>
                          <option value={0.2}>20%</option>
                          <option value={0.5}>50%</option>
                        </select>
                      </div>
                      <hr className="my-4" />
                      <button
                        className="w-100 btn btn-success btn-lg"
                        type="submit"
                      >
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
                <div className="col-md-6">
                  <div
                    className="h-100 p-5 border bg-light rounded-3 shadow"
                    style={{
                      backgroundImage: "url(/images/your-image.jpg)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                </div>
                <div className="col-md-6">
                  <div className="h-100 p-5 border bg-light rounded-3 shadow">
                    <h4 className="fw-bold">About the Koi</h4>
                    <ul className="list-unstyled mt-4">
                      <li>
                        <strong>Current Bid:</strong>{" "}
                        {auctionStartInfo.highestBid} $
                      </li>
                      <li>
                        <strong>Buyout Price:</strong> {auctionStartInfo.buyOut}{" "}
                        $
                      </li>
                      <li>
                        <strong>Bid Increment:</strong>{" "}
                        {auctionStartInfo.highestBid * 0.1} $
                      </li>
                      <li>
                        <strong>Starting Date:</strong>{" "}
                        {auctionStartInfo.countdownDate}
                      </li>
                    </ul>
                    <Link to="/koi-details" className="btn btn-primary">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuctionView;
