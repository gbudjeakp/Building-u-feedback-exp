import React, { useState } from 'react';
import { Center, Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
import { IconLogout, IconSwitchHorizontal } from '@tabler/icons-react';

function NavbarLink({ icon, label, active, onClick }) {
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
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} style={linkStyle} data-active={active || undefined}>
        {React.createElement(icon, { style: { width: rem(20), height: rem(20), stroke: 1.5 } })}
      </UnstyledButton>
    </Tooltip>
  );
}

export function Sidebar({ navItems }) {
  const [active, setActive] = useState(0);

  const links = navItems.map((link, index) => (
    <NavbarLink
      icon={link.icon}
      label={link.label}
      active={index === active}
      onClick={() => setActive(index)}
      key={link.label}
    />
  ));

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
        <NavbarLink icon={IconLogout} label="Logout" />
      </Stack>
    </nav>
  );
}

export default Sidebar;
