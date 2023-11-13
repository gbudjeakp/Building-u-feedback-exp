import React from 'react'
import FeedbackCard from "../components/FeedbackCard"

function CreatedRequests() {

    const data = [
        {
                id: 6,
                studentName: "tom@mail.com",
                topicOfLearningSession: "Checking that status is not Complete and should only show not complete\n",
                codeLink: "Can't be cmplete",
                whoisAssigned: "tom@mail.com",
                isAssigned: false,
                status: false,
                date: "2023-11-12T02:52:12.000Z",
                createdAt: "2023-11-12T02:52:12.000Z",
                updatedAt: "2023-11-12T22:45:04.000Z",
                userId: 2
        },
        {
            id: 6,
            studentName: "tom@mail.com",
            topicOfLearningSession: "Checking that status is not Complete and should only show not complete\n",
            codeLink: "Can't be cmplete",
            whoisAssigned: "tom@mail.com",
            isAssigned: false,
            status: false,
            date: "2023-11-12T02:52:12.000Z",
            createdAt: "2023-11-12T02:52:12.000Z",
            updatedAt: "2023-11-12T22:45:04.000Z",
            userId: 2
        },
        {
            id: 6,
            studentName: "tom@mail.com",
            topicOfLearningSession: "Checking that status is not Complete and should only show not complete\n",
            codeLink: "Can't be cmplete",
            whoisAssigned: "tom@mail.com",
            isAssigned: false,
            status: false,
            date: "2023-11-12T02:52:12.000Z",
            createdAt: "2023-11-12T02:52:12.000Z",
            updatedAt: "2023-11-12T22:45:04.000Z",
            userId: 2
        },
      ];

  return (
    <div>
        <FeedbackCard showViewFeedback={true} data={data} pageTitle="MY FEEDBACK REQUESTS" />
        </div>
  )
}

export default CreatedRequests