import { React } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap/';

export function NavBar({ user }) {

  onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  }

  //Returns a token from local storage
  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Navbar className="main-nav" sticky="top" bg="light" expand="lg">
      <Container>
        <Navbar.Brand className="navbar-logo" href="/">
          Bechflix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {isAuth() && (
              <Nav.Link href={`/users/${user}`}>Profile</Nav.Link>
            )}
            {isAuth() && (
              <Button variant="link"
                onClick={() => { this.onLoggedOut() }}>
                Logout
              </Button>
            )}
            {isAuth() && (
              <Nav.Link href="/register">Sign Up</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}