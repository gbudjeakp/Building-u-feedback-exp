import React, { useState } from "react";
import { Text, Button, Badge, Container } from "@mantine/core";

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

  const feedbackTableStyle = {
    border: "1px solid #ccc",
    borderRadius: 4,
    padding: "10px",
  };

  const feedbackRowStyle = {
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #ccc",
    padding: "10px 0",
  };

  const feedbackCellStyle = {
    flex: 1,
    padding: "10px",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <Container size="lg">
      <Text align="center" size="xl" weight={700} style={{ marginBottom: "20px" }}>
        Feedback Request Queue
      </Text>
      <div style={feedbackTableStyle}>
        <div className="feedback-row header" style={feedbackRowStyle}>
          <div className="feedback-cell" style={feedbackCellStyle}>
            <Text size="lg" weight={700}>
              Name
            </Text>
          </div>
          <div className="feedback-cell" style={feedbackCellStyle}>
            <Text size="lg" weight={700}>
              Email
            </Text>
          </div>
          <div className="feedback-cell" style={feedbackCellStyle}>
            <Text size="lg" weight={700}>
              Created
            </Text>
          </div>
          <div className="feedback-cell" style={feedbackCellStyle}>
            <Text size="lg" weight={700}>
              Status
            </Text>
          </div>
          <div className="feedback-cell" style={feedbackCellStyle}>
            <Text size="lg" weight={700}>
              Action
            </Text>
          </div>
        </div>
        {data.map((item) => (
          <div key={item.id} className="feedback-row" style={feedbackRowStyle}>
            <div className="feedback-cell" style={feedbackCellStyle}>
              {item.name}
            </div>
            <div className="feedback-cell" style={feedbackCellStyle}>
              {item.email}
            </div>
            <div className="feedback-cell" style={feedbackCellStyle}>
              {item.lastActive}
            </div>
            <div className="feedback-cell" style={feedbackCellStyle}>
              <Badge color={item.completed ? "green" : "red"} fullWidth>
                {item.completed ? "Completed" : "Not Completed"}
              </Badge>
            </div>
            <div className="feedback-cell" style={feedbackCellStyle}>
              <Button size="sm" variant="light" color="blue" onClick={() => assignRequest(item.id)}>
                Assign
              </Button>
              <Text size="xs" style={{ marginTop: 5, textAlign: "center" }}>
                {assignedRequests.find((assigned) => assigned.id === item.id) ? "Assigned" : ""}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default FeedbackRequestQueue;
