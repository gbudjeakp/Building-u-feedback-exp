import React from 'react'
import Sidebar from '../components/Sidebar';
import { Routes, Route, useLocation } from 'react-router-dom'; 
import { IconFilePlus, IconClipboardText, IconUser } from '@tabler/icons-react';

import FeedbackRequestForm from "../pages/FeedbackrequestForm"
import CreatedRequests from '../pages/CreatedRequests';

function Interndashboard() {
  const mockdata = [
    { icon: IconFilePlus, label: 'Create Feedback request', to: 'requestform' },
    { icon: IconClipboardText, label: 'Feedback Requests', to: 'myrequests'  },
    { icon: IconUser, label: 'Account', to: 'account' },
  ];

  const location = useLocation(); 

  return (
    <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
    <Sidebar navItems={mockdata} /> 
    <Routes location={location}>
        <Route path="/requestform" element={<FeedbackRequestForm />} />
        <Route path="/myrequests" element={<CreatedRequests />} />
        {/* <Route path="account" element={<Account />} /> */}
      </Routes>
  </div>
  )
}

export default Interndashboard