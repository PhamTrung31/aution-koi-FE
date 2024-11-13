import { useDispatch, useSelector } from 'react-redux'
import './Profile.css'
import { useNavigate, Link } from 'react-router-dom'
import Forbidden403 from '../Forbidden403/Forbidden403'
import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uploadImage from "../../utils/firebase/uploadImage.jsx";
import { changeAvatarImage, getUserProfile } from '../../redux/apiRequest.jsx';

function Profile({ userRole }) {
  const navigate = useNavigate();

  return (
    <body>
      {userRole === "MANAGER" ? (
        <ManagerProfile />
      ) : userRole === "STAFF" ? (
        <StaffProfile />
      ) : userRole === "BREEDER" ? (
        <BreederProfile />
      ) : userRole === "MEMBER" ? (
        <MemberProfile />
      ) : (
        <Forbidden403 />
      )}
    </body>
  )
}

const MemberProfile = () => {
  const { currentUser } = useSelector((state) => state.auth.profile);
  const token = useSelector((state) => state.auth.login?.currentToken.token);
  const [img, setImg] = useState("");
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageClick = () => {
    inputRef.current.click();
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImg(file);
  }

  const handleUploadAvatar = async () => {
    if (!img) {
      toast.error("No image changes");
      return;
    }

    const url = await uploadImage(img);
    if (url) {
      const payload = {
        avatarUrl: url
      };
      changeAvatarImage(token, currentUser.id, payload, dispatch, navigate);
      toast.success("Avatar updated successfully!");
    }
  };

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src={currentUser.avatarUrl ? currentUser.avatarUrl : "https://www.redmond.gov/ImageRepository/Document?documentId=15106"}
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: '150px', height: '150px' }}
                />
                <h5 className="my-3 fs-3">{currentUser.fullname}</h5>
                <button className='btn btn-primary mt-3' data-bs-toggle="modal" data-bs-target="#exampleModal">Change avatar</button>
                {/* Model */}
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Choose Avatar</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body" onClick={handleImageClick}>
                        {img ? (
                          <img src={URL.createObjectURL(img)} alt="upload" style={{ height: '300px', width: '300px' }} />
                        ) : (
                          <img src="\logo\upload.webp" alt="upload" style={{ height: '300px', width: '300px' }} />
                        )}
                        <input type="file" ref={inputRef} onChange={handleImageChange} style={{ display: 'none' }} />
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" onClick={handleUploadAvatar}>Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mb-4 mb-lg-0">
              <div className="card-body">
                <p className="mb-2 fs-4">
                  Auction's <span className="text-danger me-1 fw-bold">Notification</span>
                </p>
                <ul className="list-group list-group-flush rounded-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  <li className="list-group-item justify-content-between align-items-center p-2">
                    <i className="fas fa-globe fa-lg text-warning"></i>
                    <p className="mb-0">https://mdbootstrap.com</p>
                  </li>
                  <li className="list-group-item justify-content-between align-items-center p-2">
                    <i className="fab fa-github fa-lg text-body"></i>
                    <p className="mb-0">mdbootstrap</p>
                  </li>
                  <li className="list-group-item justify-content-between align-items-center p-2">
                    <i className="fab fa-twitter fa-lg" style={{ color: '#55acee' }}></i>
                    <p className="mb-0">@mdbootstrap</p>
                  </li>
                  <li className="list-group-item justify-content-between align-items-center p-2">
                    <i className="fab fa-instagram fa-lg" style={{ color: '#ac2bac' }}></i>
                    <p className="mb-0">mdbootstrap</p>
                  </li>
                  <li className="list-group-item justify-content-between align-items-center p-2">
                    <i className="fab fa-facebook-f fa-lg" style={{ color: '#3b5998' }}></i>
                    <p className="mb-0">mdbootstrap</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Full Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{currentUser.fullname}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email / Username</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{currentUser.username}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Password</p>
                  </div>
                  <div className="col-sm-9">
                    <button type="button" className="btn btn-outline-primary ms-1">
                      Change Password
                    </button>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Phone</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{currentUser.phone}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Address</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{currentUser.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-body">
                <p className="mb-1 fs-4">
                  <span className="text-primary me-1 fw-bold">Participated Auction</span>
                </p>
                <ul className="list-group list-group-flush rounded-3" style={{ height: '210px', maxHeight: '210px', overflowY: 'auto' }}>
                  <li className="list-group-item justify-content-between align-items-center p-3">
                    <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                      <div class="d-flex gap-2 w-100 justify-content-between row">
                        <div className="col-sm-5">
                          <h6 className="mb-0">Auction #10 - End date: 12/3/2024</h6>
                        </div>
                        <div className='col-sm-4'>Winner: {currentUser.fullname}</div>
                        <div className="col-sm-2">
                          <Link to='/'>View Detail</Link>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="list-group-item justify-content-between align-items-center p-3">
                    <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                      <div class="d-flex gap-2 w-100 justify-content-between row">
                        <div className="col-sm-5">
                          <h6 className="mb-0">Auction #10 - End date: 12/3/2024</h6>
                        </div>
                        <div className='col-sm-4'>Winner: {currentUser.fullname}</div>
                        <div className="col-sm-2">
                          <Link to='/'>View Detail</Link>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="list-group-item justify-content-between align-items-center p-3">
                    <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                      <div class="d-flex gap-2 w-100 justify-content-between row">
                        <div className="col-sm-5">
                          <h6 className="mb-0">Auction #10 - End date: 12/3/2024</h6>
                        </div>
                        <div className='col-sm-4'>Winner: {currentUser.fullname}</div>
                        <div className="col-sm-2">
                          <Link to='/'>View Detail</Link>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="list-group-item justify-content-between align-items-center p-3 auction">
                    <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                      <img src="https://github.com/twbs.png" alt="twbs" width="32" height="32" class="rounded-circle flex-shrink-0" />
                      <div class="d-flex gap-2 w-100 justify-content-between">
                        <div>
                          <h6 class="mb-0">Third heading</h6>
                          <p class="mb-0 opacity-75">Some placeholder content in a paragraph.</p>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
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
    </section>
  )
}
const BreederProfile = () => {
  const { currentUser } = useSelector((state) => state.auth.profile);
  const token = useSelector((state) => state.auth.login?.currentToken.token);
  const [img, setImg] = useState("");
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageClick = () => {
    inputRef.current.click();
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImg(file);
  }

  const handleUploadAvatar = async () => {
    if (!img) {
      toast.error("No image changes");
      return;
    }

    const url = await uploadImage(img);
    if (url) {
      const payload = {
        avatarUrl: url
      };
      changeAvatarImage(token, currentUser.id, payload, dispatch, navigate);
      toast.success("Avatar updated successfully!");
    }
  };

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src={currentUser.avatarUrl ? currentUser.avatarUrl : "https://www.redmond.gov/ImageRepository/Document?documentId=15106"}
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: '150px', height: '150px' }}
                />
                <h5 className="my-3 fs-3">{currentUser.fullname}</h5>
                <button className='btn btn-primary mt-3' data-bs-toggle="modal" data-bs-target="#exampleModal">Change avatar</button>
                {/* Model */}
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Choose Avatar</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body" onClick={handleImageClick}>
                        {img ? (
                          <img src={URL.createObjectURL(img)} alt="upload" style={{ height: '300px', width: '300px' }} />
                        ) : (
                          <img src="\logo\upload.webp" alt="upload" style={{ height: '300px', width: '300px' }} />
                        )}
                        <input type="file" ref={inputRef} onChange={handleImageChange} style={{ display: 'none' }} />
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" onClick={handleUploadAvatar}>Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mb-4 mb-lg-0">
              <div className="card-body">
                <p className="mb-2 fs-4">
                  Auction's <span className="text-danger me-1 fw-bold">Notification</span>
                </p>
                <ul className="list-group list-group-flush rounded-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  <li className="list-group-item justify-content-between align-items-center p-2">
                    <i className="fas fa-globe fa-lg text-warning"></i>
                    <p className="mb-0">https://mdbootstrap.com</p>
                  </li>
                  <li className="list-group-item justify-content-between align-items-center p-2">
                    <i className="fab fa-github fa-lg text-body"></i>
                    <p className="mb-0">mdbootstrap</p>
                  </li>
                  <li className="list-group-item justify-content-between align-items-center p-2">
                    <i className="fab fa-twitter fa-lg" style={{ color: '#55acee' }}></i>
                    <p className="mb-0">@mdbootstrap</p>
                  </li>
                  <li className="list-group-item justify-content-between align-items-center p-2">
                    <i className="fab fa-instagram fa-lg" style={{ color: '#ac2bac' }}></i>
                    <p className="mb-0">mdbootstrap</p>
                  </li>
                  <li className="list-group-item justify-content-between align-items-center p-2">
                    <i className="fab fa-facebook-f fa-lg" style={{ color: '#3b5998' }}></i>
                    <p className="mb-0">mdbootstrap</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Full Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{currentUser.fullname}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email / Username</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{currentUser.username}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Password</p>
                  </div>
                  <div className="col-sm-9">
                    <button type="button" className="btn btn-outline-primary ms-1">
                      Change Password
                    </button>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Phone</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{currentUser.phone}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Address</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{currentUser.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-body">
                <p className="mb-1 fs-4">
                  <span className="text-primary me-1 fw-bold">Participated Auction</span>
                </p>
                <ul className="list-group list-group-flush rounded-3" style={{ height: '210px', maxHeight: '210px', overflowY: 'auto' }}>
                  <li className="list-group-item justify-content-between align-items-center p-3">
                    <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                      <div class="d-flex gap-2 w-100 justify-content-between row">
                        <div className="col-sm-5">
                          <h6 className="mb-0">Auction #10 - End date: 12/3/2024</h6>
                        </div>
                        <div className='col-sm-4'>Winner: {currentUser.fullname}</div>
                        <div className="col-sm-2">
                          <Link to='/'>View Detail</Link>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="list-group-item justify-content-between align-items-center p-3">
                    <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                      <div class="d-flex gap-2 w-100 justify-content-between row">
                        <div className="col-sm-5">
                          <h6 className="mb-0">Auction #10 - End date: 12/3/2024</h6>
                        </div>
                        <div className='col-sm-4'>Winner: {currentUser.fullname}</div>
                        <div className="col-sm-2">
                          <Link to='/'>View Detail</Link>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="list-group-item justify-content-between align-items-center p-3">
                    <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                      <div class="d-flex gap-2 w-100 justify-content-between row">
                        <div className="col-sm-5">
                          <h6 className="mb-0">Auction #10 - End date: 12/3/2024</h6>
                        </div>
                        <div className='col-sm-4'>Winner: {currentUser.fullname}</div>
                        <div className="col-sm-2">
                          <Link to='/'>View Detail</Link>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="list-group-item justify-content-between align-items-center p-3 auction">
                    <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                      <img src="https://github.com/twbs.png" alt="twbs" width="32" height="32" class="rounded-circle flex-shrink-0" />
                      <div class="d-flex gap-2 w-100 justify-content-between">
                        <div>
                          <h6 class="mb-0">Third heading</h6>
                          <p class="mb-0 opacity-75">Some placeholder content in a paragraph.</p>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
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
    </section>
  )
}
const StaffProfile = () => {
  const { currentUser } = useSelector((state) => state.auth.profile);
  const token = useSelector((state) => state.auth.login?.currentToken.token);
  const [img, setImg] = useState("");
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageClick = () => {
    inputRef.current.click();
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImg(file);
  }

  const handleUploadAvatar = async () => {
    if (!img) {
      toast.error("No image changes");
      return;
    }

    const url = await uploadImage(img);
    if (url) {
      const payload = {
        avatarUrl: url
      };
      changeAvatarImage(token, currentUser.id, payload, dispatch, navigate);
      toast.success("Avatar updated successfully!");
    }
  };

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src={currentUser.avatarUrl ? currentUser.avatarUrl : "https://www.redmond.gov/ImageRepository/Document?documentId=15106"}
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: '150px', height: '150px' }}
                />
                <h5 className="my-3 fs-3">{currentUser.fullname}</h5>
                <button className='btn btn-primary mt-3' data-bs-toggle="modal" data-bs-target="#exampleModal">Change avatar</button>
                {/* Model */}
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Choose Avatar</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body" onClick={handleImageClick}>
                        {img ? (
                          <img src={URL.createObjectURL(img)} alt="upload" style={{ height: '300px', width: '300px' }} />
                        ) : (
                          <img src="\logo\upload.webp" alt="upload" style={{ height: '300px', width: '300px' }} />
                        )}
                        <input type="file" ref={inputRef} onChange={handleImageChange} style={{ display: 'none' }} />
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" onClick={handleUploadAvatar}>Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mb-4 mb-lg-0">
              <div className="card-body">
                <p className="mb-2 fs-4">
                  Auction's <span className="text-danger me-1 fw-bold">Notification</span>
                </p>
                <ul className="list-group list-group-flush rounded-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  <li className="list-group-item justify-content-between align-items-center p-2">
                    <i className="fas fa-globe fa-lg text-warning"></i>
                    <p className="mb-0">https://mdbootstrap.com</p>
                  </li>
                  <li className="list-group-item justify-content-between align-items-center p-2">
                    <i className="fab fa-github fa-lg text-body"></i>
                    <p className="mb-0">mdbootstrap</p>
                  </li>
                  <li className="list-group-item justify-content-between align-items-center p-2">
                    <i className="fab fa-twitter fa-lg" style={{ color: '#55acee' }}></i>
                    <p className="mb-0">@mdbootstrap</p>
                  </li>
                  <li className="list-group-item justify-content-between align-items-center p-2">
                    <i className="fab fa-instagram fa-lg" style={{ color: '#ac2bac' }}></i>
                    <p className="mb-0">mdbootstrap</p>
                  </li>
                  <li className="list-group-item justify-content-between align-items-center p-2">
                    <i className="fab fa-facebook-f fa-lg" style={{ color: '#3b5998' }}></i>
                    <p className="mb-0">mdbootstrap</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Full Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{currentUser.fullname}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email / Username</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{currentUser.username}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Password</p>
                  </div>
                  <div className="col-sm-9">
                    <button type="button" className="btn btn-outline-primary ms-1">
                      Change Password
                    </button>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Phone</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{currentUser.phone}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Address</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{currentUser.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-body">
                <p className="mb-1 fs-4">
                  <span className="text-primary me-1 fw-bold">Participated Auction</span>
                </p>
                <ul className="list-group list-group-flush rounded-3" style={{ height: '210px', maxHeight: '210px', overflowY: 'auto' }}>
                  <li className="list-group-item justify-content-between align-items-center p-3">
                    <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                      <div class="d-flex gap-2 w-100 justify-content-between row">
                        <div className="col-sm-5">
                          <h6 className="mb-0">Auction #10 - End date: 12/3/2024</h6>
                        </div>
                        <div className='col-sm-4'>Winner: {currentUser.fullname}</div>
                        <div className="col-sm-2">
                          <Link to='/'>View Detail</Link>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="list-group-item justify-content-between align-items-center p-3">
                    <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                      <div class="d-flex gap-2 w-100 justify-content-between row">
                        <div className="col-sm-5">
                          <h6 className="mb-0">Auction #10 - End date: 12/3/2024</h6>
                        </div>
                        <div className='col-sm-4'>Winner: {currentUser.fullname}</div>
                        <div className="col-sm-2">
                          <Link to='/'>View Detail</Link>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="list-group-item justify-content-between align-items-center p-3">
                    <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                      <div class="d-flex gap-2 w-100 justify-content-between row">
                        <div className="col-sm-5">
                          <h6 className="mb-0">Auction #10 - End date: 12/3/2024</h6>
                        </div>
                        <div className='col-sm-4'>Winner: {currentUser.fullname}</div>
                        <div className="col-sm-2">
                          <Link to='/'>View Detail</Link>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="list-group-item justify-content-between align-items-center p-3 auction">
                    <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                      <img src="https://github.com/twbs.png" alt="twbs" width="32" height="32" class="rounded-circle flex-shrink-0" />
                      <div class="d-flex gap-2 w-100 justify-content-between">
                        <div>
                          <h6 class="mb-0">Third heading</h6>
                          <p class="mb-0 opacity-75">Some placeholder content in a paragraph.</p>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
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
    </section>
  )
}
const ManagerProfile = () => {
  const { currentUser } = useSelector((state) => state.auth.profile);
  const token = useSelector((state) => state.auth.login?.currentToken.token);
  const [img, setImg] = useState("");
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageClick = () => {
    inputRef.current.click();
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImg(file);
  }

  const handleUploadAvatar = async () => {
    if (!img) {
      toast.error("No image changes");
      return;
    }

    const url = await uploadImage(img);
    if (url) {
      const payload = {
        avatarUrl: url
      };
      changeAvatarImage(token, currentUser.id, payload, dispatch, navigate);
      toast.success("Avatar updated successfully!");
    }
  };

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src={currentUser.avatarUrl ? currentUser.avatarUrl : "https://www.redmond.gov/ImageRepository/Document?documentId=15106"}
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: '150px', height: '150px' }}
                />
                <h5 className="my-3 fs-3">{currentUser.fullname}</h5>
                <button className='btn btn-primary mt-3' data-bs-toggle="modal" data-bs-target="#exampleModal">Change avatar</button>
                {/* Model */}
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Choose Avatar</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body" onClick={handleImageClick}>
                        {img ? (
                          <img src={URL.createObjectURL(img)} alt="upload" style={{ height: '300px', width: '300px' }} />
                        ) : (
                          <img src="\logo\upload.webp" alt="upload" style={{ height: '300px', width: '300px' }} />
                        )}
                        <input type="file" ref={inputRef} onChange={handleImageChange} style={{ display: 'none' }} />
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" onClick={handleUploadAvatar}>Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mb-4 mb-lg-0">
              <div className="card-body">
                <p className="mb-2 fs-4">
                  Auction's <span className="text-danger me-1 fw-bold">Notification</span>
                </p>
                <ul className="list-group list-group-flush rounded-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  <li className="list-group-item justify-content-between align-items-center p-2">
                    <i className="fas fa-globe fa-lg text-warning"></i>
                    <p className="mb-0">https://mdbootstrap.com</p>
                  </li>
                  <li className="list-group-item justify-content-between align-items-center p-2">
                    <i className="fab fa-github fa-lg text-body"></i>
                    <p className="mb-0">mdbootstrap</p>
                  </li>
                  <li className="list-group-item justify-content-between align-items-center p-2">
                    <i className="fab fa-twitter fa-lg" style={{ color: '#55acee' }}></i>
                    <p className="mb-0">@mdbootstrap</p>
                  </li>
                  <li className="list-group-item justify-content-between align-items-center p-2">
                    <i className="fab fa-instagram fa-lg" style={{ color: '#ac2bac' }}></i>
                    <p className="mb-0">mdbootstrap</p>
                  </li>
                  <li className="list-group-item justify-content-between align-items-center p-2">
                    <i className="fab fa-facebook-f fa-lg" style={{ color: '#3b5998' }}></i>
                    <p className="mb-0">mdbootstrap</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Full Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{currentUser.fullname}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email / Username</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{currentUser.username}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Password</p>
                  </div>
                  <div className="col-sm-9">
                    <button type="button" className="btn btn-outline-primary ms-1">
                      Change Password
                    </button>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Phone</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{currentUser.phone}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Address</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{currentUser.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-body">
                <p className="mb-1 fs-4">
                  <span className="text-primary me-1 fw-bold">Participated Auction</span>
                </p>
                <ul className="list-group list-group-flush rounded-3" style={{ height: '210px', maxHeight: '210px', overflowY: 'auto' }}>
                  <li className="list-group-item justify-content-between align-items-center p-3">
                    <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                      <div class="d-flex gap-2 w-100 justify-content-between row">
                        <div className="col-sm-5">
                          <h6 className="mb-0">Auction #10 - End date: 12/3/2024</h6>
                        </div>
                        <div className='col-sm-4'>Winner: {currentUser.fullname}</div>
                        <div className="col-sm-2">
                          <Link to='/'>View Detail</Link>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="list-group-item justify-content-between align-items-center p-3">
                    <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                      <div class="d-flex gap-2 w-100 justify-content-between row">
                        <div className="col-sm-5">
                          <h6 className="mb-0">Auction #10 - End date: 12/3/2024</h6>
                        </div>
                        <div className='col-sm-4'>Winner: {currentUser.fullname}</div>
                        <div className="col-sm-2">
                          <Link to='/'>View Detail</Link>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="list-group-item justify-content-between align-items-center p-3">
                    <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                      <div class="d-flex gap-2 w-100 justify-content-between row">
                        <div className="col-sm-5">
                          <h6 className="mb-0">Auction #10 - End date: 12/3/2024</h6>
                        </div>
                        <div className='col-sm-4'>Winner: {currentUser.fullname}</div>
                        <div className="col-sm-2">
                          <Link to='/'>View Detail</Link>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="list-group-item justify-content-between align-items-center p-3 auction">
                    <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                      <img src="https://github.com/twbs.png" alt="twbs" width="32" height="32" class="rounded-circle flex-shrink-0" />
                      <div class="d-flex gap-2 w-100 justify-content-between">
                        <div>
                          <h6 class="mb-0">Third heading</h6>
                          <p class="mb-0 opacity-75">Some placeholder content in a paragraph.</p>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
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
    </section>
  )
}

export default Profile