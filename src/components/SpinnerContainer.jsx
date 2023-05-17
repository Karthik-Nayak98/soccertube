import {
  Center,
  Container,
  Flex,
  Spinner,
  useBreakpointValue,
} from '@chakra-ui/react';
import React from 'react';
import { SideBar } from '../layouts';

const smVariant = { navigation: 'drawer' };
const mdVariant = { navigation: 'sidebar' };

function SpinnerContainer() {
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });
  return (
    <Flex>
      <SideBar variant={variants?.navigation} />
      <Container maxW='5xl' mr='2rem'>
        <Center h='90vh'>
          <Spinner thickness='4px' speed='0.65s' color='blue.500' size='xl' />
        </Center>
      </Container>
    </Flex>
  );
}

export default SpinnerContainer;
