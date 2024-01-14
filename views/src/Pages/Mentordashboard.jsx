import React from 'react';
import Sidebar from '../components/Sidebar';
import { Routes, Route, useLocation } from 'react-router-dom'; 
import { IconListDetails, IconCheckupList, IconUser } from '@tabler/icons-react';
import FeedbackRequestQueue from '../pages/FeedbackQueue';
import AssignedFeedback from '../pages/AssignedFeedback';
import TopBar from '../components/TopBar';

function Mentordashboard(props) {
  const navItems = [
    { icon: IconListDetails, label: 'Feedback Queue', to: 'feedbackqueue' },
    { icon: IconCheckupList, label: 'Assigned Feedback', to: 'assigned' },
    { icon: IconUser, label: 'Account', to: 'account' }, 
  ];

  const location = useLocation(); 

  return (
    <div style={{ display: "flex", flexDirection: "column-reverse", position: "relative" }}>
      <TopBar user={props.user} />
      <Sidebar navItems={navItems} />
      <Routes location={location}>
        <Route
          path="/feedbackqueue"
          element={<FeedbackRequestQueue active={0} user={props.user} />}
        />
        <Route path="assigned" element={<AssignedFeedback active={1} user={props.user} />} />
        {/* <Route path="account" element={<Account active={2}/>} /> */}
      </Routes>
    </div>
  );
}

export default Mentordashboard;
