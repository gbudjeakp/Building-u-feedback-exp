import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { submitFeedbackRequest } from "../features/FeedbackForms/feedbackrequestSlice";

function FeedbackrequestForm() {
  const [topicOfLearningSession, setTopicOfLearningSession] = useState("");
  const [codeLink, setcodeLink] = useState("");
   const dispatch = useDispatch()

  const submitRequest = (event) => {
    event.preventDefault();

    let feedbackRequestData = topicOfLearningSession;
    
    dispatch(submitFeedbackRequest(feedbackRequestData))

    setTopicOfLearningSession("")
    // console.log(feedbackRequestData);
  };
  return (
    <div>
      <form action="">
        <h1>Submit Feedback Request</h1>
        <input
          type="text"
          name="topicOfLearningSession"
          placeholder="Topic of Learning Session"
          onChange={(event) => setTopicOfLearningSession(event.target.value)}
          value={topicOfLearningSession}
        />

        <input
          type="text"
          name="codeLink"
          placeholder="Link to code"
          onChange={(event) => setcodeLink(event.target.value)}
          value={codeLink}
        />
        <button type="submit" onClick={submitRequest}>
          Request Feedback
        </button>
      </form>
    </div>
  );
}

export default FeedbackrequestForm;
