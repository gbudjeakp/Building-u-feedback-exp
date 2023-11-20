import React from 'react';
import { Container, Title, Text, Button, Group } from '@mantine/core';
import { Navigate, useNavigate } from 'react-router-dom';

const rootStyle = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 'var(--mantine-spacing-80px)',
};

const labelStyle = {
  textAlign: 'center',
  fontWeight: 900,
  fontSize: '59px',
  lineHeight: 1,
  marginBottom: 'calc(1.5 * var(--mantine-spacing-xl))',
};

const descriptionStyle = {
  maxWidth: 'var(--mantine-spacing-500px)',
  margin: 'auto',
  marginTop: 'var(--mantine-spacing-xl)',
  marginBottom: 'calc(1.5 * var(--mantine-spacing-xl))',
};

const titleStyle = {
  fontFamily: 'Greycliff CF, var(--mantine-font-family)',
  textAlign: 'center',
  fontWeight: 900,
  fontSize: 'var(--mantine-font-size-38px)',
};

const buttonStyles = {
    borderRadius: '20px',
    background: '#F9EB02',
    color: 'black', // Text color
  };

function NotFound() {

    const navigate = useNavigate();
    
  return (
    <Container style={rootStyle}>
      <div style={labelStyle}>404</div>
      <Title style={titleStyle}>You have found a secret place.</Title>
      <Text c="dimmed" size="lg" ta="center" style={descriptionStyle}>
        Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has
        been moved to another URL.
      </Text>
      <Group justify="center">
        <Button onClick={() => navigate("/")} style={buttonStyles} variant="subtle" size="md">
          Take me back to the home page
        </Button>
      </Group>
    </Container>
  );
}

export default NotFound;
