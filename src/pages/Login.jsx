import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [errorMsg, setErrorMsg] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [guestloading, setGuestLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithEmail, user } = useAuth();

  const guestEmail = 'guest@gmail.com';
  const guestPassword = 'guest@123';

  async function handleGuestLogin(event) {
    event.preventDefault();
    setGuestLoading(true);
    setEmail(guestEmail);
    setPassword(guestPassword);
    setErrorMsg('');
    const { error } = await loginWithEmail(guestEmail, guestPassword);
    setErrorMsg(error.message);
    setGuestLoading(true);
  }

  async function handleLogin(event) {
    event.preventDefault();
    setLoading(true);
    setErrorMsg('');
    const { error } = await loginWithEmail(email, password);
    setErrorMsg(error.message);
    setLoading(false);
  }

  useEffect(() => {
    user ? navigate(`${location?.state}`) : null;
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
          Login
        </Heading>

        {errorMsg ? <Text style={{ color: 'red' }}>{errorMsg}</Text> : null}
        <form onSubmit={handleLogin}>
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
              placeholder='Enter your password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormControl>
          <Button
            isLoading={guestloading}
            w='full'
            mt={4}
            colorScheme='blue'
            type='button'
            onClick={handleGuestLogin}>
            Login as Guest
          </Button>
          <Button
            isLoading={loading}
            w='full'
            mt={4}
            colorScheme='blue'
            type='submit'>
            Login
          </Button>
          <Text mt={2} mr='2' display='inline-block'>
            Do not have an account?
          </Text>
          <Link color='blue.400' as={RouterLink} to='/register'>
            Register
          </Link>
        </form>
      </Box>
    </Flex>
  );
}

export default Login;
