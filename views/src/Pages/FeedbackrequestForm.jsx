import React from 'react';
import { Container, Paper, Text, TextInput, Button } from '@mantine/core';

const paperStyle = {
  padding: 40,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: 500,
};



const formStyle = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
};

const inputStyle = {
  marginBottom: 20,
};

const titleStyle = {
  marginBottom: 20,
  fontSize: 24,
};

function FeedbackRequestForm() {
  return (
    <Container fluid h={0} size="lg">
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Paper shadow="xs" style={paperStyle}>
          <Text size="xl" weight={700} style={titleStyle}>
            Request Feedback
          </Text>
          <div style={formStyle}>
            <TextInput
              variant="filled"
              required
              style={inputStyle}
              id="internName"
              label="Intern Name"
              placeholder="Enter intern's name"
            />
            <TextInput
              variant="filled"
              required
              style={inputStyle}
              id="topicOfLearning"
              label="Topic of Learning Session"
              placeholder="Enter the topic of the learning session"
            />
            <TextInput
              variant="filled"
              required
              style={inputStyle}
              id="codeLink"
              label="Code Link"
              placeholder="Enter code link"
            />
            <Button variant="filled" size="lg" color="#F9EB02" style={{ color: 'black' }}> 
              Submit Request
            </Button>
          </div>
        </Paper>
      </div>
    </Container>
  );
}

export default FeedbackRequestForm;
