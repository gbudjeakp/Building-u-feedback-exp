import React, { useEffect, useState, useRef } from "react";
import {
  Stepper,
  Button,
  Group,
  TextInput,
  Container,
  PinInput,
} from "@mantine/core";
import Otpinput from "../components/Otpinput";
import axios from "axios";

import { baseUrl } from "../API/index";

function ForgotPassword() {
  const [active, setActive] = useState(0);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [otpValidated, setOtpValidated] = useState(false);
  const errorMsg = useRef(null);
  const [otp, setOtp] = useState(0);

  const nextStep = async () => {
    try {
      let response;
      if (active === 0) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        // Make the API call to sendToken endpoint
        if (emailRegex.test(email)) {
          errorMsg.current.textContent = ``;
          console.log(email);
          response = await axios.post(
            `${baseUrl}/api/password/forgotPassword`,
            { username: email }
          );
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
        response = await axios.get(`${baseUrl}/api/password/checkToken`, {
          params: { username: email, resetToken: otp },
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

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

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
            <p>Step 3 content: Enter new password</p>
            <TextInput
              type="password"
              placeholder="Enter your new password"
              radius="md"
              size="lg"
            />
          </div>
        </Stepper.Step>
        <Stepper.Completed>
          <p>Completed, click back button to get to previous step</p>
        </Stepper.Completed>
      </Stepper>
      <Container style={{ color: "red" }} ref={errorMsg}></Container>
      <Group style={{ marginTop: 20 }} position="center">
        {active != 0 ? (
          <Button onClick={prevStep} color="#F9EB02" style={{ color: "black" }}>
            Back
          </Button>
        ) : null}
        {active === 0 || active === 1 ? (
          <Button onClick={nextStep} color="#F9EB02" style={{ color: "black" }}>
            Next step
          </Button>
        ) : null}
      </Group>
    </div>
  );
}

export default ForgotPassword;
