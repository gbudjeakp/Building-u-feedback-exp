import React from "react";
import Sidebar from "../components/Sidebar";
import { Routes, Route, useLocation } from "react-router-dom";
import { Stack, rem, Tooltip } from "@mantine/core";
import {
  IconFilePlus,
  IconClipboardText,
  IconUser,
  IconListDetails,
  IconTable,
  IconLogout,
} from "@tabler/icons-react";
import FeedbackRequestForm from "../Pages/FeedbackrequestForm";
import FeedbackRequestQueue from "../Pages/FeedbackQueue";
import CreatedRequests from "../Pages/CreatedRequests";
import Account from "../Pages/Account/";
import TopBar from "../components/TopBar";
import Checklist from "./Checklist";

function Interndashboard(props) {
  const navItems = [
    { icon: IconFilePlus, label: "Create Feedback request", to: "requestform" },
    { icon: IconListDetails, label: "Feedback Queue", to: "feedbackqueue" },
    { icon: IconClipboardText, label: "Feedback Requests", to: "myrequests" },
    { icon: IconUser, label: "Account", to: "account" },
    { icon: IconTable, label: "Checklist", to: "checklist" },
    { icon: IconLogout, label: "Logout", to: "logout" },
  ];

  const location = useLocation();

  return (
    <div style={{ display: "flex" }}>
      <Sidebar navItems={navItems} />
      <div style={{ flex: 1, marginLeft: rem(1) }}>
        <TopBar user={props.user} />
        <Routes location={location}>
          <Route
            path="/feedbackqueue"
            element={<FeedbackRequestQueue active={0} user={props.user} />}
          />
          <Route
            path="/requestform"
            element={<FeedbackRequestForm active={0} user={props.user} />}
          />
          <Route
            path="/myrequests"
            element={<CreatedRequests active={1} user={props.user} />}
          />
          <Route
            path="/account"
            element={<Account active={2} user={props.user} />}
          />
          <Route
            path="/checklist"
            element={<Checklist active={3} user={props.user} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default Interndashboard;
