import { SimpleGrid } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';
import { VideoCard } from '../components';
import { withVideos } from '../hoc';

function WatchLater({ videos, handleDelete }) {
  return (
    <SimpleGrid columns={[1, 2, 3]} spacing='1.5rem' mt={4}>
      {videos?.map((video) => (
        <VideoCard
          key={video._id}
          {...video}
          isWatchLater={true}
          onDelete={handleDelete}
        />
      ))}
    </SimpleGrid>
  );
}

const configuration = {
  message: 'You do not have any videos in watch later',
  table: 'watchlater',
  field: 'video_id',
};

const WatchLaterHOC = withVideos(configuration)(WatchLater);

WatchLater.propTypes = {
  videos: PropTypes.array,
  handleDelete: PropTypes.func,
};
export default WatchLaterHOC;
