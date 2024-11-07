import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Header from "./components/Header/Header.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import About from "./pages/About/About.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Register from "./pages/Register/Register.jsx";
import CurrentAuction from "./pages/CurrentAuction/CurrentAuction.jsx";
import PastAuction from "./pages/PastAuction/PastAuction.jsx";
import AuctionView from "./pages/AuctionView/AuctionView.jsx";
import Forbidden403 from "./pages/Forbidden403/Forbidden403.jsx";
import DemoAxios from "./components/DemoAxios.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Member from "./pages/ManageUser/ManageUser.jsx";
import ManageStaff from "./pages/ManageStaff/ManageStaff.jsx";
import Request from "./pages/Request/MRequest.jsx";
import StaffRequest from "./pages/StaffRequest/Request.jsx";
import StaffReview from "./pages/StaffReview/StaffReview.jsx";
import Auction from "./pages/StaffManageAuction/Auction.jsx";
import CreateRequest from "./pages/CreateRequest/CreateRequest.jsx";
import FirebaseImageUpload from "./pages/FirebaseImageUpload/FirebaseImageUpload.jsx";
import Dashboard from "./pages/DashBoard/DashBoard.jsx";
import BoardChart from "./pages/DashBoard/BoardChart.jsx";
import StatCard from "./pages/DashBoard/StatCard.jsx";
import DonutChart from "./pages/DashBoard/DonutChart.jsx";
import Topup from "./pages/Topup/Topup.jsx";
import TopupSuccess from "./pages/TopupSuccess/TopupSuccess.jsx";
import ManageKoiFish from "./pages/ManageKoiFish/ManageKoiFish.jsx";
import { 
  loadWebsocketPendingMessage,
  loadWebsocketStartMessage } from "./redux/messageSlice.jsx";
import ManageDelivery from "./pages/ManageDelivery/ManageDelivery.jsx";
import ManageTransaction from "./pages/ManageTransaction/ManageTransaction.jsx";
import ManagePendingWithDrawal from "./pages/ManagePendingWithDrawal/ManagePendingWithDrawal.jsx";
import RequestWithDrawals from "./pages/RequestWithDrawals/RequestWithDrawals.jsx";
import AuctionPreview from "./pages/AuctionPreview/auctionPreview.jsx";
import { Client } from "@stomp/stompjs";


function App() {
  const CURRENT_USER_ROLE = useSelector((state) =>
    state.auth.profile.currentUser
      ? state.auth.profile.currentUser.role
      : "GUEST"
  );

  const CURRENT_AUCTION_TYPE = useSelector((state) => state.message.websocketPendingMessage?.methodType);

  const dispatch = useDispatch();

  // const CURRENT_USER_ROLE = "customer"

  function PublicElement({ children }) {
    return <>{children}</>;
  }

  function MemberElement({ children }) {
    if (CURRENT_USER_ROLE === "MEMBER") {
      return <>{children}</>;
    } else {
      return <Navigate to={"/login"} />;
    }
  }

  function StaffElement({ children }) {
    if (CURRENT_USER_ROLE === "STAFF") {
      return <>{children}</>;
    } else {
      return <Navigate to={"/forbidden403"} />;
    }
  }

  function ManagerElement({ children }) {
    if (CURRENT_USER_ROLE === "MANAGER") {
      return <>{children}</>;
    } else {
      return <Navigate to={"/forbidden403"} />;
    }
  }

  function BreederElement({ children }) {
    if (CURRENT_USER_ROLE === "BREEDER") {
      return <>{children}</>;
    } else {
      return <Navigate to={"/login"} />;
    }
  }

  useEffect(() => {
    console.log(CURRENT_USER_ROLE);
    console.log(CURRENT_AUCTION_TYPE);
  }, []);

  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://localhost:8081/auctionkoi/ws",
      onConnect: () => {
        console.log('Connected to WebSocket');

        // Gửi yêu cầu lấy lại các thông báo cũ
        client.publish({
          destination: '/app/request-pending',
          body: JSON.stringify({ request: "pending-messages" })
        });

        client.subscribe('/auctions/pending', (msg) => {
          const parsedMessage = JSON.parse(msg.body);
          console.log(parsedMessage);
          // Lưu vào sessionStorage
          dispatch(loadWebsocketPendingMessage(JSON.parse(msg.body)));
        });

        client.subscribe('/auctions/start', (msg) => {
          const parsedMessage = JSON.parse(msg.body);
          console.log(parsedMessage);
          // Lưu vào sessionStorage
          dispatch(loadWebsocketStartMessage(parsedMessage));
          // sessionStorage.setItem('websocketStartMessage', JSON.stringify(parsedMessage));
        });
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, []); // Chỉ chạy một lần khi component mount

  return (
    <Router>
      <div className="wrapper">
        <Header userRole={CURRENT_USER_ROLE} />
        <div className="main">
          <Routes>
            <Route path="/" element={<PublicElement><Home userRole={CURRENT_USER_ROLE} /></PublicElement>} />
            <Route path="/about" element={<PublicElement><About /></PublicElement>} />
            <Route path="/pastAuction" element={<PublicElement><PastAuction /></PublicElement>} />
            <Route path="/login" element={<PublicElement><Login /></PublicElement>} />
            <Route path="/register" element={<PublicElement><Register /></PublicElement>} />
            <Route path="/profile" element={<PublicElement><Profile userRole={CURRENT_USER_ROLE} /></PublicElement>} />
            <Route path="/uploadImage" element={<PublicElement><FirebaseImageUpload /></PublicElement>} />

            <Route path="/currentAuction" element={<MemberElement><CurrentAuction /></MemberElement>} />
            <Route path="/auctionView" element={<MemberElement><AuctionView auctionType={CURRENT_AUCTION_TYPE} /></MemberElement>} />
            <Route path="/auctionPreview" element={<MemberElement><AuctionPreview auctionType={CURRENT_AUCTION_TYPE} /></MemberElement>} />
            <Route path="/topup" element={<MemberElement><Topup /></MemberElement>} />
            <Route path="/topupSuccess" element={<MemberElement><TopupSuccess /></MemberElement>} />

            <Route path="/manageStaff" element={<ManagerElement><ManageStaff /></ManagerElement>} />
            <Route path="/request" element={<ManagerElement><Request /></ManagerElement>} />
            <Route path="/dashboard" element={<ManagerElement><Dashboard /></ManagerElement>} />
            <Route path="/boardchart" element={<ManagerElement><BoardChart /></ManagerElement>} />
            <Route path="/donutchart" element={<ManagerElement><DonutChart /></ManagerElement>} />
            <Route path="/statcard" element={<ManagerElement><StatCard /></ManagerElement>} />

            <Route path="/staffrequest" element={<StaffElement><StaffRequest /></StaffElement>} />
            <Route path="/auction" element={<StaffElement><Auction /></StaffElement>} />
            <Route path="/member" element={<StaffElement><Member /></StaffElement>} />
            <Route path="/staffreview" element={<StaffElement><StaffReview /></StaffElement>} />
            <Route path="/manageDelivery" element={<StaffElement><ManageDelivery /></StaffElement>} />
            <Route path="/managetransaction" element={<StaffElement><ManageTransaction /></StaffElement>} />
            <Route path="/managePendingWithDrawal" element={<StaffElement><ManagePendingWithDrawal /></StaffElement>} />

            <Route path="/createrequest" element={<BreederElement><CreateRequest /></BreederElement>} />
            <Route path="/managekoifish" element={<BreederElement><ManageKoiFish /></BreederElement>} />
            <Route path="/requestWithDrawals" element={<BreederElement><RequestWithDrawals /></BreederElement>} />
            <Route path="/forbidden403" element={<Forbidden403 />} />
            <Route path="*" element={<div>Page Not Found!</div>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

function Manager() {
  return <div>Manager Page</div>;
}

export default App;
