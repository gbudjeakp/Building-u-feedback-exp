import React from "react";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // Import useDispatch
import { setUser } from "../features/Auth/authSlice"; // Import your auth slice actions
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
} from "@mantine/core";

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

  const navigateToLogin = () => {
    navigate("/login");
  };

  const form = useForm({
    initialValues: { fName: "", userName: "", password: "" },
    validate: {
      fName: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      userName: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 8 ? "Your password must be at least 8 characters" : null,
    },
  });

  const handleFormSubmit = async () => {
    // Trigger form validation
    form.validate();

    if (form.isValid) {
      const userData = {
        fName: form.values.fName,
        userName: form.values.userName,
        password: form.values.password,
      };

      try {
        const response = await axios.post(
          "http://localhost:5001/api/users/register",
          userData
        );

        if (response.status === 201) {
          // Dispatch the setUser action to update the authentication state
          dispatch(setUser(response.data.user));

          if (response.data.user.mentor) {
            navigate("/mentor");
          } else {
            navigate("/intern");
          }
        } else {
          console.log("API request failed");
          alert("Something went wrong, try again");
        }
      } catch (error) {
        console.error("Error submitting the form data:", error);
      }
    } else {
      // Handle the case when the form is not valid
      return;
    }
  };

  return (
    <Container style={homepageStyles}>
      <Center>
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
              <TextInput
                withAsterisk
                required
                name="password"
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
