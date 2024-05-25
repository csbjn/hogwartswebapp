import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import PotterLogo from './potter-logo';

const Layout: FC = () => (
  <Box>
    <Flex as="header" p={4} bg="gray.800" color="white" alignItems="center">
      <PotterLogo />
    </Flex>
    <Box as="main" p={4}>
      <Outlet />
    </Box>
  </Box>
);

export default Layout;
