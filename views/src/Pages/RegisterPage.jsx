import React from "react";
import { useNavigate } from "react-router-dom";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from "@mantine/core";

const titleStyles = {
  fontFamily: "Greycliff CF, var(--mantine-font-family)",
  fontWeight: 900,
};


function LoginPage() {
  const navigate = useNavigate();

  const navigateTologin = () => {
    navigate("/login");
  };


  return (
    <Container size={420} my={40}>
      <Title ta="center" style={titleStyles}>
        Register Account
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
          Already Have An Account?{" "}
          <Anchor onClick={navigateTologin} size="sm" component="button">
            Log Into Account
          </Anchor>
        </Text>
      </Paper>
    </Container>
  );
}

export default LoginPage;
