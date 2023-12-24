import React, { useEffect } from "react";
import FeedbackCard from "../components/FeedbackCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedbackRequests } from "../features/Feedbacks/feedbackSlice";

const containerStyle = {
  flexDirection: "column-reverse",
};

function FeedbackQueue() {
  const feedbackData = useSelector(
    (state) => state.feedbackSlice.feedbackRequests.data
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeedbackRequests());
  }, [dispatch]);

  return (
    <div style={containerStyle}>
      {feedbackData && feedbackData.length > 0 && (
        <FeedbackCard
          isAssign={true}
          data={feedbackData}
          pageTitle="FEEDBACK QUEUE"
          isMentor={true}
        />
      )}
    </div>
  );
}

export default FeedbackQueue;
