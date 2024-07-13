import React, { useEffect } from "react";
import FeedbackCard from "../components/FeedbackCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchInternFeedbackRequests } from "../features/Feedbacks/feedbackSlice";

function CreatedRequests(props) {
  const dispatch = useDispatch();
  const internFeedbackRequests = useSelector((state) => state.feedbackSlice.feedbackRequests);

  useEffect(() => {
    dispatch(fetchInternFeedbackRequests());
  }, [dispatch]);

  return (
    <div>
      <FeedbackCard
        showViewFeedback={true}
        data={internFeedbackRequests}
        pageTitle="MY FEEDBACK REQUESTS"
        user={props.user}
      />
    </div>
  );
}

export default CreatedRequests;
