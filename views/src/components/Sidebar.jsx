// Sidebar.js
import React, { useState } from 'react';
import { Stack, rem } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom'; 
import { IconLogout } from '@tabler/icons-react';
import { useDispatch } from 'react-redux'; 
import { clearUser, logoutUser } from '../features/Auth/authSlice'; 

function NavbarLink({ to, icon, label, active, onClick }) {
  const linkStyle = {
    width: rem(50),
    height: rem(50),
    borderRadius: 'var(--mantine-radius-md)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--mantine-color-black)',
  };

  if (active) {
    linkStyle.boxShadow = 'var(--mantine-shadow-sm)';
    linkStyle.backgroundColor = 'var(--mantine-color-white)';
    linkStyle.color = 'var(--mantine-color-black)';
  }

  return (
    <Link to={to}>
      <div onClick={onClick} style={linkStyle} data-active={active || undefined}>
        {React.createElement(icon, { style: { width: rem(20), height: rem(20), stroke: 1.5 } })}
      </div>
    </Link>
  );
}

export function Sidebar({ navItems }) {
  const [active, setActive] = useState(0);
  const location = useLocation();
  const dispatch = useDispatch(); // Get access to dispatch function

  const links = navItems.map((link, index) => (
    <NavbarLink
      to={link.to}
      icon={link.icon}
      label={link.label}
      active={index === active}
      onClick={() => setActive(index)}
      key={link.label}
    />
  ));

  const handleLogout = () => {
    // Use logoutUser to perform logout logic, including making the request
    dispatch(logoutUser());
  };

  const sidebarStyle = {
    width: rem(80),
    height: '100vh',
    padding: 'var(--mantine-spacing-md)',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#F9EB02',
  };

  const navbarMainStyle = {
    flex: 1,
    marginTop: rem(50),
  };

  return (
    <nav style={sidebarStyle}>
      <div style={navbarMainStyle}>
        <Stack justify="center" gap={160}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        {/* Use handleLogout as onClick handler */}
        <NavbarLink to="/" icon={IconLogout} label="Logout" onClick={handleLogout} />
      </Stack>
    </nav>
  );
}

export default Sidebar;
