import React from "react";
import FeedbackCard from "../components/FeedbackCard";

const containerStyle = {
  flexDirection: "column-reverse",
};
function FeedbackQueue() {
  return (
    <div style={containerStyle}>
      <FeedbackCard />
    </div>
  );
}

export default FeedbackQueue;
