import Link from "next/link";
import Image from "next/image";
import { Container, Navbar } from "react-bulma-components";
import { isLoggedIn } from "../lib/auth.js";

import styles from "../styles/navbar.module.css";

const TopNavbar = () => {
  const navbarClassName = `${styles.topNavbar} has-shadow`;
  const logoClassName = `${styles.logoWord}`;

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
            <span className={logoClassName}>Coffee Days</span>
          </Navbar.Item>
          <Navbar.Burger />
        </Navbar.Brand>
        <Navbar.Menu>
          <Navbar.Container className="navbar-end" align="end">
            {isLoggedIn() && (
              <Navbar.Item href="/profile" className={styles.word}>
                Profile
              </Navbar.Item>
            )}
            {!isLoggedIn() && (
              <Navbar.Item href="/sign-up" className={styles.word}>
                Sign Up
              </Navbar.Item>
            )}
          </Navbar.Container>
        </Navbar.Menu>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
