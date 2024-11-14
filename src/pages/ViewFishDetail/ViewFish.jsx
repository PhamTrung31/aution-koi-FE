import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { clearErrors } from "../../redux/auctionSlice";
import { useNavigate, Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { getKoiFishById,getPastAuction } from "../../redux/apiRequest";


function ViewFish() {
    return (
        <body>
            <ViewFishDetail />
        </body>
    );
}

const ViewFishDetail = () => {
    const dispatch = useDispatch();
    const pastAuction = useSelector((state) => state.auction.pastAuction?.pastAuctions);
    const error = useSelector((state) => state.auction.pastAuction?.error);
    const token = useSelector((state) => state.auth.login?.currentToken.token);
    const koifishById = useSelector((state) => state.koifish.koifishs?.koifishById);

    // Loading state
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await getPastAuction(token, dispatch);
            setIsLoading(false);
        };
        fetchData();
    }, [token, dispatch]);

    useEffect(() => {
        if (pastAuction && pastAuction.length > 0) {
            getKoiFishById(token, pastAuction[0].fish_id, dispatch);
        }
    }, [pastAuction, token, dispatch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container" style={{ marginBottom: "28.5px" }}>
            {pastAuction && koifishById && pastAuction.map((auction) => (
                <main key={auction._id}>
                    <div className="row g-5">
                        <div className="col-md-7 col-lg-8">
                            <div className="container py-4">
                                <div className="row align-items-md-stretch mb-5">
                                    <div className="col-md-6 d-flex justify-content-center align-items-center">
                                        {/* Koi Image */}
                                        <div
                                            className="h-100 w-100 p-5 rounded-3 koi-image shadow"
                                            style={{
                                                backgroundImage: `url(${koifishById.imageUrl || auction.imageUrl})`,
                                                backgroundSize: "50%",
                                                backgroundPosition: "center",
                                                backgroundRepeat: "no-repeat",
                                                backgroundColor: "#069CF1",
                                            }}
                                        >
                                            <img
                                                src={koifishById.farm?.logo || "https://www.whatkoi.com/wp-content/uploads/2020/03/Dainichi-Koi-Farm.jpg"}
                                                alt="farm logo"
                                                width="100"
                                                height="100"
                                                className="rounded-circle flex-shrink-0"
                                                style={{ objectFit: "cover" }}
                                            />
                                            <br />
                                        </div>
                                    </div>
                                    <div className="col-md-6 d-flex justify-content-center align-items-center">
                                        {/* Koi Information */}
                                        <div className="h-100 p-5 rounded-3 bg-transparent w-100">
                                            <div className="list-group shadow">
                                            <a href="#" className="list-group-item list-group-item-action d-flex gap-3 py-3">
                                                    <img
                                                        src="https://e7.pngegg.com/pngimages/132/68/png-clipart-tape-measures-measurement-computer-icons-tool-others-miscellaneous-text.png"
                                                        alt="size icon"
                                                        width="32"
                                                        height="32"
                                                        className="rounded-circle flex-shrink-0"
                                                    />
                                                    <div className="d-flex gap-2 w-100 justify-content-between">
                                                        <div>
                                                            <h6 className="mb-0">Name</h6>
                                                            <p className="mb-0 opacity-75">{koifishById.name || auction.fish_name}</p>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="#" className="list-group-item list-group-item-action d-flex gap-3 py-3">
                                                    <img
                                                        src="https://static.thenounproject.com/png/1083140-200.png"
                                                        alt="sex icon"
                                                        width="32"
                                                        height="32"
                                                        className="rounded-circle flex-shrink-0"
                                                    />
                                                    <div className="d-flex gap-2 w-100 justify-content-between">
                                                        <div>
                                                            <h6 className="mb-0">Sex</h6>
                                                            <p className="mb-0 opacity-75">{koifishById.sex || auction.fish_sex}</p>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="#" className="list-group-item list-group-item-action d-flex gap-3 py-3">
                                                    <img
                                                        src="https://e7.pngegg.com/pngimages/132/68/png-clipart-tape-measures-measurement-computer-icons-tool-others-miscellaneous-text.png"
                                                        alt="size icon"
                                                        width="32"
                                                        height="32"
                                                        className="rounded-circle flex-shrink-0"
                                                    />
                                                    <div className="d-flex gap-2 w-100 justify-content-between">
                                                        <div>
                                                            <h6 className="mb-0">Size</h6>
                                                            <p className="mb-0 opacity-75">{koifishById.size || auction.fish_size} cm</p>
                                                        </div>
                                                    </div>
                                                </a>
                                                <a href="#" className="list-group-item list-group-item-action d-flex gap-3 py-3">
                                                    <img
                                                        src="https://www.freeiconspng.com/uploads/birthday-cake-icon-1.png"
                                                        alt="age icon"
                                                        width="32"
                                                        height="32"
                                                        className="rounded-circle flex-shrink-0"
                                                    />
                                                    <div className="d-flex gap-2 w-100 justify-content-between">
                                                        <div>
                                                            <h6 className="mb-0">Age</h6>
                                                            <p className="mb-0 opacity-75">{koifishById.age || auction.fish_age} years</p>
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
                                            <source src={koifishById.videoUrl || auction.videoUrl} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            ))}
            <ToastContainer />
        </div>
    );
};

export default ViewFish;