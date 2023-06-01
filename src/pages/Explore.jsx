import { Container, Flex, SimpleGrid, useBreakpointValue } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BadgeList, SpinnerContainer, VideoCard } from '../components';
import { SideBar } from '../layouts';

const smVariant = { navigation: 'drawer' };
const mdVariant = { navigation: 'sidebar' };

function Explore() {
  const location = useLocation();

  const [videos, setVideos] = useState();
  const category = useRef('All');
  const [filteredVideos, setFilteredVideos] = useState([]);
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });
  const [loading, setLoading] = useState(false);

  const filterVideos = (category) => {
    category === 'All'
      ? setFilteredVideos(videos)
      : setFilteredVideos(videos?.filter((video) => video.category === category));
  };

  useEffect(() => {
    setLoading(true);
    category.current = location.state.route;
    axios.get('/api/videos').then((response) => setVideos(response.data.videos));
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    filterVideos(category.current);
    setLoading(false);
  }, [videos]);

  if (loading) return <SpinnerContainer />;

  return (
    <Flex>
      <SideBar variant={variants?.navigation} />
      <Container maxW='5xl' mr='2rem'>
        <BadgeList ref={category} filterVideos={filterVideos} />
        <SimpleGrid columns={[1, 2, 3]} spacing='1.5rem' mt={4}>
          {filteredVideos?.map((video) => (
            <VideoCard key={video._id} {...video} />
          ))}
        </SimpleGrid>
      </Container>
    </Flex>
  );
}

export default Explore;
