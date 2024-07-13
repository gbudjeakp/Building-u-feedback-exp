import React from 'react';
import { Text, Container } from '@mantine/core';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Container>
      <div span="auto">
        <Text size="lg" align="center">
          Building-U @{currentYear}
        </Text>
      </div>
    </Container>
  );
};

export default Footer;