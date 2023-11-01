import React from 'react'
import FeedbackCard from "../components/FeedbackCard"

function AssignedFeedback() {

  const data = [
    {
        id: 2,
        name: "Jill Jailbreaker",
        CodeLead: "Jill xzcxs",
        lastActive: "2 days ago",
        Linktoexercise: "www.example.com",
        completed: false,
        feedbacks: []
    },
    {
      id: 3,
      name: "Jill Jailbreaker",
      CodeLead: "Jill Jailbreaker",
      lastActive: "2 days ago",
      Linktoexercise: "www.example.com",
      completed: false,
      feedbacks: []
    },
    {
        id: 4,
        name: "Jill Jailbreaker",
        CodeLead: "Jill Jailbreaker",
        lastActive: "2 days ago",
        Linktoexercise: "www.example.com",
        completed: false,
        feedbacks: []
    },
    {
        id: 5,
        name: "Jill sgrwggrwg",
        CodeLead: "Jill Jailbreaker",
        lastActive: "2 days ago",
        Linktoexercise: "www.example.com",
        completed: false,
        feedbacks: []
    },
    {
        id: 6,
        name: "Jill wgwgwgw",
        CodeLead: "Jill Jailbreaker",
        lastActive: "2 days ago",
        Linktoexercise: "www.example.com",
        completed: false,
        feedbacks: []
    },
  ];
  return (
    <div><FeedbackCard data={data} showAddFeedback={true} showComplete={true} pageTitle="MY ASSIGNED FEEDBACKS"/></div>
  )
}

export default AssignedFeedback