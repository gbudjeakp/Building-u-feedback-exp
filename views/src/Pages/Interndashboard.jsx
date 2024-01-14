import React from 'react'
import Sidebar from '../components/Sidebar';
import { Routes, Route, useLocation } from 'react-router-dom'; 
import { IconFilePlus, IconClipboardText, IconUser } from '@tabler/icons-react';

import FeedbackRequestForm from "../pages/FeedbackrequestForm"
import CreatedRequests from '../pages/CreatedRequests';
import TopBar from '../components/TopBar';

function Interndashboard(props) {
  const mockdata = [
    { icon: IconFilePlus, label: 'Create Feedback request', to: 'requestform' },
    { icon: IconClipboardText, label: 'Feedback Requests', to: 'myrequests'  },
    { icon: IconUser, label: 'Account', to: 'account' },
  ];

  const location = useLocation(); 

  return (
    <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
      <TopBar user={props.user} />
      <Sidebar navItems={mockdata} /> 
      <Routes location={location}>
        <Route path="/requestform" element={<FeedbackRequestForm active={0} user={props.user}/>} />
        <Route path="/myrequests" element={<CreatedRequests active={1} user={props.user}/>} />
        {/* <Route path="account" element={<Account active={2}/>} /> */}
      </Routes>
  </div>
  )
}

export default Interndashboard