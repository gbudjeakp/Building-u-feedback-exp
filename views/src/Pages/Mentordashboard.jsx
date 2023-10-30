import React from 'react';
import Sidebar from '../components/Sidebar';
import FeedbackRequestQueue from '../components/FeedbackCard';
import { IconListDetails, IconCheckupList, IconUser } from '@tabler/icons-react';


function Mentordashboard() {
  const mockdata = [
    { icon: IconListDetails, label: 'Feedback Queue' },
    { icon: IconCheckupList, label: 'Assigned Feedback' },
    { icon: IconUser, label: 'Account' },
  ];

  return (
    <>
      <Sidebar navItems={mockdata} /> 
    </>
  );
}

export default Mentordashboard;
