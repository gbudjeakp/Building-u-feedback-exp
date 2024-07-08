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
import {
  createFeedbackRequest,
  fetchFeedbackRequests,
} from "../features/Feedbacks/feedbackSlice";

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

const topics = [
  "HTML",
  "CSS",
  "Media Queries/Responsive Design",
  "Bootstrap",
  "JavaScript",
  "JavaScript and the DOM",
  "jQuery",
  "React",
  "Structured/Unstructured Data (MySQL)",
  "MVC Architecture (Express JS)",
  "API Integration",
];

function FeedbackRequestForm() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.feedbackSlice.loading)
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: { topicOfLearningSession: null, codeLink: "" },
    validate: {
      topicOfLearningSession: (value) =>
        topics.some((item) => value?.includes(item))
          ? null
          : "Please select a topic",
      codeLink: (value) => (value < 1 ? "You must enter a valid link" : null),
    },
  });
  const handleSubmitRequest = () => {
    dispatch(createFeedbackRequest(form.values));
    dispatch(fetchFeedbackRequests());
    
    if (loading === "succeeded"){
      open()
    }
    form.setValues({ topicOfLearningSession: null, codeLink: "" });
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
        <Modal opened={opened} onClose={close} withCloseButton={false}>
          Feedback Request submitted!
        </Modal>
        
        <form onSubmit={form.onSubmit(handleSubmitRequest)}>
          <Paper shadow="xs" style={paperStyle}>
            <Text size="xl" weight={700} style={titleStyle}>
              Request Feedback
            </Text>
            <div style={formStyle}>
              <Select
                label="Topic of Learning Session"
                placeholder="Select the topic of the learning session"
                style={inputStyle}
                data={topics}
                {...form.getInputProps("topicOfLearningSession")}
              />
              <TextInput
                variant="filled"
                style={inputStyle}
                id="codeLink"
                label="Code Link"
                placeholder="Enter code link"
                {...form.getInputProps("codeLink")}
              />
              <Button
                variant="filled"
                size="lg"
                color="#F9EB02"
                style={{ color: "black" }}
                type="submit"
              >
                Submit Request
              </Button>
            </div>
          </Paper>
        </form>
      </div>
    </Container>
  );
}

export default FeedbackRequestForm;
