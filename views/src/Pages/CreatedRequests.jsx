import React from 'react'
import FeedbackCard from "../components/FeedbackCard"

function CreatedRequests() {

    const data = [
        {
            id: 2,
            CodeLead: "Coder",
            lastActive: "2 days ago",
            Linktoexercise: "www.example.com",
            completed: false,
            feedbacks: []
        },
        {
          id: 3,
          CodeLead: "Code reviewer",
          lastActive: "2 days ago",
          Linktoexercise: "www.example.com",
          completed: false,
          feedbacks: []
        },
        {
            id: 4,
            CodeLead: "Code Person",
            lastActive: "2 days ago",
            Linktoexercise: "www.example.com",
            completed: false,
            feedbacks: []
        },
        {
            id: 5,
            CodeLead: "Code mentor",
            lastActive: "2 days ago",
            Linktoexercise: "www.example.com",
            completed: false,
            feedbacks: []
        },
        {
            id: 6,
            CodeLead: "Code Lead 1",
            lastActive: "2 days ago",
            Linktoexercise: "www.example.com",
            completed: false,
            feedbacks: []
        },
      ];

  return (
    <div>
        <FeedbackCard  isMentor={true} showViewFeedback={true} data={data} pageTitle="MY FEEDBACK REQUESTS" />
        </div>
  )
}

export default CreatedRequests