import React from 'react'
import Sidebar from '../components/Sidebar';
import { IconFilePlus, IconClipboardText, IconUser } from '@tabler/icons-react';

function Interndashboard() {
  const mockdata = [
    { icon: IconFilePlus, label: 'Create Feedback request' },
    { icon: IconClipboardText, label: 'Feedback Requests' },
    { icon: IconUser, label: 'Account' },
  ];

  return (
    <>
    <Sidebar navItems={mockdata} /> 
  </>
  )
}

export default Interndashboard