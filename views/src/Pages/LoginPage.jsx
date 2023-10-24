import React from "react";
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Anchor,
  Text,
  Container,
  Button,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

const titleStyles = {
  fontFamily: "Greycliff CF, var(--mantine-font-family)",
  fontWeight: 900,
};

function RegisterPage() {
  const navigate = useNavigate();

  const navigateToRegister = () => {
    navigate("/register");
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" style={titleStyles}>
        Login
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="user@gmail.com" required />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        />

        <Button fullWidth mt="xl">
          Login
        </Button>

        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{" "}
          <Anchor onClick={navigateToRegister} size="sm" component="button">
            Create account
          </Anchor>
        </Text>
      </Paper>
    </Container>
  );
}

export default RegisterPage;
