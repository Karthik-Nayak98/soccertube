import { Container, Flex, SimpleGrid, useBreakpointValue } from '@chakra-ui/react';
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
