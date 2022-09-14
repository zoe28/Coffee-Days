import Link from "next/link"
import Image from 'next/image'
import { Container, Navbar } from 'react-bulma-components';


import 'bulma/css/bulma.min.css';

const TopNavbar = () => {
  return (
    <Container>
    <Navbar>
      <Navbar.Brand>
        <Navbar.Item href="/">
          <Image
            alt="Coffee Days Logo"
            src="/coffee-days-logo.png"
            width="216"
            height="216"
          /> 
          Coffee Days
        </Navbar.Item>
        <Navbar.Burger />
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Container>
        </Navbar.Container>
        <Navbar.Container align="end">
          <Navbar.Item href="/profile">
           Profile
          </Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
    </Container>
  );

};

export default TopNavbar;