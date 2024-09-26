import React from "react";
import Sidebar from "../components/Sidebar";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  IconListDetails,
  IconCheckupList,
  IconUser,
  IconLogout,
  IconTable,
} from "@tabler/icons-react";
import FeedbackRequestQueue from "../Pages/FeedbackQueue";
import AssignedFeedback from "../Pages/AssignedFeedback";
import Account from "../Pages/Account";
import TopBar from "../components/TopBar";
import Checklist from "./Checklist";

function Mentordashboard(props) {
  const navItems = [
    { icon: IconListDetails, label: "Feedback Queue", to: "feedbackqueue" },
    { icon: IconCheckupList, label: "Assigned Feedback", to: "assigned" },
    { icon: IconUser, label: "Account", to: "account" },
    { icon: IconTable, label: "Checklist", to: "checklist" },
    { icon: IconLogout, label: "Logout", to: "logout  " },
  ];

  const location = useLocation();

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <TopBar user={props.user} />
      <Sidebar navItems={navItems} />
      <Routes location={location}>
        <Route
          path="/feedbackqueue"
          element={<FeedbackRequestQueue active={0} user={props.user} />}
        />
        <Route
          path="assigned"
          element={<AssignedFeedback active={1} user={props.user} />}
        />
        <Route
          path="account"
          element={<Account active={2} user={props.user} />}
        />
        <Route
          path="/checklist"
          element={<Checklist active={3} user={props.user} />}
        />
      </Routes>
    </div>
  );
}

export default Mentordashboard;
