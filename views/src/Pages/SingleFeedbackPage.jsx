import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Text, Container, Paper } from "@mantine/core";
import TextEditor from "../components/TextEditor";
import FeedbackCard from "../components/FeedbackCard";

const feedbackContainer = {
  zIndex: "20",
  paddingBottom: "20rem",
};

function SingleFeedbackPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");

  const isMentor = true;

  const data = [
    {
      id: 6,
      studentName: "tom@mail.com",
      topicOfLearningSession: "Checking that status is not Complete and should only show not complete\n",
      codeLink: "Can't be cmplete",
      whoisAssigned: "tom@mail.com",
      isAssigned: false,
      status: false,
      date: "2023-11-12T02:52:12.000Z",
      createdAt: "2023-11-12T02:52:12.000Z",
      updatedAt: "2023-11-12T22:45:04.000Z",
      userId: 2
  }
  ];

  return (
    <Container>
      <div style={feedbackContainer}>
        <FeedbackCard
          data={data}
          pageTitle="GIVE FEEDBACK"
          gotoDashboard={true}
        />
      </div>

      {isMentor && (
        <Paper shadow="xs" p="sm" withBorder>
          <TextEditor isMentor={true} />
        </Paper>
      )}
    </Container>
  );
}

export default SingleFeedbackPage;
