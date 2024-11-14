import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AuctionPreview({ auctionType }) {
    return (
        <body>
            {auctionType === "TRADITIONAL" ? (
                <IncreasingAuction />
            ) : auctionType === "ANONYMOUS" ? (
                <AnonymousAuction />
            ) : (
                <div>Page Not Found!</div>
            )}
        </body>
    );
}

const IncreasingAuction = () => {
    const [highestBid, setHighestBid] = useState(3000000);
    const [incre, setIncre] = useState(200000);
    const [step, setStep] = useState(1);
    const [bid, setBid] = useState(highestBid + incre * step);
    const [autoBid, setAutoBid] = useState(0);
    const [maxBid, setMaxBid] = useState(0);
    const [countdown, setCountdown] = useState();
    const message = useSelector((state) => state.message.websocketPendingMessage);
  
    const [timerDays, setTimerDays] = useState("00");
    const [timerHours, setTimerHours] = useState("00");
    const [timerMinutes, setTimerMinutes] = useState("00");
    const [timerSeconds, setTimerSeconds] = useState("00");
  
    let interval = useRef();
  
    const startTimer = async () => {
      if (!message?.start_time) return;
  
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
      });
  
      dispatch(countStartTimeLeft(0));
    };
  
    useEffect(() => {
      if (message?.start_time) {
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
  
    return (
      <div className="container" style={{ marginBottom: "28.5px" }}>
        {message ? <main>
          <div className="pt-5 text-center">
            <h2 className="display-5 fw-bold">Auction will start in</h2>
            <p className="lead mb-1 fs-1">
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
  
          <div className="d-flex justify-content-center">
            <div className="col-md-7 col-lg-8 ">
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
  
      </div>
    );
  };
  
  const AnonymousAuction = () => {
    const [highestBid, setHighestBid] = useState(3000000);
    const [incre, setIncre] = useState(200000);
    const [step, setStep] = useState(1);
    const [bid, setBid] = useState(highestBid + incre * step);
    const [autoBid, setAutoBid] = useState(0);
    const [maxBid, setMaxBid] = useState(0);
    const [countdown, setCountdown] = useState();
    const message = useSelector((state) => state.message.websocketPendingMessage);
  
    const [timerDays, setTimerDays] = useState("00");
    const [timerHours, setTimerHours] = useState("00");
    const [timerMinutes, setTimerMinutes] = useState("00");
    const [timerSeconds, setTimerSeconds] = useState("00");
  
    let interval = useRef();
  
    const startTimer = async () => {
      if (!message?.start_time) return;
  
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
      });
  
      dispatch(countStartTimeLeft(0));
    };
  
    useEffect(() => {
      if (message?.start_time) {
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
  
    return (
      <div className="container" style={{ marginBottom: "28.5px" }}>
        {message ? <main>
          <div className="pt-5 text-center">
            <h2 className="display-5 fw-bold">Auction will start in</h2>
            <p className="lead mb-1 fs-1">
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
  
          <div className="d-flex justify-content-center">
            <div className="col-md-7 col-lg-8 ">
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
  
      </div>
    );
  };

export default AuctionPreview