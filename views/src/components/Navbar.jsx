import React, { useState } from 'react';
import { Center, Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { IconHome2, IconGauge, IconUser, IconSettings, IconLogout } from '@tabler/icons-react';
import Logo from '../assets/logo.png';

function NavbarLink({ icon, label, active, to }) {
  const linkStyles = {
    width: rem(50),
    height: rem(50),
    borderRadius: 'var(--mantine-radius-md)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'light-dark(var(--mantine-color-gray-7), var(--mantine-color-dark-0))',
  };

  const activeLinkStyles = {
    backgroundColor: 'var(--mantine-color-blue-light)',
    color: 'var(--mantine-color-blue-light-color)',
  };

  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
        <UnstyledButton
          style={active ? { ...linkStyles, ...activeLinkStyles } : linkStyles}
          data-active={active || undefined}
        >
          {React.createElement(icon, { style: { width: rem(20), height: rem(20), stroke: 1.5 } })}
        </UnstyledButton>
      </Tooltip>
    </Link>
  );
}

function Navbar({ isMentor  }) {
  const [active, setActive] = useState(0); // Set the default active index

  // Define menu items based on the user's role
  const getMenuItems = () => {
    if (isMentor) {
      return [
        { icon: IconHome2, label: 'Home', to: '/' },
        { icon: IconGauge, label: 'Feedback Requests', to: '/mentor' },
        { icon: IconGauge, label: 'Assigned Feedback', to: '/assignedfeedback' },
        { icon: IconLogout, label: 'Logout', to: '/logout' },
      ];
    } else {
      return [
        { icon: IconHome2, label: 'Home', to: '/' },
        { icon: IconGauge, label: 'My Feedback Requests', to: '/my-requests' },
        { icon: IconGauge, label: 'Submit Feedback Request', to: '/submit-request' },
        { icon: IconLogout, label: 'Logout', to: '/logout' },
      ];
    }
  };

  const links = getMenuItems().map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
    />
  ));

  const navbarStyles = {
    width: rem(80),
    height: rem(750),
    padding: 'var(--mantine-spacing-md)',
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))',
  };

  const navbarMainStyles = {
    flex: 1,
    marginTop: rem(50),
  };

  const logoStyles = {
    width: rem(100),
    height: rem(100),
  };

  return (
    <nav style={navbarStyles}>
      <Center>
        <img src={Logo} alt="App Logo" style={logoStyles} />
      </Center>

      <div style={navbarMainStyles}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>
    </nav>
  );
}

export default Navbar;
