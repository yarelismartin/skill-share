/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Image,
} from 'react-bootstrap';
import { useProfile } from '../utils/context/ProfileProvider';

export default function NavBarAuth() {
  const { userHasProfile } = useProfile();
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(false);

  const handleResize = () => {
    if (window.innerWidth < 1000) {
      setIsNavbarCollapsed(true);
    } else {
      setIsNavbarCollapsed(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      { userHasProfile ? (
        <Navbar collapseOnSelect expand="lg" variant="light" style={{ backgroundColor: 'white' }} className="navbar-custom">
          <Container fluid className="nav-container" style={{ display: 'flex', alignItems: 'center' }}>
            {/* Conditionally render the logo when navbar is collapsed */}
            {isNavbarCollapsed && (
              <Link passHref href="/" className="navbar-logo">
                <Image src="/skill-logo-crop.png" alt="Skill Logo" width="100" height="60" className="navbar-brand" />
              </Link>
            )}
            <Navbar.Toggle aria-controls="responsive-navbar-nav" className="ml-auto" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav
                className="me-auto quick-font"
                style={{
                  backgroundColor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: '500',
                  margin: 'auto',
                }}
              >
                <Link passHref href="/">
                  <Nav.Link>Home</Nav.Link>
                </Link>
                <Link passHref href="/discover">
                  <Nav.Link>Discover</Nav.Link>
                </Link>
                {!isNavbarCollapsed && (
                <Link passHref href="/" className="navbar-logo">
                  <Image src="/skill-logo.png" alt="Skill Logo" width="200" height="60" />
                </Link>
                )}
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
      ) : (
        <Navbar collapseOnSelect expand="lg" variant="light" style={{ backgroundColor: 'white' }} className="navbar-custom">
          <Container style={{ display: 'flex', alignItems: 'center' }}>
            <Link passHref href="/">
              <Image src="/skill-logo.png" alt="Skill Logo" width="200" height="50" />
            </Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" className="ml-auto" />
          </Container>
        </Navbar>
      )}
    </div>
  );
}
