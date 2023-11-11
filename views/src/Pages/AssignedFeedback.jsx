import React, { useEffect } from "react";
import FeedbackCard from "../components/FeedbackCard";
import { useDispatch, useSelector } from "react-redux";
import { getAssignedFeedbackRequests } from "../features/Feedbacks/feedbackSlice";
import getJwtToken from "../Utility/getJwtToken";


function AssignedFeedback() {
  const dispatch = useDispatch();
  const assignedFeedbacks = useSelector(
    (state) => state.feedbackSlice.feedbackRequests
  );

  useEffect(() => {
    const jwtToken = getJwtToken(); 

    dispatch(getAssignedFeedbackRequests(jwtToken));
  }, [dispatch]);

  // Example data for testing (you can replace this with your actual data)
  const data = [
    {
      id: 1,
      studentName: "tom@mail.com",
      topicOfLearningSession: "Data Structures and Algorithms",
      codeLink: "linkktocode.com",
      whoisAssigned: null,
      isAssigned: false,
      status: false,
      date: "2023-11-01T06:36:37.000Z",
      createdAt: "2023-11-01T06:36:37.000Z",
      updatedAt: "2023-11-01T06:36:37.000Z",
      userId: 1,
    },
  ];

  return (
    <div>
      <FeedbackCard
        data={assignedFeedbacks}
        showAddFeedback={true}
        showComplete={true}
        pageTitle="MY ASSIGNED FEEDBACKS"
      />
    </div>
  );
}

export default AssignedFeedback;
