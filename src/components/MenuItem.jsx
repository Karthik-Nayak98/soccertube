import { ListIcon, ListItem } from '@chakra-ui/react';
import { PropTypes } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function MenuItem({ url, title, icon, route }) {
  return (
    <Link _active={{ bg: 'gray.200' }} to={url} state={{ route: route }}>
      <ListItem _hover={{ bg: 'gray.100' }} py={1} px={2}>
        <ListIcon as={icon} />
        {title}
      </ListItem>
    </Link>
  );
}

MenuItem.propTypes = {
  url: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
};

export default MenuItem;
