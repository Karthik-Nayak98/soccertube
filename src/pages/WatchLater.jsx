import PropTypes from 'prop-types';
import React from 'react';
import { VideoCard } from '../components';
import { withVideos } from '../hoc';

function WatchLater({ videos, handleDelete }) {
  return (
    <>
      {videos?.map((video) => (
        <VideoCard
          key={video._id}
          {...video}
          isWatchLater={true}
          onDelete={handleDelete}
        />
      ))}
    </>
  );
}

const configuration = {
  message: 'You do not have any videos in watch later',
  table: 'watchlater',
};

const WatchLaterHOC = withVideos(configuration)(WatchLater);

WatchLater.propTypes = {
  videos: PropTypes.array,
  handleDelete: PropTypes.func,
};
export default WatchLaterHOC;
