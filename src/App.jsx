import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import About from "./pages/About/About.jsx";
import Register from "./pages/Register/Register.jsx";
import CurrentAuction from "./pages/CurrentAuction/CurrentAuction.jsx";
import PastAuction from "./pages/PastAuction/PastAuction.jsx";
import DemoAxios from "./components/DemoAxios.jsx";
import Footer from "./components/Footer/Footer.jsx";
// import User from "./staff/User/User.jsx";
// import Request from "./staff/Request.jsx";
// import Auction from "./staff/Auction.jsx";
// import Header from "./staff/Header/Header.jsx";
// import Home from "./staff/Home.jsx";

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Header />
        <div className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/currentAuction" element={<CurrentAuction />} />
            <Route path="/pastAuction" element={<PastAuction />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
// function App() {
//   return (
//     <Router>
//       <div className="wrapper">
//         <Header />
//         <div className="main">
//           <Routes>
//             <Route path="/home" element={<Home />} />
//             <Route path="/user" element={<User />} />
//             <Route path="/request" element={<Request />} />
//             <Route path="/auction" element={<Auction />} />
//           </Routes>
//         </div>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

export default App;
