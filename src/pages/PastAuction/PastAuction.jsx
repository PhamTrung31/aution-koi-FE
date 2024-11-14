import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPastAuction } from "../../redux/apiRequest";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearErrors } from "../../redux/auctionSlice";
import { useNavigate } from "react-router-dom";

function PastAuction() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const pastAuction = useSelector((state) => state.auction.pastAuction?.pastAuctions);
    const error = useSelector((state) => state.auction.pastAuction?.error);
    const token = useSelector(
        (state) => state.auth.login?.currentToken.token
      );

    useEffect(() => {
        getPastAuction(token,dispatch);
    }, []);
    useEffect(() => {
        if (error) {
            toast.error(error.message);
            dispatch(clearErrors());
        }
    }, [error]);
    console.log(pastAuction);
    const handleNavigate = (id) => {
        navigate(`/viewFish`);
    }
    return (
        <div className="container px-4 py-5" id="hanging-icons">
            <h2 className="pb-2 border-bottom fw-bold">Auction History</h2>
            <div className="row g-4 py-5 row-cols-1 row-cols-lg-3"></div>
                {pastAuction && pastAuction.map((auction, index) => (
                    <div className="col d-flex align-items-start" key={auction._id}>
                        <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
                            <svg className="bi" width="1em" height="1em">
                                <use xlinkHref="#tools"></use>
                            </svg>
                        </div>
                        <div>
                            <h4>{auction.name || `Auction #${index + 1}`}</h4>
                            <p>
                                {new Date(auction.start_time).toLocaleString()} - {new Date(auction.end_time).toLocaleString()} <br />
                            </p>
                            <button 
                                className="btn btn-outline-info"
                                onClick={() => handleNavigate(auction._id)}
                            >
                                View Detail
                            </button>
                        </div>
                    </div>
                ))}
            </div>
    )
}

export default PastAuction