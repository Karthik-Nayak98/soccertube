import { ListIcon, ListItem } from '@chakra-ui/react';
import { PropTypes } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function MenuItem({ url, title, icon }) {
  return (
    <Link _active={{ bg: 'gray.200' }} to={url}>
      <ListItem _hover={{ bg: 'gray.100' }} py={1}>
        <ListIcon as={icon} />
        {title}
      </ListItem>
    </Link>
  );
}

MenuItem.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default MenuItem;
