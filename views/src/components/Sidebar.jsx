// Sidebar.js
import React, { useEffect, useState } from "react";
import { Stack, rem, Tooltip } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import { IconLogout } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { clearUser, logoutUser } from "../features/Auth/authSlice";

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
    // Feel free to change position / offset
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
  // this default active state of 0 selects sidebar NavLink at 0 index
  const [active, setActive] = useState(0);
  const location = useLocation();
  const dispatch = useDispatch(); // Get access to dispatch function

  // temporary fix for wrong sidebar icon selected
  useEffect(() => {
    if (
      location.pathname === "/intern/requestform" ||
      location.pathname === "/mentor/feedbackqueue"
    ) {
      setActive(0);
    } else if (
      location.pathname === "/intern/myrequests" ||
      location.pathname === "/mentor/assigned"
    ) {
      setActive(1);
    } else {
      setActive(2);
    }
    // console.log("locatoin changed")
  }, [location.pathname]);

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
    height: "100vh",
    padding: "var(--mantine-spacing-md)",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#F9EB02",
    position: "fixed",
    top: "0",
    bottom: "0"
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
        <NavbarLink
          to="/"
          icon={IconLogout}
          label="Logout"
          onClick={handleLogout}
        />
      </Stack>
    </nav>
  );
}

export default Sidebar;
