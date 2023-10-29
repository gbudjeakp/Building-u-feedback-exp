import React from "react";
import { Container, Paper, Text, Button, Group } from "@mantine/core";

const sidebarStyles = {
  height: "100%",
  width: "200px",
  backgroundColor: "#f0f0f0",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start", // Items start at the top
  alignItems: "center", // Items spread evenly horizontally
};

const containerStyles = {
  height: "100vh",
  display: "flex",
};

const buttonStyles = {
  marginBottom: "10px",
  width: "100%", // Make buttons take full width of sidebar
};

function Sidebar() {
  return (
    <Container style={containerStyles}>
      <Paper style={sidebarStyles}>
        <Text size="xl" weight={700} align="center" mb="xl">
          Sidebar
        </Text>
        <Group spacing="xs">
          <Button style={buttonStyles} size="lg">
            Item 1
          </Button>
          <Button style={buttonStyles} size="lg">
            Item 2
          </Button>
          <Button style={buttonStyles} size="lg">
            Item 3
          </Button>
        </Group>
      </Paper>
    </Container>
  );
}

export default Sidebar;
