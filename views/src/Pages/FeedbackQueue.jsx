import React, { useEffect } from "react";
import FeedbackCard from "../components/FeedbackCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedbackRequests } from "../features/Feedbacks/feedbackSlice";

function FeedbackQueue() {
  const dispatch = useDispatch();
  const feedbackData = useSelector((state) => state.feedbackSlice.feedbackRequests);
  
  useEffect(() => {
    dispatch(fetchFeedbackRequests());
  }, [dispatch]);

  return (
    <div>
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
