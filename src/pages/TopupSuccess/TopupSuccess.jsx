import { SiTicktick } from "react-icons/si";
import { Link } from 'react-router-dom';
import { getUserWallet } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";


function TopupSuccess() {
    const user = useSelector((state) => state.auth.profile.currentUser);
    const dispatch = useDispatch();

    useEffect(() => {
        getUserWallet(user.id, dispatch);
    }, []);

    return (
        <div className="px-4 my-5 text-center border-bottom">
            <p className="fs-1 text-success"><SiTicktick /></p>
            <h3 className="display-4 fw-bold text-body-emphasis text-center">Top-Up Success</h3>
            <div className="col-lg-6 mx-auto w-25">
                <p className="lead">Transaction ID: </p>
                <p className="lead">Message: </p>
                <p className="lead">Time: </p>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                    <Link
                        type="button"
                        className="btn btn-primary btn-lg px-4 me-sm-3"
                        to="/topup"
                    >
                        Continue Top-Up
                    </Link>
                    <Link
                        type="button"
                        className="btn btn-outline-success btn-lg px-4"
                        to="/"
                    >
                        Home
                    </Link>
                </div>
            </div>
            <div className="overflow-hidden" style={{ maxHeight: "30vh" }}>
                <div className="container px-5">
                    <img src="https://wallpaperaccess.com/full/277304.jpg" className="img-fluid border rounded-3 shadow-lg mb-4" alt="Example image" width="700" height="500" loading="lazy" />
                </div>
            </div>
        </div>
    )
}

export default TopupSuccess