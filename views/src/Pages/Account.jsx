import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Text,
  TextInput,
  Button,
  Select,
  Modal,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useDispatch, useSelector } from "react-redux";

const paperStyle = {
  padding: 40,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 500,
};

const formStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  flex: 1,
};

const inputStyle = {
  marginBottom: 20,
};

const titleStyle = {
  marginBottom: 20,
  fontSize: 24,
};


function Account({ user }) {

    console.log(user)

    const form = useForm({
        initialValues: { fName: "", email: "", newPassword: "", confirmPassword: "" },
        validate: {
          fName: (value) =>
            value.length < 3 ? "Name must have at least 3 letters" : null,
      
          email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      
          newPassword: (value) =>
            value.length < 8 ? "Your password must be at least 8 characters" : null,
      
          confirmPassword: (value) =>
            form.values.newPassword !== value ? "Your Passwords Do not Match" : null,
        },
      });
      

  const handleSubmitRequest = () => {
     alert(form.values)
  };
  
  return (
    <Container fluid h={0} size="lg">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >

        <form onSubmit={form.onSubmit(handleSubmitRequest)}>
          <Paper shadow="xs" style={paperStyle}>
            <Text size="xl" weight={700} style={titleStyle}>
              My Account
            </Text>
            <div style={formStyle}>
              <TextInput
                variant="filled"
                style={inputStyle}
                id="fName"
                label="Full Name"
                placeholder={user.fName}
                {...form.getInputProps("fName")}
              />

              <TextInput
                variant="filled"
                style={inputStyle}
                id="email"
                label="Email"
                placeholder={user.username}
                {...form.getInputProps("email")}
              />

              <TextInput
                variant="filled"
                style={inputStyle}
                id="password"
                label="Password"
                placeholder="Enter New Password"
                {...form.getInputProps("newPassword")}
              />
       
              <TextInput
                variant="filled"
                style={inputStyle}
                id="confirmPassword"
                label="Confirm Password"
                placeholder="Enter Password Again"
                {...form.getInputProps("confirmPassword")}
              />

              <Button
                variant="filled"
                size="lg"
                color="#F9EB02"
                style={{ color: "black" }}
                type="submit"
              >
                Save
              </Button>
            </div>
          </Paper>
        </form>
      </div>
    </Container>
  );
}

export default Account;
