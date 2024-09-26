// Sidebar.js
import React, { useState } from "react";
import { Stack, rem, Tooltip } from "@mantine/core";
import { Link } from "react-router-dom";

function NavbarLink({ to, icon, label, active, onClick }) {
  const linkStyle = {
    width: rem(50),
    height: rem(50),
    borderRadius: "var(--mantine-radius-md)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--mantine-color-black)",
  };

  if (active) {
    linkStyle.boxShadow = "var(--mantine-shadow-sm)";
    linkStyle.backgroundColor = "var(--mantine-color-white)";
    linkStyle.color = "var(--mantine-color-black)";
  }

  return (
    <Tooltip label={label} position="bottom-start" offset={5}>
      <Link to={to}>
        <div
          onClick={onClick}
          style={linkStyle}
          data-active={active || undefined}
        >
          {React.createElement(icon, {
            style: { width: rem(20), height: rem(20), stroke: 1.5 },
          })}
        </div>
      </Link>
    </Tooltip>
  );
}

export function Sidebar({ navItems }) {
  const [active, setActive] = useState(0);

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

  const sidebarStyle = {
    width: rem(80),
    height: "100vh",
    padding: "var(--mantine-spacing-md)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#F9EB02",
    position: "fixed",
    top: 0,
    bottom: 0,
  };

  return (
    <nav style={sidebarStyle}>
      <Stack justify="flex-start" spacing="sm" gap={75}>
        {links.slice(0, -1)}{" "}
        {/* Render all links except logout since we want it at the bottom */}
      </Stack>
      <div>
        {links[links.length - 1]}{" "}
        {/* This renders the logout link at the very bottom */}
      </div>
    </nav>
  );
}

export default Sidebar;
