import React, { useState } from "react";
import { Text, Button, Paper, Container, Stack } from "@mantine/core";

const feedbackContainer = {
  zIndex: "1",
  marginLeft: "90px",
};

const data = [
  {
    id: 1,
    name: "Robert Wolfkisser",
    email: "rob_wolf@gmail.com",
    role: "Collaborator",
    lastActive: "2 days ago",
    Linktoexercise: "www.example.com",
    completed: false,
  },
  {
    id: 2,
    name: "Jill Jailbreaker",
    email: "jj@breaker.com",
    role: "Collaborator",
    lastActive: "2 days ago",
    Linktoexercise: "www.example.com",
    completed: false,
  },
  {
    id: 3,
    name: "Henry Silkeater",
    email: "henry@silkeater.io",
    role: "Contractor",
    lastActive: "2 days ago",
    Linktoexercise: "www.example.com",
    completed: false,
  },
  {
    id: 4,
    name: "Bill Horsefighter",
    email: "bhorsefighter@gmail.com",
    role: "Contractor",
    lastActive: "5 days ago",
    Linktoexercise: "www.example.com",
    completed: false,
  },
  {
    id: 5,
    name: "Jeremy Footviewer",
    email: "jeremy@foot.dev",
    role: "Manager",
    lastActive: "3 days ago",
    Linktoexercise: "www.example.com",
    completed: false,
  },
];

function FeedbackRequestQueue({ showAddFeedback, showComplete, isAssign }) {
  const [assignedRequests, setAssignedRequests] = useState([]);
  const [items, setItems] = useState(data); // Store data in the 'items' state

  const toggleComplete = (id) => {
    // Create a copy of 'items' and update the 'completed' status
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });

    setItems(updatedItems); // Update the 'items' state
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

  return (
    <Container fluid h={0} style={feedbackContainer}>
      <Text align="center" size="xl" style={{ marginBottom: "20px" }}>
        Feedback Queue
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
              <Text>Name: {item.name}</Text>
              <Text>Completed: {item.completed ? "Yes" : "No"}</Text>
              <Text>
                Link to exercise:{" "}
                <a href={item.Linktoexercise}>{item.Linktoexercise}</a>
              </Text>
              <Text>Created: {item.lastActive}</Text>
              {assignedRequests.find((assigned) => assigned.id === item.id) && (
                <Text>Assigned to: {item.name}</Text>
              )}
            </div>
            <Stack direction="horizontal" spacing="sm">
              {isAssign && (
                <Button
                  style={{ color: "black" }}
                  color="#F9EB02"
                  onClick={() => assignRequest(item.id)}
                >
                  Assign
                </Button>
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
              {showAddFeedback && (
                <Button style={{ color: "black" }} color="#F9EB02">
                  Add Feedback
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
