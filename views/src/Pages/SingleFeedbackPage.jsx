import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Text, Container, Paper } from "@mantine/core";
import TextEditor from "../components/TextEditor";
import FeedbackCard from "../components/FeedbackCard";

const feedbackContainer = {
  zIndex: "20",
  paddingBottom: "20rem"
};

function SingleFeedbackPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");

  const data = [
    {
      id: 4,
      CodeLead: "Code Lead 3",
      name: "Jill Jailbreaker",
      lastActive: "2 days ago",
      Linktoexercise: "www.example.com",
      completed: false,
      feedbacks: []
  }
  ];

  return (
    <Container>
      <div style={feedbackContainer}>
        <FeedbackCard data={data} pageTitle="GIVE FEEDBACK" gotoDashboard={true} />
      </div>

      <Paper shadow="xs" p="sm" withBorder>
        <TextEditor />
      </Paper>
    </Container>
  );
}

export default SingleFeedbackPage;
