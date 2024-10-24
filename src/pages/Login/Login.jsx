import axios from "axios";
import { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { loginPayload } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginInitial } from "../../redux/authSlice";

function Login() {
    const error = useSelector((state) => state.auth.login.error);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const notify = () => toast.error(error.message);

    const handleLogin = (e) => {
        e.preventDefault();
        const payload = {
            username: username,
            password: password
        };

        loginPayload(payload, dispatch, navigate);
    }

    async function handleGoogleLogin() {

    }

    useEffect(() => {
        if (error !== null) {
            notify();
            dispatch(loginInitial());
        }
    }, [error])


    return (
        <div className="modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-5" tabindex="-1" role="dialog" id="modalSignin">
            <div className="modal-dialog" role="document">
                <div className="modal-content rounded-4 shadow">
                    <div className="modal-header p-5 pb-4 border-bottom-0" style={{ justifyContent: "center" }}>
                        <h1 className="fw-bold mb-0 fs-2">Login</h1>
                    </div>
                    <form onSubmit={handleLogin}>
                        <div className="modal-body p-5 pt-0">
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control rounded-3"
                                    id="floatingInput"
                                    placeholder="name@example.com"
                                    onChange={e => setUsername(e.target.value)}
                                />
                                <label for="floatingInput">Username</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="password"
                                    className="form-control rounded-3"
                                    id="floatingPassword"
                                    placeholder="Password"
                                    onChange={e => setPassword(e.target.value)}
                                />
                                <label for="floatingPassword">Password</label>
                            </div>
                            <a href="">Forgot password?</a>
                            <hr />
                            <button
                                className="w-100 mb-2 btn btn-lg rounded-3 btn-warning"
                                type="submit">
                                Log In
                            </button>
                            <button
                                className="w-100 py-2 mb-2 btn btn-outline-danger rounded-3"
                                type="button">
                                <svg
                                    className="bi me-1"
                                    width="16"
                                    height="16"><use xlink:href="#google"></use></svg>
                                Continue with Google <FaGoogle />
                            </button>
                        </div>
                    </form>
                </div>
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
                transition:Bounce
            />
        </div >
    );
}

export default Login