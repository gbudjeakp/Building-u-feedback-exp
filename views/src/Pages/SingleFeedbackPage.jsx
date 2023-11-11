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

  const isMentor = false;

  const data = [
    {
      id: 4,
      CodeLead: "Code Lead 3",
      name: "Jill Jailbreaker",
      lastActive: "2 days ago",
      Linktoexercise: "www.example.com",
      completed: false,
      feedbacks: ["Feedback1", "Feedback2", "Feedback3", "Feedback4"],
    },
  ];

  return (
    <Container>
      <div style={feedbackContainer}>
        <FeedbackCard
          data={data}
          pageTitle="GIVE FEEDBACK"
          gotoDashboard={true}
        />

{data[0].feedbacks.map((el, index)=>{
          return(
            <Paper key={index}>
              {el}
            </Paper>
          )
        })}
      </div>

      {isMentor && (
        <Paper shadow="xs" p="sm" withBorder>
          <TextEditor isMentor={false} />
        </Paper>
      )}
    </Container>
  );
}

export default SingleFeedbackPage;
