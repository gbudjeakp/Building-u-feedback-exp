import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Drawer, Text } from "@mantine/core";
import FeedbackQueue from "../components/FeedbackQueue";

function MentorDashboard() {

  return (
    <div>
     <h1>Mentor Page</h1>
     <FeedbackQueue />
    </div>
  );
}

export default MentorDashboard;
