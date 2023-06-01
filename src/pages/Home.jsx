import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import { useErrorBoundary } from 'react-error-boundary';
import { RiFootballFill } from 'react-icons/ri';
import { SideBar } from '../layouts';

const smVariant = { navigation: 'drawer' };
const mdVariant = { navigation: '' };

export default function Home() {
  const [categories, setCategories] = useState([]);
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    axios
      .get('/api/categories')
      .then((res) => setCategories(res.data.categories))
      .catch((error) => {
        showBoundary(error);
      });
  }, []);

  return (
    <Container py={4} maxW='95%'>
      <Flex
        justifyContent='center'
        flexDirection='column'
        alignItems='center'
        gap='4'
        h={['250', '350']}
        backgroundRepeat='no-repeat'
        backgroundPosition='bottom'
        backgroundImage="linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0,
        0.5)),url('https://i.postimg.cc/L82JTmwx/field-background.webp')">
        <Text textAlign='center' fontSize={['md', '3xl']} color='white'>
          Find amazing videos related to football
        </Text>
        <Link to='/explore' state={{ route: 'All' }}>
          <Button
            colorScheme='blue'
            rightIcon={<RiFootballFill />}
            size={['sm', 'md']}>
            Explore Videos
          </Button>
        </Link>
      </Flex>
      <SideBar variant={variants?.navigation} />
      <Box mt={5}>
        <Heading as='h2'>Categories</Heading>
        <Stack direction={['column', 'row']} mx='auto'>
          {categories.map((category) => (
            <Link to='/explore' state={{ route: category.title }} key={category._id}>
              <Card mt='4' maxW='xs'>
                <CardBody>
                  <Image
                    h={180}
                    objectFit='cover'
                    alt={category.title}
                    src={category.imageUrl}
                  />
                  <Text fontWeight={600} textAlign='center' pt='2' fontSize='xl'>
                    {category.title}
                  </Text>
                </CardBody>
              </Card>
            </Link>
          ))}
        </Stack>
      </Box>
    </Container>
  );
}
