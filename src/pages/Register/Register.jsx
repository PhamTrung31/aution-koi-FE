import { useState } from 'react';
import { registerUser } from '../../redux/apiRequest';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const newUser = {
            username: username, /* Khởi tạo biến thì phải trùng với tên trong dtb */
            password: password,
            fullname: fullname,
            phone: phone,
            address: address,
        }
        console.log(newUser)
        registerUser(newUser, dispatch, navigate)
    }

    return (
        <div className="modal-sheet position-static d-block bg-body-secondary p-4 py-md-5 d-flex align-items-center" tabindex="-1" role="dialog" id="modalSignin">
            <div className="modal-dialog p-4 py-md-5 w-25" role="document">
                <div className="modal modal-content rounded-4 shadow">
                    <div className="modal-header p-5 pb-4 border-bottom-0" style={{ justifyContent: "center" }}>
                        <h1 className="fw-bold mb-0 fs-2">Register</h1>
                    </div>
                    <form onSubmit={handleRegister}>
                        <div className="modal-body p-5 pt-0">
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control rounded-3"
                                    id="floatingInput"
                                    placeholder="name@example.com"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <label for="floatingInput">Username</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    className="form-control rounded-3"
                                    id="floatingPassword"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <label for="floatingPassword">Password</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text"
                                    className="form-control rounded-3"
                                    id="floatingInput"
                                    placeholder="name@example.com"
                                    onChange={(e) => setFullname(e.target.value)}
                                />
                                <label for="floatingInput">Full Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text"
                                    className="form-control rounded-3"
                                    id="floatingInput"
                                    placeholder="name@example.com"
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                <label for="floatingInput">Phone</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text"
                                    className="form-control rounded-3"
                                    id="floatingInput"
                                    placeholder="name@example.com"
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                <label for="floatingInput">Address</label>
                            </div>
                            <button
                                className="w-100 mb-2 btn btn-lg rounded-3 btn-outline-danger"
                                type="submit"
                            >
                                Register
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default Register