import Link from "next/link";
import Image from "next/image";
import { Container, Navbar } from "react-bulma-components";

import styles from "../styles/navbar.module.css";

const TopNavbar = () => {
  const navbarClassName = `${styles.topNavbar} has-shadow`;
  return (
    <Navbar className={navbarClassName}>
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
            <Navbar.Item href="/profile">Profile</Navbar.Item>
            <Navbar.Item href="/sign-up">Sign Up</Navbar.Item>
          </Navbar.Container>
        </Navbar.Menu>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
