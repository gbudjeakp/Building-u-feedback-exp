import React from 'react';
import Sidebar from '../components/Sidebar';
import { Routes, Route, useLocation } from 'react-router-dom'; 
import { IconListDetails, IconCheckupList, IconUser } from '@tabler/icons-react';
import FeedbackRequestQueue from '../pages/FeedbackQueue';
import AssignedFeedback from '../pages/AssignedFeedback';

function Mentordashboard() {
  const navItems = [
    { icon: IconListDetails, label: 'Feedback Queue', to: 'feedbackqueue' },
    { icon: IconCheckupList, label: 'Assigned Feedback', to: 'assigned' },
    { icon: IconUser, label: 'Account', to: 'account' }, 
  ];

  const location = useLocation(); 

  return (
    <div style={{ display: "flex", flexDirection: "column-reverse" }}>
      <Sidebar navItems={navItems} />
      <Routes location={location}>
        <Route
          path="/feedbackqueue"
          element={<FeedbackRequestQueue active={0} />}
        />
        <Route path="assigned" element={<AssignedFeedback active={1} />} />
        {/* <Route path="account" element={<Account active={2}/>} /> */}
      </Routes>
    </div>
  );
}

export default Mentordashboard;
