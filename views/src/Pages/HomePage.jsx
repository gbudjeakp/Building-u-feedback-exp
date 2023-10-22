import React from 'react';
import { Container, Typography, Button, Card, CardContent, Grid } from '@mui/material';

function Homepage() {
  return (
    <div>
      <div className="hero">
        <Container maxWidth="sm">
          <Typography variant="h3" align="center" gutterBottom>
            Welcome to Building-U-Feedback 
          </Typography>
          <Typography variant="h6" align="center" paragraph>
          Students can submit their work and receive valuable feedback.
          </Typography>
          <div className="action-button">
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button variant="contained" color="secondary" size="large">
                  Get Started
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Homepage;
