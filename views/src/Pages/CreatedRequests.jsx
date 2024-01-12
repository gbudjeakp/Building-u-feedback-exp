import React, { useEffect, useState } from "react";
import FeedbackCard from "../components/FeedbackCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchInternFeedbackRequests } from "../features/Feedbacks/feedbackSlice";

function CreatedRequests() {

  const feedbackData = useSelector(
    (state) => state.feedbackSlice.feedbackRequests.data
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInternFeedbackRequests());
  }, [dispatch]);

  return (
    <div>
      {feedbackData && feedbackData.length > 0 && (
        <FeedbackCard
          showViewFeedback={true}
          data={feedbackData}
          pageTitle="MY FEEDBACK REQUESTS"
        />
      )}
    </div>
  );
}

export default CreatedRequests;
