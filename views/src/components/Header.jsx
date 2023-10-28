import React from 'react';
import { Container, Group, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

function Header() {
  const headerStyle = {
    background: '#191970',
    color: 'white',
    padding: '20px 0',
  };

  const logoStyle = {
    fontSize: '24px',
    fontWeight: 700,
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    margin: '0 20px',
  };

  return (
    <header style={headerStyle}>
      <Container size="lg">
        <Group>
          <div>
            <Link to="/" style={logoStyle}>
              Welcome to Building-U-Feedback
            </Link>
          </div>
          <nav>
            <Link to="/" style={linkStyle}>
              Home
            </Link>
            <Link to="/login" style={linkStyle}>
              Login
            </Link>
            <Link to="/register" style={linkStyle}>
              Register
            </Link>
            <Link to="/intern" style={linkStyle}>
              Intern Dashboard
            </Link>
            <Link to="/mentor" style={linkStyle}>
              Mentor Dashboard
            </Link>
          </nav>
        </Group>
      </Container>
    </header>
  );
}

export default Header;
