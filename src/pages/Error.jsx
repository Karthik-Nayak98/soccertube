import { Button, Container, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Error() {
  return (
    <Container textAlign='center'>
      <Heading color='blue.500' as='h1' fontSize={['6xl', '8xl']}>
        404
      </Heading>
      <Text color='gray.700' fontWeight={500} fontSize='xl'>
        OOPS, The page you are looking for is not found.
      </Text>
      <Link to='/'>
        <Button mt={4} size={['md', 'lg']} colorScheme='blue'>
          Go Home
        </Button>
      </Link>
    </Container>
  );
}
