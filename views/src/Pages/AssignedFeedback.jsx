import React from 'react'
import FeedbackCard from "../components/FeedbackCard"

function AssignedFeedback() {

  const data = [
    {
        id: 2,
        CodeLead: "Jill Jailbreaker",
        lastActive: "2 days ago",
        Linktoexercise: "www.example.com",
        completed: false,
    },
    {
      id: 3,
      CodeLead: "Jill Jailbreaker",
      lastActive: "2 days ago",
      Linktoexercise: "www.example.com",
      completed: false,
    },
    {
        id: 4,
        CodeLead: "Jill Jailbreaker",
        lastActive: "2 days ago",
        Linktoexercise: "www.example.com",
        completed: false,
    },
    {
        id: 5,
        CodeLead: "Jill Jailbreaker",
        lastActive: "2 days ago",
        Linktoexercise: "www.example.com",
        completed: false,
    },
    {
        id: 6,
        CodeLead: "Jill Jailbreaker",
        lastActive: "2 days ago",
        Linktoexercise: "www.example.com",
        completed: false,
    },
  ];
  return (
    <div><FeedbackCard  data={data} showAddFeedback={true} showComplete={true} pageTitle="MY ASSIGNED FEEDBACKS"/></div>
  )
}

export default AssignedFeedback