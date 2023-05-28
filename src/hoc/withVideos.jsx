import { Container, Flex, SimpleGrid, useBreakpointValue } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { EmptyVideoContainer } from '../components';
import useFetch from '../hooks/useFetch';
import { SideBar } from '../layouts';
import supabase from '../supabase/client';

const smVariant = { navigation: 'drawer' };
const mdVariant = { navigation: 'sidebar' };

const withVideos = (configuration) => (Component) => () => {
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showBoundary } = useErrorBoundary();

  const { data, error, isLoading } = useFetch(configuration.table);

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await supabase.from(configuration.table).delete().eq('video_id', id);
      setVideos((prevVideos) => prevVideos.filter(({ _id }) => id != _id));
    } catch (error) {
      showBoundary(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    async function getLikedVideos() {
      const response = await axios.get('/api/videos');

      const videos = data?.map(({ video_id }) =>
        response.data.videos.find((video) => {
          if (video_id === video._id) return video;
        })
      );
      setVideos(videos);
    }
    getLikedVideos();
  }, [data]);

  if (isLoading || loading) return <SpinnerContainer />;

  if (!data.length)
    return <EmptyVideoContainer error={error} message={configuration.message} />;

  return (
    <Flex>
      <SideBar variant={variants?.navigation} />
      <Container maxW='5xl' mr='2rem'>
        <SimpleGrid columns={[1, 2, 3]} spacing='1.5rem' mt={4}>
          <Component
            supabaseData={data}
            videos={videos}
            handleDelete={handleDelete}
          />
        </SimpleGrid>
      </Container>
    </Flex>
  );
};

export default withVideos;
