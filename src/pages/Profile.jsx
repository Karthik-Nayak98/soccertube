import {
  Button,
  Card,
  CardBody,
  Center,
  Container,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { SideBar } from '../layouts/';

const smVariant = { navigation: 'drawer' };
const mdVariant = { navigation: 'sidebar' };

function Profile() {
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });
  const [loading, setLoading] = useState(false);

  const { user, signOut } = useAuth();

  function handleSignout() {
    setLoading(true);
    signOut();
    setLoading(false);
  }

  return (
    <Flex>
      <SideBar variant={variants?.navigation} />
      <Container maxW={['100%', '75%']} my={4} mr='2rem'>
        <Center h='75vh'>
          <Card w='300px'>
            <Heading px='4' pt='3' size='md'>
              Your Profile
            </Heading>
            <CardBody>
              <Text>
                <Text as='span' fontWeight={600}>
                  Name:{' '}
                </Text>
                {user?.user_metadata.name}
              </Text>
              <Text>
                <Text as='span' fontWeight={600}>
                  Email:{' '}
                </Text>
                {user?.email}
              </Text>
              <Button
                isLoading={loading}
                textTransform='uppercase'
                fontSize='0.9rem'
                w='250px'
                letterSpacing='0.5px'
                size='md'
                mt='4'
                colorScheme='blue'
                onClick={handleSignout}>
                Signout
              </Button>
            </CardBody>
          </Card>
        </Center>
      </Container>
    </Flex>
  );
}

export default Profile;
