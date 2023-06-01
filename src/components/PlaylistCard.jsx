import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { PropTypes } from 'prop-types';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { MdDelete, MdPlaylistPlay } from 'react-icons/md';
import { Link } from 'react-router-dom';
import supabase from '../supabase/client';
import SpinnerContainer from './SpinnerContainer';

function PlaylistCard({ name, id, handleDelete }) {
  const [error, setError] = useState('');
  const [videoId, setVideoId] = useState('');
  const [videoCount, setVideoCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState();
  const { showBoundary } = useErrorBoundary();

  async function getPlaylistVideos() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('playlist_videos')
        .select('video_id', { count: 'exact' })
        .eq('playlist_id', id);
      error && setError(error);
      if (data) {
        setVideoId(data[0]);
        setVideoCount(data.length);
      }
    } catch (error) {
      showBoundary(error);
    } finally {
      setLoading(false);
    }
  }

  const getVideoThumbnail = async (videoId = '') => {
    if (videoId.length)
      await axios
        .get(`/api/video/${videoId}`)
        .then((response) => setVideo(response.data.video));
  };

  useEffect(() => {
    getPlaylistVideos();
  }, []);

  useEffect(() => {
    getVideoThumbnail(videoId?.video_id);
  }, [videoId?.video_id]);

  if (loading) <SpinnerContainer />;
  if (error) <Box>{error}</Box>;

  return (
    <Box>
      <Flex rounded='sm' w='250px' h='150px' bg='gray.300'>
        <Box w='65%'>
          <Link to={`/playlist/${name}`} state={{ id: id }}>
            <Image
              w='100%'
              h='100%'
              objectFit='cover'
              src={video?.thumbnail || 'https://i.postimg.cc/vm5FVWp1/download.png'}
            />
          </Link>
        </Box>
        <Flex
          flex='1'
          direction='column'
          justifyContent='space-around'
          alignItems='center'
          gap=''>
          <Text fontSize='1.2rem'>{videoCount}</Text>
          <MdPlaylistPlay size='3rem' />
          <MdDelete
            onClick={() => handleDelete(id)}
            cursor='pointer'
            size='1.5rem'
          />
        </Flex>
      </Flex>
      <Text fontSize='1.2rem' fontWeight='medium' textTransform='capitalize'>
        {name}
      </Text>
    </Box>
  );
}

PlaylistCard.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
  count: PropTypes.number,
};

export default PlaylistCard;
