import React from 'react'
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';



function Mentordashboard() {

  const feedbackrequests = useSelector(state => state.feedbackRequests);
 

  console.log(feedbackrequests);

  const renderedFeedback = feedbackrequests.map((feedbackRequest, index)=>{
     return (
        <li key={index}>{feedbackRequest.forms[0]}</li>
     )
  })


  return (
    <div>
    <h1>Mentor Dashboard</h1>
     { renderedFeedback }
    </div>
  )
}

export default Mentordashboard