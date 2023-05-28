import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user, createUserWithEmail } = useAuth();

  async function registerUser(event) {
    event.preventDefault();
    setLoading(true);
    setErrorMsg('');
    const { error } = await createUserWithEmail(username, email, password);
    error.message ? setErrorMsg(error.message) : navigate('/');
    setLoading(false);
  }

  useEffect(() => {
    if (user) {
      setErrorMsg('');
      navigate('/');
    }
  }, [user]);

  return (
    <Flex width='full' align='center' justifyContent='center'>
      <Box
        p='20px'
        my='4rem'
        maxW='450px'
        w='75%'
        border='1px'
        borderColor='gray.300'
        borderRadius='8px'
        boxShadow='lg'>
        <Heading
          as='h2'
          fontWeight={400}
          letterSpacing='-0.5px'
          color='blue.400'
          textAlign='center'>
          Register
        </Heading>
        {errorMsg ? <FormErrorMessage>{errorMsg}</FormErrorMessage> : null}
        <form onSubmit={registerUser}>
          <FormControl isRequired mt='10px'>
            <FormLabel>Username</FormLabel>
            <Input
              type='text'
              placeholder='Enter your username'
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </FormControl>
          <FormControl isRequired mt='10px'>
            <FormLabel>Email</FormLabel>
            <Input
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormControl>
          <FormControl isRequired mt='10px'>
            <FormLabel>Password</FormLabel>
            <Input
              type='password'
              value={password}
              placeholder='Enter your password'
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormControl>
          <Button
            isLoading={isLoading}
            loadingText='Registering!!'
            w='full'
            mt={4}
            colorScheme='blue'
            type='submit'>
            Register
          </Button>
          <Text mt={2} mr='2' display='inline-block'>
            Already have an account?
          </Text>
          <Link color='blue.400' as={RouterLink} to='/login'>
            Login
          </Link>
        </form>
      </Box>
    </Flex>
  );
}

export default Register;
