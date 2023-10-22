import React from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
} from '@mui/material';

const paperStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
};

const formStyle = {
  width: '100%', // Full width
  marginTop: '10px',
};

const submitStyle = {
  margin: '20px 0 10px',
};

function FeedbackrequestForm() {
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={paperStyle}>
        <Typography variant="h5">Request Form</Typography>
        <form style={formStyle} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="internName"
            label="Intern Name"
            name="internName"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="topicOfLearning"
            label="Topic of Learning Session"
            name="topicOfLearning"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="codeLink"
            label="Code Link"
            name="codeLink"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={submitStyle}
          >
            Submit Request
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default FeedbackrequestForm;