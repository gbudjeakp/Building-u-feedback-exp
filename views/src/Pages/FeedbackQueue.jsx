import React, { useEffect, useState } from "react";
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

  const [data, setData] = useState(feedbackData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeedbackRequests());
  }, [dispatch]);

  useEffect(() => {
    setData(feedbackData);
  }, [feedbackData]);

  return (
    <div style={containerStyle}>
      {data && (
        <FeedbackCard
          isAssign={true}
          data={data}
          pageTitle="FEEDBACK QUEUE"
          isMentor={true}
        />
      )}
    </div>
  );
}

export default FeedbackQueue;
