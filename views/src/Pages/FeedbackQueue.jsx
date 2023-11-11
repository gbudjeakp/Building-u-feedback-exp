import React, { useEffect } from "react";
import FeedbackCard from "../components/FeedbackCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedbackRequests } from "../features/Feedbacks/feedbackSlice";
import getJwtToken from "../Utility/getJwtToken";

const containerStyle = {
  flexDirection: "column-reverse",
};

function FeedbackQueue() {
  const dispatch = useDispatch();
  const feedbackForms = useSelector(
    (state) => state.feedbackSlice.feedbackRequests
  );

  useEffect(() => {
    // Retrieve the JWT token

      dispatch(fetchFeedbackRequests()); // Pass the token to the 
  }, [dispatch]);

  const data = feedbackForms.data;

  const data1 = [
    {
      id: 1,
      studentName: "tom@mail.com",
      topicOfLearningSession: "Data Structures and Algorithms",
      codeLink: "linkktocode.com",
      whoisAssigned: null,
      isAssigned: false,
      status: false,
      date: "2023-11-01T06:36:37.000Z",
      createdAt: "2023-11-01T06:36:37.000Z",
      updatedAt: "2023-11-01T06:36:37.000Z",
      userId: 1,
    },
  ];

  return (
    <div style={containerStyle}>
      <FeedbackCard isAssign={true} data={data} pageTitle="FEEDBACK QUEUE" isMentor={true} />
    </div>
  );
}

export default FeedbackQueue;
