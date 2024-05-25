/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Image,
} from 'react-bootstrap';

export default function NavBarAuth() {
  return (
    <Navbar collapseOnSelect expand="lg" variant="light" style={{ backgroundColor: 'white' }}>
      <Container style={{ display: 'flex', flexDirection: 'column' }}>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link passHref href="/discover">
              <Nav.Link>Discover</Nav.Link>
            </Link>
            <Link passHref href="/">
              <Image src="/skill-logo.png" alt="Skill Logo" width="200" height="50" />
            </Link>
            <Link passHref href="/community">
              <Nav.Link>Community</Nav.Link>
            </Link>
            <Link passHref href="/profile">
              <Nav.Link>Profile</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
