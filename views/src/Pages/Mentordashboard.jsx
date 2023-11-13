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
    <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
      <Sidebar navItems={navItems} />
      <Routes location={location}> 
        <Route path="/feedbackqueue" element={<FeedbackRequestQueue />} />
        <Route path="assigned" element={<AssignedFeedback />} />
        {/* <Route path="account" element={<Account />} /> */}
      </Routes>
    </div>
  );
}

export default Mentordashboard;
