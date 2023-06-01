import { Container, Flex, useBreakpointValue } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { EmptyVideoContainer, SpinnerContainer } from '../components';
import useFetch from '../hooks/useFetch';
import { SideBar } from '../layouts';
import supabase from '../supabase/client';

const smVariant = { navigation: 'drawer' };
const mdVariant = { navigation: 'sidebar' };

const withVideos = (configuration) => (Component) => () => {
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });
  const [videos, setVideos] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showBoundary } = useErrorBoundary();

  const { data, error, isLoading } = useFetch(configuration.table);

  const handleDelete = async (data_id) => {
    try {
      setLoading(true);
      await supabase
        .from(configuration.table)
        .delete()
        .eq(configuration.field, data_id);

      if (configuration.table === 'playlist') {
        setPlaylist((prevPlaylist) =>
          prevPlaylist.filter(({ id }) => data_id != id)
        );
      } else {
        setVideos((prevVideos) => prevVideos.filter(({ _id }) => data_id != _id));
      }
    } catch (error) {
      showBoundary(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function getVideos() {
      const response = await axios.get('/api/videos');

      const videos = data?.map(({ video_id }) =>
        response.data.videos.find((video) => {
          if (video_id === video._id) return video;
        })
      );
      setVideos(videos);
    }
    getVideos();
  }, [data]);

  useEffect(() => {
    function getPlaylist() {
      setPlaylist(data || []);
    }
    getPlaylist();
  }, [data]);

  if (isLoading || loading) return <SpinnerContainer />;

  if (!data.length)
    return <EmptyVideoContainer error={error} message={configuration.message} />;

  return (
    <Flex>
      <SideBar variant={variants?.navigation} />
      <Container maxW='5xl' mr='2rem'>
        <Component
          supabaseData={Array.isArray(playlist) ? playlist : []}
          videos={videos}
          handleDelete={handleDelete}
        />
      </Container>
    </Flex>
  );
};

export default withVideos;
