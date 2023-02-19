import { Box, HStack, Text } from '@chakra-ui/react';
import { PropTypes } from 'prop-types';
import React, { forwardRef } from 'react';
import {
  MdDeleteForever,
  MdOutlineWatchLater,
  MdPlaylistPlay,
} from 'react-icons/md';
import { useAuth } from '../context/AuthContext';
import useCustomToast from '../hooks/useCustomToast';
import supabase from '../supabase/client';

function KebabMenu(props, ref) {
  const toast = useCustomToast();
  const { user } = useAuth();

  const handlePlaylist = () => {};

  const handleInsertTable = async (id, table = 'watchlater') => {
    const { data, error } = await supabase
      .from(table)
      .select()
      .eq('user_id', user.id)
      .eq('video_id', id);

    if (error) {
      console.log(error);
    }

    const insertData = data.length
      ? { id: data[0]?.id, user_id: user.id, video_id: id }
      : { user_id: user.id, video_id: id };

    const { err } = await supabase
      .from(table)
      .upsert(insertData, { ignoreDuplicates: true });
    toast(`Video added to ${table}`, 'success');

    if (err) {
      toast(error, 'error');
    }
  };

  return (
    <Box
      ref={ref}
      position='absolute'
      right='30px'
      bottom='80px'
      fontSize='0.85rem'
      px='2'
      py='1'
      borderRadius='4px'
      shadow='lg'
      bg='white'>
      {props.isWatchLater ? (
        <HStack cursor='pointer' onClick={() => props.onDelete(props.video_id)}>
          <MdDeleteForever />
          <Text>Remove from Watch later</Text>
        </HStack>
      ) : (
        <HStack cursor='pointer' onClick={() => handleInsertTable(props.video_id)}>
          <MdPlaylistPlay />
          <Text>Save to Watch later</Text>
        </HStack>
      )}
      <HStack cursor='pointer' onClick={handlePlaylist}>
        <MdOutlineWatchLater />
        <Text>Save to playlist</Text>
      </HStack>
      {props.isLiked ? (
        <HStack
          cursor='pointer'
          _hover={{
            background: 'white',
            color: 'red.400',
          }}
          onClick={() => props.handleDeleteLiked(props.video_id)}>
          <MdDeleteForever />
          <Text>Remove from Liked</Text>
        </HStack>
      ) : null}
    </Box>
  );
}

const ForwardKebabMenu = forwardRef(KebabMenu);

KebabMenu.propTypes = {
  isLiked: PropTypes.bool,
  isWatchLater: PropTypes.bool,
  video_id: PropTypes.string.isRequired,
  handleDeleteLiked: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ForwardKebabMenu;
