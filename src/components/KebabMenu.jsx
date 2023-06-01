import { Box, HStack, Text, useDisclosure, useOutsideClick } from '@chakra-ui/react';
import { PropTypes } from 'prop-types';
import React, { useRef } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import {
  MdDeleteForever,
  MdOutlineWatchLater,
  MdPlaylistPlay,
} from 'react-icons/md';
import { useAuth } from '../context/AuthContext';
import useCustomToast from '../hooks/useCustomToast';
import supabase from '../supabase/client';
import PlaylistModal from './PlaylistModal';

function KebabMenu(props) {
  const toast = useCustomToast();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { user } = useAuth();
  const { showBoundary } = useErrorBoundary();

  const ref = useRef();
  useOutsideClick({ ref: ref, handler: () => props.showKebabMenu(false) });
  const handleInsertTable = async (id, table = 'watchlater') => {
    const { data, error } = await supabase
      .from(table)
      .select()
      .eq('user_id', user.id)
      .eq('video_id', id);

    if (error) {
      showBoundary(error);
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
        <HStack
          cursor='pointer'
          _hover={{
            background: 'white',
            color: 'red.400',
          }}
          onClick={() => props.onDelete(props.video_id)}>
          <MdDeleteForever />
          <Text>Remove from Watch later</Text>
        </HStack>
      ) : (
        <HStack cursor='pointer' onClick={() => handleInsertTable(props.video_id)}>
          <MdPlaylistPlay />
          <Text>Save to Watch later</Text>
        </HStack>
      )}
      {props.inPlaylist ? (
        <HStack
          cursor='pointer'
          _hover={{
            background: 'white',
            color: 'red.400',
          }}
          onClick={() => props.onDelete(props.playlist_id, props.video_id)}>
          <MdDeleteForever />
          <Text>Remove from Playlist</Text>
        </HStack>
      ) : (
        <HStack cursor='pointer' onClick={onOpen}>
          <PlaylistModal
            ref={ref}
            isOpen={isOpen}
            onClose={onClose}
            video_id={props.video_id}
          />
          <MdOutlineWatchLater />
          <Text>Save to playlist</Text>
        </HStack>
      )}
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

export default KebabMenu;
KebabMenu.propTypes = {
  isLiked: PropTypes.bool,
  isWatchLater: PropTypes.bool,
  inPlaylist: PropTypes.bool,
  playlist_id: PropTypes.number,
  video_id: PropTypes.string.isRequired,
  showKebabMenu: PropTypes.func.isRequired,
  handleDeleteLiked: PropTypes.func,
  onDelete: PropTypes.func,
};
