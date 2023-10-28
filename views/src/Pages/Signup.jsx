import React from 'react';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { TextInput, Button, Container, Paper, Text, Anchor, Center, Group } from '@mantine/core';


const homepageStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh', // Set the height to 100% of the viewport
};

const buttonStyles = {
  borderRadius: '20px',
  background: '#F9EB02',
  color: 'black', // Text color
};


function Signup() {

  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  };

  const form = useForm({
    initialValues: { fname: '', email: '', password: '' },

    validate: {
      fname: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 8 ? 'Your password must be at least 8 characters' : null),
    },
  });

  return (
    <Container style={homepageStyles}>
      <Center>
        <Paper shadow="xs" p="xl">
          <Text size="xxl" weight={700} align="center" mb="xl">
            Create an Account
          </Text>
          <form onSubmit={form.onSubmit(console.log)}>
            <TextInput
              withAsterisk
              required
              label="Full Name"
              placeholder="John Smith"
              {...form.getInputProps('fname')}
            />

            <div style={{ marginTop: '1.5rem' }}>
              <TextInput
                withAsterisk
                required
                label="Email"
                placeholder="user@mail.com"
                {...form.getInputProps('email')}
              />
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <TextInput
                withAsterisk
                required
                label="Password"
                type="password"
                placeholder="Enter Password"
                {...form.getInputProps('password')}
              />
            </div>

            <Button type="submit" size="lg" style={buttonStyles} fullWidth mt="xl">
              Sign Up
            </Button>
          </form>

          <div style={{ marginTop: '1.5rem' }}>
            <Group position="center" align="center" spacing="xs">
              <Text size="lg" c="dimmed">
                Already Have An Account?
              </Text>
              <Anchor onClick={navigateToLogin} size="lg" component="button">
                Log In
              </Anchor>
            </Group>
          </div>
        </Paper>
      </Center>
    </Container>
  );
}

export default Signup;
