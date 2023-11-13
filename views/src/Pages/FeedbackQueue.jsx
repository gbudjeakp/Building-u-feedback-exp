import React, { useEffect } from "react";
import FeedbackCard from "../components/FeedbackCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedbackRequests } from "../features/Feedbacks/feedbackSlice";

const containerStyle = {
  flexDirection: "column-reverse",
};

function FeedbackQueue() {
  const dispatch = useDispatch();
  const feedbackForms = useSelector(
    (state) => state.feedbackSlice.feedbackRequests
  );

  useEffect(() => {
      dispatch(fetchFeedbackRequests());
  }, [dispatch]);

  const data = feedbackForms.data;

  console.log(data)

  return (
    <div style={containerStyle}>
      <FeedbackCard isAssign={true} data={data} pageTitle="FEEDBACK QUEUE" isMentor={true}  />
    </div>
  );
}

export default FeedbackQueue;
