import React, { useState } from "react";
import { Text, Button, Paper, Container, Stack } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const feedbackContainer = {
  zIndex: "1",
  marginLeft: "90px",
};

function FeedbackRequestQueue({
  showAddFeedback,
  showComplete,
  isAssign,
  pageTitle,
  showViewFeedback,
  data,
  isMentor,
  gotoDashboard,
}) {
  const [assignedRequests, setAssignedRequests] = useState([]);
  const [items, setItems] = useState(data); // Store data in the 'items' state
  const navigate = useNavigate();

  const toggleComplete = (id) => {
    // Create a copy of 'items' and update the 'completed' status
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });

    // Remove completed items from the updatedItems
    const filteredItems = updatedItems.filter((item) => !item.completed);

    setItems(filteredItems); // Update the 'items' state
  };

  const assignRequest = (id) => {
    const request = items.find((item) => item.id === id);
    if (request) {
      // Check if the request is already assigned before adding it to the assignedRequests
      if (!assignedRequests.find((assigned) => assigned.id === id)) {
        setAssignedRequests([...assignedRequests, request]);
      }
    }
  };

  const handleGoToDashboard = () => {
    const isMentor = true;
    if (isMentor) {
      navigate("/mentor");
    } else {
      navigate("/intern");
    }
  };

  return (
    <Container fluid h={0} style={feedbackContainer}>
      <Text align="center" size="xl" style={{ marginBottom: "20px" }}>
        {pageTitle}
      </Text>
      <Stack gap={10}>
        {items.map((item) => (
          <Paper
            shadow="xs"
            p="sm"
            withBorder
            key={item.id}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              {isMentor ? (
                <Text>Code Lead: {item.CodeLead}</Text>
              ) : (
                <Text>Intern Name: {item.name}</Text>
              )}
              <Text>Completed: {item.completed ? "Yes" : "No"}</Text>
              <Text>
                Link to exercise:{" "}
                <a href={item.Linktoexercise}>{item.Linktoexercise}</a>
              </Text>
              <Text>Created: {item.lastActive}</Text>
              {assignedRequests.find((assigned) => assigned.id === item.id) && (
                <Text>Assigned to: {item.CodeLead}</Text>
              )}
            </div>
            <Stack direction="horizontal" spacing="sm">
              {showAddFeedback && (
                <Link to={`/feedback/${item.id}`}>
                  <Button style={{ color: "black" }} color="#F9EB02">
                    Add Feedback
                  </Button>
                </Link>
              )}
                {showViewFeedback && (
                <Link to={`/feedback/${item.id}`}>
                  <Button style={{ color: "black" }} color="#F9EB02">
                    View Feedback
                  </Button>
                </Link>
              )}
              {showComplete && !item.completed && (
                <Button
                  style={{ color: "black" }}
                  color="#F9EB02"
                  onClick={() => toggleComplete(item.id)}
                >
                  Complete
                </Button>
              )}

              {gotoDashboard && (
                <Button style={{ color: "black" }} color="#F9EB02"  onClick={handleGoToDashboard}>
                  Go to Dashboard
                </Button>
              )}
              {isAssign && (
                <Button
                  style={{ color: "black" }}
                  color="#F9EB02"
                  onClick={() => assignRequest(item.id)}
                >
                  Assign
                </Button>
              )}
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Container>
  );
}

export default FeedbackRequestQueue;
