import React from 'react';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { TextInput, Button, Container, Paper, Text, Anchor, Center, Group } from '@mantine/core';


const homepageStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh', // Ensure the content spans at least the viewport height
};

const buttonStyles = {
  borderRadius: '20px',
  background: '#F9EB02',
  color: 'black', // Text color
};

function LoginPage() {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/signup');
  };

  const form = useForm({
    initialValues: { userName: '', password: '' },

    validate: {
      userName: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 8 ? 'Your password must be at least 8 characters' : null),
    },
  });

  const handleFormSubmit = async () => {
    if (form.isValid) {
      // Create an object with form values
      const userData = {
        fName: form.values.fName,
        userName: form.values.userName,
        password: form.values.password,
      };

      try {
        const response = await axios.post('http://localhost:5001/api/users/login', userData);

        if (response.status === 200) {
          console.log('Form data submitted successfully', userData);
          navigate('/mentor');
        } else {
          console.log('API request failed');
          // Handle API request errors
          alert('Something went wrong, try again');
        }
      } catch (error) {
        console.error('Error submitting the form data:', error);
      }
    }
  };
  return (
    <Container style={homepageStyles}>
      <Center>
        <Paper shadow="xs" p="xl">
          <Text size="xxl" weight={700} align="center" mb="xl">
            Login to Account
          </Text>
          <form onSubmit={form.onSubmit(handleFormSubmit)}>

            <div style={{ marginTop: '1.5rem' }}>
              <TextInput
                withAsterisk
                required
                label="Email"
                placeholder="user@mail.com"
                {...form.getInputProps('userName')}
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

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
              <Button type="submit" size="sm" style={buttonStyles}>
                Login
              </Button>
            </div>
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

export default LoginPage;
