import React from 'react';
import { Container, Title, Text, Button, Group } from '@mantine/core';
import {useNavigate } from 'react-router-dom';

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
    color: 'black', 
  };

function Unauthorized() {

    const navigate = useNavigate();
    
  return (
    <Container style={rootStyle}>
      <div style={labelStyle}>403</div>
      <Title style={titleStyle}>You have found a secret place.</Title>
      <Text c="dimmed" size="lg" ta="center" style={descriptionStyle}>
        Not this time, access forbidden
      </Text>
      <Text c="dimmed" size="lg" ta="center">
        Looks Like you might have been logged out. 
        Try Logging in. 
      </Text>
      <br/>
      <Group justify="center">
        <Button onClick={() => navigate("/login")} style={buttonStyles} variant="subtle" size="md">
          Login
        </Button>
      </Group>
    </Container>
  );
}

export default Unauthorized;
