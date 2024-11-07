import { Nav, NavDropdown, Navbar, Container, Alert, NavLink } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/apiRequest";
import { FaUsers } from "react-icons/fa";
import { LuWallet } from "react-icons/lu";

function Header({ userRole }) {
  return (
    <body>
      {userRole === "MANAGER" ? (
        <ManagerNavbar />
      ) : userRole === "BREEDER" ? (
        <BreederNavbar />
      ) : userRole === "STAFF" ? (
        <StaffNavbar />
      ) : (
        <MemberHeader />
      )}
    </body>
  );
}

const MemberHeader = () => {
  const user = useSelector((state) => state.auth.profile?.currentUser);
  const wallet = useSelector((state) => state.wallet.currentWallet?.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userTitle, setUserTitle] = useState(user ? user.fullname : null);
  const [auctionTitle, setAuctionTitle] = useState("Auction");
  const formatWallet = new Intl.NumberFormat("de-DE").format(wallet?.balance);

  const handleUserTitle = (title) => {
    setUserTitle(title);
  };

  const handleAuctionTitle = (title) => {
    setAuctionTitle(title);
    handleUserTitle(user?.fullname);
  };

  const handleLogout = () => {
    logOut(dispatch, navigate);
  };

  return (
    <Navbar collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="/logo/betokoi.png"
            alt="Logo Betokoi"
            id="logo"
            onClick={() => handleUserTitle(user?.fullname)}
          />
          Betokoi
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/"
              onClick={() => handleUserTitle(user?.fullname)}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/about"
              onClick={() => handleUserTitle(user?.fullname)}
            >
              About
            </Nav.Link>
            <NavDropdown
              title="Auction"
              id="collapsible-nav-dropdown"
              menuVariant="dark"
            >
              <NavDropdown.Item
                as={Link}
                to="/currentAuction"
                onClick={() => handleAuctionTitle("Current Auction")}
              >
                Current Auction
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/pastAuction"
                onClick={() => handleAuctionTitle("Past Auction")}
              >
                Past Auction
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {user?.fullname ? (
              <>
                <Navbar.Collapse id="navbar-white-example">
                  <Nav.Link className="fw-bold" style={{ color: "#eb1c24" }}>
                  <LuWallet /> Wallet: {formatWallet} vnd
                  </Nav.Link>                
                  
                  <Nav>
                    <NavDropdown
                      id="nav-dropdown-dark-example"
                      className="fw-bold"
                      title={userTitle ? userTitle : user.fullname}
                      menuVariant="dark"
                    >
                      <NavDropdown.Item
                        as={Link}
                        to="/profile"
                        onClick={() => handleUserTitle(user.fullname)}
                      >
                        Profile
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        as={Link}
                        to="/topup"
                      // onClick={() => handleUserTitle("Your Balance")}
                      >
                        Top-Up Wallet
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={handleLogout}>
                        Log out
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>

                  <Nav.Link>
                    <img
                      src={user.avatarUrl}
                      onClick={() => handleUserTitle(user?.fullname)}
                      height={"50px"}
                      width={"50px"}
                    />         
                  </Nav.Link>
                </Navbar.Collapse>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" id="regis">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const ManagerNavbar = () => {
  const user = useSelector((state) => state.auth.profile?.currentUser);
  const name = user?.fullname;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut(dispatch, navigate);
  };

  return (
    <Navbar collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/#">
          <img src="/logo/betokoi.png" alt="Logo Betokoi" id="logo" />
          Betokoi for Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/manageStaff">
              <FaUsers /> Manage Staff
            </Nav.Link>
            <Nav.Link as={Link} to="/request">
              Auction Request
            </Nav.Link>
            <Nav.Link as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/profile">
              Hi, <span>{name}</span>
            </Nav.Link>
            <Nav.Link id="regis" onClick={handleLogout}>
              Log out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const BreederNavbar = () => {
  const user = useSelector((state) => state.auth.profile?.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userTitle, setUserTitle] = useState(user ? user.fullname : null);
  const [auctionTitle, setAuctionTitle] = useState("Auction");

  const handleUserTitle = (title) => {
    setUserTitle(title);
  };

  const handleAuctionTitle = (title) => {
    setAuctionTitle(title);
    handleUserTitle(user?.fullname);
  };

  const handleLogout = () => {
    logOut(dispatch, navigate);
  };

  return (
    <Navbar collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="/logo/betokoi.png"
            alt="Logo Betokoi"
            id="logo"
            onClick={() => handleUserTitle(user?.fullname)}
          />
          Betokoi for Koi Breeder
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/"
              onClick={() => handleUserTitle(user?.fullname)}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/createrequest"
              onClick={() => handleUserTitle(user?.fullname)}
            >
              Your Request
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/managekoifish"
              onClick={() => handleUserTitle(user?.fullname)}
            >
              Manage Koi Fish
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/requestWithDrawals"
              onClick={() => handleUserTitle(user?.fullname)}
            >
              Request Withdrawals
            </Nav.Link>
          </Nav>
          <Nav>
            {user?.fullname ? (
              <>
                <Navbar.Collapse id="navbar-white-example">
                  <Nav>
                    <NavDropdown
                      id="nav-dropdown-dark-example"
                      title={userTitle ? userTitle : user.fullname}
                      menuVariant="dark"
                    >
                      <NavDropdown.Item
                        as={Link}
                        to="/profile"
                        onClick={() => handleUserTitle(user.fullname)}
                      >
                        Profile
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        onClick={() => handleUserTitle("Your Balance")}
                      >
                        Your Balance
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        onClick={() => handleUserTitle("Payment History")}
                      >
                        Payment History
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
                <Nav.Link id="regis" onClick={handleLogout}>
                  Log out
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" id="regis">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const StaffNavbar = () => {
  const user = useSelector((state) => state.auth.profile?.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userTitle, setUserTitle] = useState(user ? user.fullname : null);
  const [auctionTitle, setAuctionTitle] = useState("Auction");

  const handleUserTitle = (title) => {
    setUserTitle(title);
  };

  const handleAuctionTitle = (title) => {
    setAuctionTitle(title);
    handleUserTitle(user?.fullname);
  };

  const handleLogout = () => {
    logOut(dispatch, navigate);
  };

  return (
    <Navbar collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="/logo/betokoi.png"
            alt="Logo Betokoi"
            id="logo"
            onClick={() => handleUserTitle(user?.fullname)}
          />
          Betokoi for Staff
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown
              title="Management"
              id="collapsible-nav-dropdown"
              menuVariant="dark"
            >
              <NavDropdown.Item
                as={Link}
                to="/auction"
                onClick={() => handleUserTitle(user?.fullname)}
              >
                Manage Auction
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/staffrequest"
                onClick={() => handleUserTitle(user?.fullname)}
              >
                Manage Request
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/member"
                onClick={() => handleUserTitle(user?.fullname)}
              >
                Manage User
              </NavDropdown.Item>

              <NavDropdown.Item
                as={Link}
                to="/managetransaction"
                onClick={() => handleUserTitle(user?.fullname)}
              >
                Manage Transaction
              </NavDropdown.Item>
              
            </NavDropdown>
            <NavLink
                as={Link}
                to="/staffreview"
                onClick={() => handleUserTitle(user?.fullname)}
              >
                Review Request
              </NavLink>
              <NavLink
                as={Link}
                to="/manageDelivery"
                onClick={() => handleUserTitle(user?.fullname)}
              >
                Manage Delivery
              </NavLink>
              
              <NavLink
                as={Link}
                to="/managePendingWithDrawal"
                onClick={() => handleUserTitle(user?.fullname)}
              >
                Manage Pending Withdrawal
              </NavLink>
          </Nav>
          <Nav>
            {user?.fullname ? (
              <>
                <Navbar.Collapse id="navbar-white-example">
                  <Nav>
                    <NavDropdown
                      id="nav-dropdown-dark-example"
                      title={userTitle ? userTitle : user.fullname}
                      menuVariant="dark"
                    >
                      <NavDropdown.Item
                        as={Link}
                        to="/profile"
                        onClick={() => handleUserTitle(user.fullname)}
                      >
                        Profile
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        onClick={() => handleUserTitle("Your Balance")}
                      >
                        Your Balance
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        onClick={() => handleUserTitle("Payment History")}
                      >
                        Payment History
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
                <Nav.Link id="regis" onClick={handleLogout}>
                  Log out
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" id="regis">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;
