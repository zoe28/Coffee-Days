import Link from "next/link"
import Image from 'next/image'
import { Container, Navbar } from 'react-bulma-components';


import 'bulma/css/bulma.min.css';

const TopNavbar = () => {
  return (
    <Navbar className="has-shadow">
      <Container>
        <Navbar.Brand>
          <Navbar.Item href="/">
            <Image
              alt="Coffee Days Logo"
              src="/coffee-days-logo.png"
              width="216"
              height="216"
            /> 
            <span className="title is-4 ml-1">Coffee Days</span>
          </Navbar.Item>
          <Navbar.Burger />
        </Navbar.Brand>
        <Navbar.Menu>
          <Navbar.Container className="navbar-end" align="end">
            <Navbar.Item href="/reviews">
              Reviews
            </Navbar.Item>
            <Navbar.Item href="/profile">
              Profile
            </Navbar.Item>
          </Navbar.Container>
        </Navbar.Menu>
      </Container>
    </Navbar>
  );

};

export default TopNavbar;