import React, { useEffect } from "react";
import FeedbackCard from "../components/FeedbackCard";
import { useDispatch, useSelector } from "react-redux";
import { getAssignedFeedbackRequests } from "../features/Feedbacks/feedbackSlice";

function AssignedFeedback() {
  const dispatch = useDispatch();
  const assignedFeedbacks = useSelector((state) => state.feedbackSlice.assignedFeedbackRequests);

  useEffect(() => {
    dispatch(getAssignedFeedbackRequests());
  }, [dispatch]);

  return (
    <div>
      {assignedFeedbacks && assignedFeedbacks.length > 0 && (
        <FeedbackCard
          data={assignedFeedbacks}
          isMentor={true}
          showAddFeedback={true}
          showComplete={true}
          pageTitle="MY ASSIGNED FEEDBACKS"
        />
      )}
    </div>
  );
}

export default AssignedFeedback;
