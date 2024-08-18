import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useDisclosure } from "@mantine/hooks";
import { setUser } from "../features/Auth/authSlice";
import axios from "axios";
import {
  TextInput,
  Button,
  Container,
  Paper,
  Text,
  Anchor,
  Center,
  Group,
  Modal,
} from "@mantine/core";
import { baseUrl } from "../API/index";

const homepageStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
};

const buttonStyles = {
  borderRadius: "20px",
  background: "#F9EB02",
  color: "black",
};

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [
    openedLoginInfoModal,
    { open: openLoginInfoModal, close: closeLoginInfoModal },
  ] = useDisclosure(false);

  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm({
    initialValues: { userName: "", password: "" },

    validate: {
      userName: (value) =>
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
          ? null
          : "Invalid email",
      password: (value) =>
        value.length < 8 ? "Your password must be at least 8 characters" : null,
    },
  });

  const handleFormSubmit = async () => {
    try {
      form.validate();

      if (form.isValid) {
        const userData = {
          userName: form.values.userName,
          password: form.values.password,
        };

        const response = await axios.post(
          `${baseUrl}/api/users/login`,
          userData,
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          dispatch(setUser(response.data.user));

          if (response.data.user.mentor) {
            navigate("/mentor/feedbackqueue");
          } else {
            navigate("/intern/myrequests");
          }
        }
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.error ?? "An error occurred");
      openLoginInfoModal();
    }
  };

  return (
    <Container style={homepageStyles}>
      <Center>
        <Modal
          opened={openedLoginInfoModal}
          onClose={closeLoginInfoModal}
          withCloseButton={false}
        >
          {errorMessage}
        </Modal>
        <Paper shadow="xs" p="xl">
          <Text size="xxl" weight={700} align="center" mb="xl">
            Login to Account
          </Text>
          <form onSubmit={form.onSubmit(handleFormSubmit)}>
            <div style={{ marginTop: "1.5rem" }}>
              <TextInput
                withAsterisk
                required
                label="Email"
                placeholder="user@mail.com"
                {...form.getInputProps("userName")}
              />
            </div>

            <div style={{ marginTop: "1.5rem" }}>
              <TextInput
                withAsterisk
                required
                label="Password"
                type="password"
                placeholder="Enter Password"
                {...form.getInputProps("password")}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1.5rem",
              }}
            >
              <Button type="submit" size="sm" style={buttonStyles}>
                Login
              </Button>
            </div>
          </form>

          <div style={{ marginTop: "1.5rem" }}>
            <Group position="center" align="center" spacing="xs">
              <Text size="lg" c="dimmed">
                Don't have an account?
              </Text>
              <Anchor
                onClick={() => navigate("/signup")}
                size="lg"
                component="button"
              >
                Sign Up
              </Anchor>
            </Group>
          </div>
        </Paper>
      </Center>
    </Container>
  );
}

export default LoginPage;
