import {
  Badge,
  Container,
  Flex,
  SimpleGrid,
  useBreakpointValue,
  Wrap,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { VideoCard } from '../components';
import { SideBar } from '../layouts';

const smVariant = { navigation: 'drawer' };
const mdVariant = { navigation: 'sidebar' };

function Explore() {
  const [videos, setVideos] = useState();
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });

  useEffect(() => {
    axios.get('/api/videos').then((response) => setVideos(response.data.videos));
  }, []);

  return (
    <Flex height='100vh'>
      <SideBar variant={variants?.navigation} />
      <Container maxW='5xl'>
        <Wrap mt={4}>
          <Badge
            variant='outline'
            px={[2, 3, 4]}
            py={[0.6, 0.8, 1]}
            fontSize={['0.85rem', '0.95rem', '1rem']}
            borderRadius={8}>
            All
          </Badge>
          <Badge
            variant='outline'
            px={[2, 3, 4]}
            py={[0.6, 0.8, 1]}
            fontSize={['0.85rem', '0.95rem', '1rem']}
            borderRadius={8}>
            Best Goals
          </Badge>
          <Badge
            variant='outline'
            px={[2, 3, 4]}
            py={[0.6, 0.8, 1]}
            fontSize={['0.85rem', '0.95rem', '1rem']}
            borderRadius={8}>
            Best Save
          </Badge>
          <Badge
            variant='outline'
            px={[2, 3, 4]}
            py={[0.6, 0.8, 1]}
            fontSize={['0.85rem', '0.95rem', '1rem']}
            borderRadius={8}>
            Skills
          </Badge>
          <Badge
            variant='outline'
            px={[2, 3, 4]}
            py={[0.6, 0.8, 1]}
            fontSize={['0.85rem', '0.95rem', '1rem']}
            borderRadius={8}>
            Best Freekick
          </Badge>
        </Wrap>
        <SimpleGrid columns={[1, 2, 3]} spacing='1.5rem' mt={4}>
          {videos?.map((video) => (
            <VideoCard key={video._id} {...video} />
          ))}
        </SimpleGrid>
      </Container>
    </Flex>
  );
}

export default Explore;
