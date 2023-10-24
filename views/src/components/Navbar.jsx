import React from "react";
import { useState } from "react";
import { Center, Tooltip, UnstyledButton, Stack, rem } from "@mantine/core";
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
  IconSwitchHorizontal,
} from "@tabler/icons-react";

function NavbarLink({ icon, label, active, onClick }) {
  const linkStyles = {
    width: rem(50),
    height: rem(50),
    borderRadius: "var(--mantine-radius-md)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "light-dark(var(--mantine-color-gray-7), var(--mantine-color-dark-0))",
  };

  const activeLinkStyles = {
    backgroundColor: "var(--mantine-color-blue-light)",
    color: "var(--mantine-color-blue-light-color)",
  };

  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        style={active ? { ...linkStyles, ...activeLinkStyles } : linkStyles}
        data-active={active || undefined}
      >
        {React.createElement(icon, { style: { width: rem(20), height: rem(20), stroke: 1.5 } })}
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: "Home" },
  { icon: IconGauge, label: "Dashboard" },
  { icon: IconDeviceDesktopAnalytics, label: "Analytics" },
  { icon: IconCalendarStats, label: "Releases" },
  { icon: IconUser, label: "Account" },
  { icon: IconFingerprint, label: "Security" },
  { icon: IconSettings, label: "Settings" },
];

function Navbar() {
  const [active, setActive] = useState(2);

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  const navbarStyles = {
    width: rem(80),
    height: rem(750),
    padding: "var(--mantine-spacing-md)",
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))",
  };

  const navbarMainStyles = {
    flex: 1,
    marginTop: rem(50),
  };

  return (
    <nav style={navbarStyles}>
      <Center>
        Logo Here
      </Center>

      <div style={navbarMainStyles}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <NavbarLink icon={IconSwitchHorizontal} label="Change account" />
        <NavbarLink icon={IconLogout} label="Logout" />
      </Stack>
    </nav>
  );
}

export default Navbar;
