import PropTypes from 'prop-types';
import React from 'react';
import { VideoCard } from '../components';
import { withVideos } from '../hoc';

function Liked({ videos, handleDelete }) {
  return (
    <>
      {videos?.map((video) => (
        <VideoCard
          key={video._id}
          {...video}
          isLiked={true}
          handleDeleteLiked={handleDelete}
        />
      ))}
    </>
  );
}

const configuration = {
  message: 'You do not have any videos in liked',
  table: 'liked',
};

const LikedHOC = withVideos(configuration)(Liked);

Liked.propTypes = {
  videos: PropTypes.array,
  handleDelete: PropTypes.func,
};
export default LikedHOC;
