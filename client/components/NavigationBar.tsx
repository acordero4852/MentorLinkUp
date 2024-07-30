'use client';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/esm/InputGroup';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useRouter } from 'next/navigation';
import Image from 'react-bootstrap/Image';
import * as Icon from './Icon';

export const NavigationBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">MentorLinkUp</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/feature">Feature</Nav.Link>
          </Nav>
          <Nav>
            <Button
              href="/login"
              variant="outline-dark"
              className="me-lg-3 my-2 my-lg-0"
            >
              Login
            </Button>
            <Button href="/register" variant="dark">
              Sign Up
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export const DashboardNavigationBar = () => {
  const router = useRouter();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  }

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/dashboard">MentorLinkUp</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
        >
          <Nav className="me-auto">
            <Nav.Link href="/mentors">Mentors</Nav.Link>
            <Nav.Link href="/mentees">Mentees</Nav.Link>
          </Nav>
          <Nav>
            <InputGroup>
              <InputGroup.Text>
                <Icon.MagnifyingGlass />
              </InputGroup.Text>
              <Form.Control type="text" placeholder="Search" />
            </InputGroup>
            <Nav.Link href="/message">
              <Icon.ChatCircle />
            </Nav.Link>
            <Nav.Link>
              <Icon.Bell />
            </Nav.Link>
            <NavDropdown
              title={
                <Image
                  src="/user.jpg"
                  roundedCircle
                  alt="Profile Picture"
                  width={32}
                  height={32}
                />
              }
              id="collasible-nav-dropdown"
              align={{ lg: 'end' }}
            >
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
