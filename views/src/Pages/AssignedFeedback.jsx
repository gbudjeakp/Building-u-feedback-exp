import React, { useEffect } from "react";
import FeedbackCard from "../components/FeedbackCard";
import { useDispatch, useSelector } from "react-redux";
import { getAssignedFeedbackRequests } from "../features/Feedbacks/feedbackSlice";

function AssignedFeedback(props) {
  const dispatch = useDispatch();
  const assignedFeedbacks = useSelector((state) => state.feedbackSlice.assignedFeedbackRequests);

  useEffect(() => {
    dispatch(getAssignedFeedbackRequests());
  }, [dispatch]);

  return (
    <div>
      <FeedbackCard
        data={assignedFeedbacks}
        showAddFeedback={true}
        showComplete={true}
        pageTitle="MY ASSIGNED FEEDBACKS"
        user={props.user}
      />
    </div>
  );
}

export default AssignedFeedback;
