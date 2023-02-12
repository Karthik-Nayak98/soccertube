import { Box, HStack, Text } from '@chakra-ui/react';
import React, { forwardRef } from 'react';
import { MdOutlineWatchLater, MdPlaylistPlay } from 'react-icons/md';

function KebabMenu(props, ref) {
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
      <HStack cursor='pointer'>
        <MdPlaylistPlay />
        <Text>Save to Watch later</Text>
      </HStack>

      <HStack cursor='pointer'>
        <MdOutlineWatchLater />
        <Text>Save to playlist</Text>
      </HStack>
    </Box>
  );
}

const ForwardKebabMenu = forwardRef(KebabMenu);

export default ForwardKebabMenu;
