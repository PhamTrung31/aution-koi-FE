import { Nav, NavDropdown, Navbar, Container, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <Navbar collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src="/logo/betokoi.png" alt="Logo Betokoi" id="logo" />
          Betokoi
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/user">
              User
            </Nav.Link>
            <Nav.Link as={Link} to="/request">
              Request
            </Nav.Link>
            <Nav.Link as={Link} to="/auction">
              Auction
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
