import React, { useState } from "react";
import { Container, Paper, Text, TextInput, Button } from "@mantine/core";
import { useDispatch } from "react-redux";
import { createFeedbackRequest } from "../features/Feedbacks/feedbackSlice";

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

function FeedbackRequestForm() {
  const [requestForm, setRequestForm] = useState({
    name: "",
    topicOfLearningSession: "",
    codeLink: "",
  });
  const dispatch = useDispatch();

  const handleSubmitRequest = () => {
    if (requestForm.studentName !== "") {
      dispatch(createFeedbackRequest(requestForm));
      setRequestForm((prev) => ({
        ...prev,
        name: "",
        topicOfLearningSession: "",
        codeLink: "",
      }));
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
        <Paper shadow="xs" style={paperStyle}>
          <Text size="xl" weight={700} style={titleStyle}>
            Request Feedback
          </Text>
          <div style={formStyle}>
            <TextInput
              variant="filled"
              required
              style={inputStyle}
              id="internName"
              label="Intern Name"
              placeholder="Enter intern's name"
              value={requestForm.name}
              onChange={(e) =>
                setRequestForm((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
            <TextInput
              variant="filled"
              required
              style={inputStyle}
              id="topicOfLearning"
              label="Topic of Learning Session"
              placeholder="Enter the topic of the learning session"
              value={requestForm.topicOfLearningSession}
              onChange={(e) =>
                setRequestForm((prev) => ({
                  ...prev,
                  topicOfLearningSession: e.target.value,
                }))
              }
            />
            <TextInput
              variant="filled"
              required
              style={inputStyle}
              id="codeLink"
              label="Code Link"
              placeholder="Enter code link"
              value={requestForm.codeLink}
              onChange={(e) =>
                setRequestForm((prev) => ({
                  ...prev,
                  codeLink: e.target.value,
                }))
              }
            />
            <Button
              variant="filled"
              size="lg"
              color="#F9EB02"
              style={{ color: "black" }}
              onClick={handleSubmitRequest}
            >
              Submit Request
            </Button>
          </div>
        </Paper>
      </div>
    </Container>
  );
}

export default FeedbackRequestForm;
