import {
  Button,
  Center,
  Container,
  Flex,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { SideBar } from '../layouts';

const smVariant = { navigation: 'drawer' };
const mdVariant = { navigation: 'sidebar' };

function EmptyVideoContainer({ message, error }) {
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });

  return (
    <Flex>
      <SideBar variant={variants?.navigation} />
      <Container maxW='5xl' mr='2rem'>
        <Center h='50vh'>
          <VStack>
            {error ? <Text as='p'>{error}</Text> : <Text as='p'>{message}</Text>}
            <Link p={2} to='/explore' state={{ route: 'All' }}>
              <Button mt={4} size={['md']} colorScheme='blue'>
                Go Back
              </Button>
            </Link>
          </VStack>
        </Center>
      </Container>
    </Flex>
  );
}

EmptyVideoContainer.propTypes = {
  message: PropTypes.string,
  error: PropTypes.string,
};

export default EmptyVideoContainer;
