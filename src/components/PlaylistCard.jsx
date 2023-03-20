import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { PropTypes } from 'prop-types';

import React from 'react';
import { MdDelete, MdPlaylistPlay } from 'react-icons/md';

function PlaylistCard({ name, count = 0 }) {
  return (
    <Box>
      <Flex rounded='sm' w='300px' h='150px' bg='gray.300'>
        <Box w='65%'>
          <Image
            w='100%'
            h='100%'
            objectFit='cover'
            src='https://i.postimg.cc/vm5FVWp1/download.png'
          />
        </Box>
        <Flex
          flex='1'
          direction='column'
          justifyContent='space-around'
          alignItems='center'
          gap=''>
          <Text fontSize='1.2rem'>{count}</Text>
          <MdPlaylistPlay size='3rem' />
          <MdDelete size='1.5rem' />
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
  count: PropTypes.number,
};

export default PlaylistCard;
