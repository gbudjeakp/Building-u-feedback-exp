import React from "react";
import { useSelector } from "react-redux";

function Mentordashboard() {
  const feedbackrequests = useSelector((state) => state.feedbackRequests);


  const renderedFeedback = feedbackrequests.forms;



  return (
    <div>
      <h1>Mentor Dashboard</h1>
      {renderedFeedback.map((el, index) => {
        return <li key={index}>{el}</li>;
      })}
    </div>
  );
}

export default Mentordashboard;
