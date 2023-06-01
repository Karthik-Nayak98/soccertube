import { SimpleGrid } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';
import { VideoCard } from '../components';
import { withVideos } from '../hoc';

function Liked({ videos, handleDelete }) {
  return (
    <SimpleGrid columns={[1, 2, 3]} spacing='1.5rem' mt={4}>
      {videos?.map((video) => (
        <VideoCard
          key={video._id}
          {...video}
          isLiked={true}
          handleDeleteLiked={handleDelete}
        />
      ))}
    </SimpleGrid>
  );
}

const configuration = {
  message: 'You do not have any videos in liked',
  table: 'liked',
  field: 'video_id',
};

const LikedHOC = withVideos(configuration)(Liked);

Liked.propTypes = {
  videos: PropTypes.array,
  handleDelete: PropTypes.func,
};
export default LikedHOC;
