import React, { useEffect } from "react";
import FeedbackCard from "../components/FeedbackCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedbackRequests } from "../features/Feedbacks/feedbackSlice";

function FeedbackQueue(props) {
  const dispatch = useDispatch();
  const feedbackData = useSelector((state) => state.feedbackSlice.feedbackRequests);
  
  useEffect(() => {
    dispatch(fetchFeedbackRequests());
  }, [dispatch]);

  return (
    <div>
      <FeedbackCard
        isAssign={true}
        data={feedbackData}
        pageTitle="FEEDBACK QUEUE"
        user={props.user}
      />
    </div>
  );
}

export default FeedbackQueue;
