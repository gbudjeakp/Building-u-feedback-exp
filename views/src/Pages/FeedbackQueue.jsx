import React from "react";
import FeedbackCard from "../components/FeedbackCard";

const containerStyle = {
  flexDirection: "column-reverse",
};
function FeedbackQueue() {
  const data = [
    {
        id: 2,
        CodeLead: "Jill Jailbreaker",
        name: "Jill Jailbreaker",
        lastActive: "2 days ago",
        Linktoexercise: "www.example.com",
        completed: false,
        feedbacks: []
    },
    {
      id: 3,
      CodeLead: "Jill Jailbreaker",
      name: "Jill Jailbreaker",
      lastActive: "2 days ago",
      Linktoexercise: "www.example.com",
      completed: false,
      feedbacks: []
    },
    {
        id: 4,
        CodeLead: "Code Lead 3",
        name: "Jill Jailbreaker",
        lastActive: "2 days ago",
        Linktoexercise: "www.example.com",
        completed: false,
        feedbacks: []
    },
    {
        id: 5,
        name: "Jill Jailbreaker",
        CodeLead: "Code Lead 1",
        lastActive: "2 days ago",
        Linktoexercise: "www.example.com",
        completed: false,
        feedbacks: []
    },
    {
        id: 6,
        name: "Jill Jailbreaker",
        CodeLead: "Code Lead 2",
        lastActive: "2 days ago",
        Linktoexercise: "www.example.com",
        completed: false,
        feedbacks: []
    },
  ];
  return (
    <div style={containerStyle}>
      <FeedbackCard isAssign={true} data={data}  pageTitle="FEEDBACK QUEUE"/>
    </div>
  );
}

export default FeedbackQueue;
