import React from "react";
import Sidebar from "../components/Sidebar";
import axios  from "axios";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { clearUser } from '../features/Auth/authSlice';
import { baseUrl } from "../API";
import { rem } from "@mantine/core";
import {
  IconFilePlus,
  IconClipboardText,
  IconUser,
  IconListDetails,
  IconCheckupList,
  IconTable,
  IconLogout,
} from "@tabler/icons-react";
import AssignedFeedback from "../Pages/AssignedFeedback";
import FeedbackRequestForm from "../Pages/FeedbackrequestForm";
import FeedbackRequestQueue from "../Pages/FeedbackQueue";
import CreatedRequests from "../Pages/CreatedRequests";
import Account from "../Pages/Account/";
import TopBar from "../components/TopBar";
import Checklist from "./Checklist";

function Interndashboard(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${baseUrl}/api/users/logout`,
        {},
        {
          withCredentials: true,
        }
      );
  
      dispatch(clearUser());
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error.response?.data || error.message);
      alert('Failed to log out. Please try again.');
    }
  };

  const navItems = [
    { icon: IconFilePlus, label: "Create Feedback request", to: "requestform" },
    { icon: IconListDetails, label: "Feedback Queue", to: "feedbackqueue" },
    { icon: IconClipboardText, label: "Feedback Requests", to: "myrequests" },
    { icon: IconCheckupList, label: "Assigned Feedback", to: "assigned" },
    { icon: IconUser, label: "Account", to: "account" },
    { icon: IconTable, label: "Checklist", to: "checklist" },
    { icon: IconLogout, label: "Logout", onClick: handleLogout },
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
            element={<FeedbackRequestForm active={1} user={props.user} />}
          />
          <Route
            path="/myrequests"
            element={<CreatedRequests active={2} user={props.user} />}
          />
          <Route
            path="/account"
            element={<Account active={3} user={props.user} />}
          />
          <Route
            path="/checklist"
            element={<Checklist active={4} user={props.user} />}
          />
          <Route
            path="/assigned"
            element={<AssignedFeedback active={5} user={props.user} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default Interndashboard;
