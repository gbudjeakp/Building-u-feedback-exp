import React, { useEffect, useState } from "react";
import FeedbackCard from "../components/FeedbackCard";
import { useDispatch, useSelector } from "react-redux";
import { getAssignedFeedbackRequests } from "../features/Feedbacks/feedbackSlice";

function AssignedFeedback() {
  const dispatch = useDispatch();
  const data = useSelector(
    (state) => state.feedbackSlice.assignedFeedbackRequests.data
  );

  const [assignedFeedbacks, setAssignedFeedbacks] = useState(data);
  useEffect(() => {
    dispatch(getAssignedFeedbackRequests());
  }, [dispatch]);

  useEffect(() => {
    setAssignedFeedbacks(data);
  }, [data]);

  return (
    <div>
      {assignedFeedbacks && (
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
