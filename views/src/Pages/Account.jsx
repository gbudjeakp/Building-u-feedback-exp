import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Paper,
  Text,
  TextInput,
  Button,
  Modal,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import {baseUrl} from "../API/index"

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
  const [
    openedUpdateAccountInfoModal,
    { open: openUpdateAccountInfoModal, close: closeUpdateAccountInfoModal },
  ] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      fName: user.fName,
      email: user.username,
      newPassword: "",
      confirmPassword: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmitRequest = async () => {
    try {
      const formData = {
        fName: form.values.fName,
        username: form.values.email,
        newPassword: form.values.newPassword,
        oldPassword: form.values.oldPassword,
      };

    const response = await axios.patch(
        `${baseUrl}/api/users/updateaccount`,
        formData,
        {
          withCredentials: true, 
        }
      );
       if(response.status === 200){
        openUpdateAccountInfoModal();
       }
    } catch (error) {
      console.log(error);
    }
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
        <Modal
          opened={openedUpdateAccountInfoModal}
          onClose={closeUpdateAccountInfoModal}
          withCloseButton={false}
        >
          Account details have successfully been updated
        </Modal>
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
                label="New Password"
                placeholder="Enter New Password"
                {...form.getInputProps("newPassword")}
              />

              <TextInput
                variant="filled"
                style={inputStyle}
                id="oldPassword"
                label="Old Password"
                placeholder="Enter Old Password"
                {...form.getInputProps("oldPassword")}
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
