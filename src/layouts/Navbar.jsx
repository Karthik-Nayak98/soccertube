import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  useBreakpointValue,
} from '@chakra-ui/react';
import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link, NavLink, Outlet } from 'react-router-dom';
import soccer from '../assets/soccer.svg';
import { useSideBarUpdate } from '../context/SidebarContext';

const smVariant = { showSidebarButton: true };
const mdVariant = { showSidebarButton: false };

function NavBar() {
  const toggleSidebar = useSideBarUpdate();
  const variant = useBreakpointValue({ base: smVariant, md: mdVariant });

  return (
    <>
      <Flex
        style={{
          position: 'sticky',
          zIndex: '200',
          top: 0,
        }}
        w='100%'
        bg='white'
        justifyContent='space-between'
        shadow='lg'
        p={3}
        px={[4, 8]}>
        <Flex justifyContent='center' gap={2} alignItems='center'>
          {variant?.showSidebarButton && (
            <IconButton icon={<GiHamburgerMenu />} onClick={toggleSidebar} />
          )}
          <Link to='/'>
            <Image boxSize={7} src={soccer} alt='logo' />
          </Link>
        </Flex>
        <Box>
          <NavLink to='/login'>
            <Button colorScheme='blue'>Login</Button>
          </NavLink>
        </Box>
      </Flex>
      <Outlet />
    </>
  );
}

export default NavBar;
