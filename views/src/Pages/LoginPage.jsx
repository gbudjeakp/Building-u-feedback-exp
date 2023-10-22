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

function LoginPage() {
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={paperStyle}>
        <Typography variant="h5">Login</Typography>
        <form style={formStyle} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={submitStyle}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default LoginPage;
