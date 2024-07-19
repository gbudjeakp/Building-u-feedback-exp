import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
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
  PasswordInput,
} from "@mantine/core";
import { baseUrl } from "../API/index";

const homepageStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
};

const buttonStyles = {
  borderRadius: "20px",
  background: "#F9EB02",
  color: "black",
};

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState("");
  const [
    openedSignupInfoModal,
    { open: openSignupInfoModal, close: closeSignupInfoModal },
  ] = useDisclosure(false);

  const navigateToLogin = () => {
    navigate("/login");
  };

  const form = useForm({
    initialValues: {
      fName: "",
      userName: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      fName: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      userName: (value) =>
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
          ? null
          : "Invalid email",
      password: (value) => {
        const minLength = 12;
        const maxLength = 32;
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

        if (value.length < minLength) {
          return `Password must be at least ${minLength} characters long`;
        }
        if (value.length > maxLength) {
          return `Password must not exceed ${maxLength} characters`;
        }
        if (!hasUpperCase) {
          return "Password must contain at least one uppercase letter";
        }
        if (!hasLowerCase) {
          return "Password must contain at least one lowercase letter";
        }
        if (!hasNumber) {
          return "Password must contain at least one number";
        }
        if (!hasSpecialChar) {
          return "Password must contain at least one special character";
        }
        return null;
      },
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords do not match" : null,
    },
  });

  const handleFormSubmit = async () => {
    form.validate();

    if (form.isValid()) {
      const userData = {
        fName: form.values.fName,
        userName: form.values.userName,
        password: form.values.password,
      };

      try {
        const response = await axios.post(
          `${baseUrl}/api/users/register`,
          userData,
          { withCredentials: true }
        );

        if (response.status === 201) {
          dispatch(setUser(response.data.user));

          if (response.data.user.mentor) {
            navigate("/mentor/feedbackqueue");
          } else {
            navigate("/intern/myrequests");
          }
        }
      } catch (error) {
        setErrorMessage(error.response.data.error ?? "An error occurred");
        openSignupInfoModal();
      }
    }
  };

  return (
    <Container style={homepageStyles}>
      <Center>
        <Modal
          opened={openedSignupInfoModal}
          onClose={closeSignupInfoModal}
          withCloseButton={false}
        >
          {errorMessage}
        </Modal>
        <Paper shadow="xs" p="xl">
          <Text size="xxl" weight={700} align="center" mb="xl">
            Create an Account
          </Text>
          <form onSubmit={form.onSubmit(handleFormSubmit)}>
            <TextInput
              withAsterisk
              required
              name="fName"
              label="Full Name"
              placeholder="John Smith"
              {...form.getInputProps("fName")}
            />
            <div style={{ marginTop: "1.5rem" }}>
              <TextInput
                withAsterisk
                required
                name="userName"
                label="Email"
                placeholder="user@mail.com"
                {...form.getInputProps("userName")}
              />
            </div>
            <div style={{ marginTop: "1.5rem" }}>
              <PasswordInput
                withAsterisk
                required
                name="password"
                label="Password"
                type="password"
                placeholder="Enter Password"
                {...form.getInputProps("password")}
                {...form.getInputProps("password")}
              />
            </div>
            <div style={{ marginTop: "1.5rem" }}>
              <PasswordInput
                withAsterisk
                required
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm Password"
                {...form.getInputProps("confirmPassword")}
                {...form.getInputProps("confirmPassword")}
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
                Sign Up
              </Button>
            </div>
          </form>
          <div style={{ marginTop: "1.5rem" }}>
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
