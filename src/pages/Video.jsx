import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  Icon,
  Text,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiFillEye, AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { MdOutlineWatchLater, MdPlaylistPlay, MdWatchLater } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { PlaylistModal } from '../components';
import { useAuth } from '../context/AuthContext';
import useCustomToast from '../hooks/useCustomToast';
import SideBar from '../layouts/SideBar';
import supabase from '../supabase/client';
import { displayViews } from '../utils/helper';

const smVariant = { navigation: 'drawer' };
const mdVariant = { navigation: 'sidebar' };

function Video() {
  const { videoId } = useParams();

  const [video, setVideo] = useState();
  const [likedVideoId, setLikedVideoId] = useState(null);
  const [watchLaterVideoId, setWatchLaterVideoId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useCustomToast();
  const { user } = useAuth();

  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });
  useEffect(() => {
    axios
      .get(`/api/video/${videoId}`)
      .then((response) => setVideo(response.data.video));
  }, []);

  async function handleDelete(id, table) {
    try {
      table === 'liked' ? setLikedVideoId(null) : setWatchLaterVideoId(null);
      await supabase.from(table).delete().eq('video_id', id);
      toast(`Video removed from ${table}.`, 'error');
    } catch (error) {
      table === 'liked' ? setLikedVideoId(videoId) : setWatchLaterVideoId(videoId);
      toast(error, 'error');
    }
  }

  useEffect(() => {
    async function getWatchLaterVideo() {
      setWatchLaterVideoId(videoId);
      const { data, error } = await supabase
        .from('watchlater')
        .select()
        .eq('user_id', user?.id)
        .eq('video_id', videoId);
      if (error) {
        setWatchLaterVideoId(null);
        toast('Not able to fetch the watchlater video', 'error');
      }
      if (data) {
        setWatchLaterVideoId(data[0]?.id);
      }
    }
    getWatchLaterVideo();
  }, [videoId]);

  useEffect(() => {
    async function getLikedVideos() {
      setLikedVideoId(videoId);
      const { data, error } = await supabase
        .from('liked')
        .select()
        .eq('user_id', user?.id)
        .eq('video_id', videoId);
      if (error) {
        setLikedVideoId(null);
        toast('Not able to fetch the liked video', 'error');
      }
      if (data) {
        setLikedVideoId(data[0]?.id);
      }
    }
    getLikedVideos();
  }, [videoId]);

  async function handleInsertTable(table) {
    table === 'liked' ? setLikedVideoId(videoId) : setWatchLaterVideoId(videoId);
    const { error } = await supabase
      .from(table)
      .insert({ user_id: user.id, video_id: videoId });
    toast(`Video added to ${table}`, 'success');
    if (error) {
      table === 'liked' ? setLikedVideoId(null) : setWatchLaterVideoId(null);
      toast(error, 'error');
    }
  }

  return (
    <Flex>
      <SideBar variant={variants?.navigation} />
      <Container maxW={['100%', '75%']} my={4} mr='2rem'>
        <AspectRatio ratio={[1, 17 / 7]}>
          <iframe
            title={video?.title}
            src={`${video?.videoLink}?autoplay=1&enablejsapi=1`}
            allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen;'
          />
        </AspectRatio>
        <Box px={4}>
          <Text mt={2} fontWeight='600' fontSize={['1.2rem']}>
            {video?.title}
          </Text>
          <Flex mt={4} justifyContent='space-between' alignItems='center'>
            <HStack spacing={4}>
              <Avatar name={video?.creator} />
              <Flex direction='column' spacing={0.5}>
                <Text
                  textAlign='left'
                  fontSize='1.1rem'
                  letterSpacing={0.5}
                  fontWeight='500'>
                  {video?.creator}
                </Text>
                <HStack spacing={1}>
                  <Icon boxSize='0.9rem' as={AiFillEye}></Icon>
                  <Text fontSize='0.9rem' fontWeight='400'>
                    {displayViews(video?.views)} views
                  </Text>
                </HStack>
              </Flex>
            </HStack>
            <ButtonGroup size='md' spacing={-2}>
              {!likedVideoId ? (
                <Button
                  bg='transparent'
                  _hover={{ bg: 'transparent', color: 'teal.500' }}
                  onClick={() => handleInsertTable('liked')}
                  leftIcon={<AiOutlineLike fontSize='1rem' />}>
                  Like
                </Button>
              ) : (
                <Button
                  bg='transparent'
                  _hover={{ bg: 'transparent', color: 'teal.500' }}
                  onClick={() => handleDelete(videoId, 'liked')}
                  leftIcon={<AiFillLike fontSize='1rem' />}>
                  Like
                </Button>
              )}

              {!watchLaterVideoId ? (
                <Button
                  bg='transparent'
                  _hover={{ bg: 'transparent', color: 'teal.500' }}
                  onClick={() => handleInsertTable('watchlater')}
                  leftIcon={<MdOutlineWatchLater />}>
                  Watch Later
                </Button>
              ) : (
                <Button
                  bg='transparent'
                  _hover={{ bg: 'transparent', color: 'teal.500' }}
                  onClick={() => handleDelete(videoId, 'watchlater')}
                  leftIcon={<MdWatchLater fontSize='1rem' />}>
                  Watch Later
                </Button>
              )}
              <Button
                bg='transparent'
                _hover={{ bg: 'transparent', color: 'teal.500' }}
                onClick={onOpen}
                leftIcon={<MdPlaylistPlay />}>
                Add to playlist
              </Button>
            </ButtonGroup>
            <PlaylistModal isOpen={isOpen} onClose={onClose} video_id={videoId} />
          </Flex>
          <Text fontSize='0.9rem' mt={4} lineHeight='150%'>
            {video?.description}
          </Text>
        </Box>
      </Container>
    </Flex>
  );
}

export default Video;
