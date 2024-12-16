import React, { useEffect, useState, useRef } from "react";
import {
  Stepper,
  Button,
  Group,
  TextInput,
  Container,
  PinInput,
} from "@mantine/core";
import axios from "axios";

import { baseUrl } from "../API/index";


function ForgotPassword() {
  const [active, setActive] = useState(0);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [otpValidated, setOtpValidated] = useState(false);
  const errorMsg = useRef(null);
  const [otp, setOtp] = useState(0);
  const [newPwd, setNewPwd] = useState(null);
  const [confirmPwd, setConfirmPwd] = useState(null);
  const updatepasswordValidator = (input, confirmation) => {
    errorMsg.current.textContent = ``;
    let newPwd = input;
    let confirmPwd = confirmation;
    if (!newPwd || !confirmPwd) {
      errorMsg.current.textContent =
        "Please enter and confirm your new password";
    }
    if (typeof newPwd !== "string") {
      errorMsg.current.textContent = "New password must be a string";
    }
    if (newPwd !== confirmPwd) {
      errorMsg.current.textContent = "Passwords do not match";
    }
    if (newPwd.length < 8) {
      errorMsg.current.textContent =
        "Password must be at least 8 characters long";
    }

    if (newPwd.length > 30) {
      errorMsg.current.textContent =
        "Password cannot be more than 30 characters long";
    }
  };
  const nextStep = async () => {
    try {
      errorMsg.current.textContent = ``;
      let response;
      if (active === 0) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        // Make the API call to sendToken endpoint
        if (emailRegex.test(email)) {
          errorMsg.current.textContent = ``;
          response = await axios.post(`${baseurl}/api/password/forgotPassword`, { username: email });
          if (response.status === 200) {
            setEmailSubmitted(true);
          } else if (response.status === 404) {
            errorMsg.current.textContent = `Email not registered!`;
          }
        } else {
          errorMsg.current.textContent = `Error! Enter valid email format.`;
        }
      } else if (active === 1) {
        // Make the API call to check Token endpoint
        console.log(otp, email);
        response = await axios.post(`${baseUrl}/api/password/checkToken`, {
          username: email,
          resetToken: otp,
        });
        if (response.status === 200) {
          setOtpValidated(true);
        } else {
          errorMsg.current.textContent = `Invalid OTP`;
        }
      }

      // Check if response status is 200
      if (response && response.status === 200) {
        setActive((current) => (current < 3 ? current + 1 : current));
      } else {
        console.error("Error:", response.data.msg);
      }
    } catch (error) {
      console.error("Error:", error);
      if (error == "AxiosError: Request failed with status code 404") {
        errorMsg.current.textContent = `Error: Email not registered!`;
      }
    }
  };

  const prevStep = () => {
    errorMsg.current.textContent = ``;
    setActive((current) => (current > 0 ? current - 1 : current));
  };
  const finishUp = async () => {
    console.log(newPwd, confirmPwd);
    errorMsg.current.textContent = ``;
    updatepasswordValidator(newPwd, confirmPwd);
    if (errorMsg.current.textContent === "") {
      try {
        const response = await axios.patch(
          `${baseUrl}/api/password/updatePassword`,
          {
            username: email,
            resetToken: otp,
            newPassword: newPwd,
          }
        );
        if (response && response.status === 200) {
          setActive((current) => (current < 3 ? current + 1 : current));
        }
      } catch (error) {
        errorMsg.current.textContent = `Error: ${error}`;
      }
    }
  };
  return (
    <div style={{ maxWidth: 600, margin: "auto", marginTop: 20 }}>
      <Stepper
        active={active}
        onStepClick={setActive}
        allowNextStepsSelect={false}
        color="#F9EB02"
        sizes={{ xs: "md", sm: "lg" }}
      >
        <Stepper.Step label="First step" description="Enter Email">
          <div>
            <p>Step 1: Request For OTP</p>
            <TextInput
              type="email"
              placeholder="Enter your email"
              radius="md"
              size="lg"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Verify OTP">
          <div>
            <p>Step 2 content: Verify email</p>
            <p>Enter the OTP from email below.</p>
            <PinInput
              oneTimeCode
              inputMode="numeric"
              onChange={(value) => {
                setOtp(value);
              }}
            />
          </div>
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Enter New Password">
          <div>
            <p>Enter new password</p>
            <TextInput
              onChange={(event) => {
                setNewPwd(event.target.value);
              }}
              type="password"
              placeholder="Enter your new password"
              radius="md"
              size="lg"
            />
            <p>Confirm new password</p>
            <TextInput
              onChange={(event) => {
                setConfirmPwd(event.target.value);
              }}
              type="password"
              placeholder="Confirm password"
              radius="md"
              size="lg"
            />
          </div>
        </Stepper.Step>
        <Stepper.Completed>
          <p style={{ color: "green" }}>
            Your Password has been updated successfully!
          </p>
        </Stepper.Completed>
      </Stepper>
      <Container style={{ color: "red" }} ref={errorMsg}></Container>
      <Group style={{ marginTop: 20 }} position="center">
        {active != 0 && active != 3 ? (
          <Button onClick={prevStep} color="#F9EB02" style={{ color: "black" }}>
            Back
          </Button>
        ) : null}
        {active === 0 || active === 1 ? (
          <Button onClick={nextStep} color="#F9EB02" style={{ color: "black" }}>
            Next step
          </Button>
        ) : null}
        {active === 2 ? (
          <Button onClick={finishUp} color="#F9EB02" style={{ color: "black" }}>
            Submit
          </Button>
        ) : null}
      </Group>
    </div>
  );
}

export default ForgotPassword;
