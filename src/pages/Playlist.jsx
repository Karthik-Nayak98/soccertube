import { Button, SimpleGrid, Text, useDisclosure } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';
import { PlaylistCard, PlaylistModal } from '../components';
import { withVideos } from '../hoc';

function Playlist({ supabaseData, handleDelete }) {
  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <>
      <PlaylistModal isOpen={isOpen} onClose={onClose} />
      <Button mt='4' bg='blue.300' cursor='pointer' onClick={onOpen}>
        <Text>Create Playlist</Text>
      </Button>
      <SimpleGrid columns={[1, 2, 3]} spacing='1.5rem' mt={4}>
        {supabaseData?.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            {...playlist}
            handleDelete={handleDelete}
          />
        ))}
      </SimpleGrid>
    </>
  );
}

const configuration = {
  message: 'You do not have any Playlists.',
  table: 'playlist',
  field: 'id',
};
const PlaylistHOC = withVideos(configuration)(Playlist);

Playlist.propTypes = {
  supabaseData: PropTypes.array,
  handleDelete: PropTypes.func,
};
export default PlaylistHOC;
