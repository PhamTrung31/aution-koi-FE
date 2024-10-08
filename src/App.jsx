import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Header from "./components/Header/Header.jsx";
// import Home from "./pages/Home/Home.jsx";
// import Login from "./pages/Login/Login.jsx";
// import About from "./pages/About/About.jsx";
// import Register from "./pages/Register/Register.jsx";
// import CurrentAuction from "./pages/CurrentAuction/CurrentAuction.jsx";
// import PastAuction from "./pages/PastAuction/PastAuction.jsx";
// import DemoAxios from "./components/DemoAxios.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Member from "./manager/Member/Member.jsx";
import Request from "./staff/Request/Request.jsx";
import Auction from "./staff/Auction/Auction.jsx";
import Header from "./staff/Header/Header.jsx";
import Home from "./staff/Home.jsx";
import ManageStaff from "./manager/Staff/ManageStaff.jsx";
import MRequest from "./manager/Request/MRequest.jsx";
import Breeder from "./manager/Breeder/Breeder.jsx";

// function App() {
//   return (
//     <Router>
//       <div className="wrapper">
//         <Header />
//         <div className="main">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/currentAuction" element={<CurrentAuction />} />
//             <Route path="/pastAuction" element={<PastAuction />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//           </Routes>
//         </div>
//         <Footer />
//       </div>
//     </Router>
//   );
// }
function App() {
  return (
    <Router>
      <div className="wrapper">
        <Header />
        <div className="main">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/member" element={<Member />} />
            <Route path="/request" element={<Request />} />
            <Route path="/auction" element={<Auction />} />
            <Route path="/manageStaff" element={<ManageStaff />} />
            <Route path="/mrequest" element={<MRequest />} />
            <Route path="/breeder" element={<Breeder />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
