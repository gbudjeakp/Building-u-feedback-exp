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
    completed: true,
  },
  {
    id: 2,
    name: "Jill Jailbreaker",
    email: "jj@breaker.com",
    role: "Collaborator",
    lastActive: "2 days ago",
    completed: true,
  },
  {
    id: 3,
    name: "Henry Silkeater",
    email: "henry@silkeater.io",
    role: "Contractor",
    lastActive: "2 days ago",
    completed: false,
  },
  {
    id: 4,
    name: "Bill Horsefighter",
    email: "bhorsefighter@gmail.com",
    role: "Contractor",
    lastActive: "5 days ago",
    completed: true,
  },
  {
    id: 5,
    name: "Jeremy Footviewer",
    email: "jeremy@foot.dev",
    role: "Manager",
    lastActive: "3 days ago",
    completed: false,
  },
];

function FeedbackRequestQueue() {
  const [assignedRequests, setAssignedRequests] = useState([]);

  const assignRequest = (id) => {
    const request = data.find((item) => item.id === id);
    if (request) {
      // Check if the request is already assigned before adding it to the assignedRequests
      if (!assignedRequests.find((assigned) => assigned.id === id)) {
        setAssignedRequests([...assignedRequests, request]);
      }
    }
  };

  return (
    <Container fluid h={0} style={feedbackContainer}>
      <Text align="center" size="xl"  style={{ marginBottom: "20px" }}>
        Feedback Queue
      </Text>
      <Stack gap={10}>
        {data.map((item) => (
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
              <Text>Last Active: {item.lastActive}</Text>
              {assignedRequests.find((assigned) => assigned.id === item.id) && (
                <Text>Assigned to: {item.name}</Text>
              )}
            </div>
            <Button color="#F9EB02" onClick={() => assignRequest(item.id)}>
              Assign
            </Button>
          </Paper>
        ))}
      </Stack>
    </Container>
  );
}

export default FeedbackRequestQueue;
