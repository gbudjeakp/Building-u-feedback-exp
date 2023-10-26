import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Text, Button } from '@mantine/core';

const homepageStyles = {
  background: '#f0f0f0',
  display: 'flex',
  alignItems: 'center',
  minHeight: '100vh',
};

const containerStyles = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
};

const titleStyles = {
  fontSize: '36px',
  fontWeight: 700,
  marginBottom: '20px',
};

const subTitleStyles = {
  fontSize: '20px',
  color: '#333',
  marginBottom: '40px',
};

const buttonStyles = {
  padding: '12px 40px',
};

const HomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/register');
  };

  return (
    <div style={homepageStyles}>
      <Container size="lg" style={containerStyles}>
        <Text align="center" style={titleStyles}>
          Welcome to Building-U-Feedback
        </Text>
        <Text align="center" style={subTitleStyles}>
          Request feedback easily with Feedback-U
        </Text>
        <Button
          size="lg"
          variant="filled"
          color="#191970" // Change the color here
          style={buttonStyles}
          onClick={handleGetStarted}
        >
          Get Started
        </Button>
      </Container>
    </div>
  );
};

export default HomePage;
