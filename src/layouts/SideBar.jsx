import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';
import { PropTypes } from 'prop-types';
import React from 'react';
import { Menu } from '../components';
import { useSideBar, useSideBarUpdate } from '../context/SidebarContext';

function SideBar({ variant }) {
  const isSidebarOpen = useSideBar();
  const toggleSidebar = useSideBarUpdate();

  if (variant === 'drawer') {
    return (
      <Drawer isOpen={isSidebarOpen} placement='left' onClose={toggleSidebar}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Soccer Tube</DrawerHeader>
          <DrawerBody>
            <Menu />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  } else if (variant === 'sidebar') {
    return (
      <Box m={5} minWidth='9rem' style={{ height: '100vh' }}>
        <Menu />
      </Box>
    );
  } else {
    return <></>;
  }
}

SideBar.propTypes = {
  variant: PropTypes.string.isRequired,
};

export default SideBar;
