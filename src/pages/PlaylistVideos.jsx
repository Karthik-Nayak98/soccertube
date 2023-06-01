import {
  Container,
  Flex,
  Heading,
  SimpleGrid,
  useBreakpointValue,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { useLocation, useParams } from 'react-router-dom';
import { SpinnerContainer, VideoCard } from '../components';
import { SideBar } from '../layouts';
import supabase from '../supabase/client';

const smVariant = { navigation: 'drawer' };
const mdVariant = { navigation: 'sidebar' };

function PlaylistVideos() {
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [playlistVideos, setPlaylistVideos] = useState([]);
  const [error, setError] = useState('');
  const { showBoundary } = useErrorBoundary();

  const { playlist } = useParams();
  const { state } = useLocation();

  useEffect(() => {
    setLoading(true);
    axios.get('/api/videos').then((response) => setVideos(response.data.videos));
    setLoading(false);
  }, []);

  function findPlaylistVideos(playlist_videos) {
    setPlaylistVideos(
      playlist_videos?.map((item) =>
        videos?.find((video) => {
          return video._id === item.video_id;
        })
      )
    );
  }

  const handleDeletePlaylistVideo = async (playlist_id, video_id) => {
    setLoading(true);
    try {
      await supabase
        .from('playlist_videos')
        .delete()
        .eq('playlist_id', playlist_id, 'video_id', video_id);

      error && setError(error.message);
      setPlaylistVideos((prevVideos) =>
        prevVideos.filter((video) => video._id != video_id)
      );
    } catch (error) {
      showBoundary(error);
    } finally {
      setLoading(false);
    }
  };

  async function getPlaylistVideos() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('playlist_videos')
        .select()
        .eq('playlist_id', state?.id);
      error && setError(error.message);
      data.length && videos.length && findPlaylistVideos(data);
    } catch (err) {
      showBoundary(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPlaylistVideos();
  }, [videos]);

  if (loading) return <SpinnerContainer />;

  return (
    <Flex>
      <SideBar variant={variants?.navigation} />
      <Container maxW='5xl' mr='2rem'>
        <Heading textTransform='capitalize'>{playlist}</Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing='1.5rem' mt={4}>
          {playlistVideos?.map((video) => (
            <VideoCard
              key={video?._id}
              inPlaylist={true}
              playlist_id={state?.id}
              {...video}
              onDelete={handleDeletePlaylistVideo}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Flex>
  );
}

export default PlaylistVideos;
