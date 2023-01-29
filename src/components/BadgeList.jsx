import { Button, Wrap } from '@chakra-ui/react';
import axios from 'axios';
import { PropTypes } from 'prop-types';
import React, { forwardRef, useEffect, useState } from 'react';

function BadgeList({ filterVideos }, ref) {
  const [categories, setCategories] = useState(['All']);

  useEffect(() => {
    axios.get('/api/categories').then((response) => {
      const tempCategory = response?.data.categories.map(
        (category) => category.title
      );
      setCategories(['All', ...tempCategory]);
    });
  }, []);

  return (
    <Wrap mt={4}>
      {categories?.map((category) => (
        <Button
          _focus={
            ref['current'] === category ? { bg: 'gray.500', color: 'white' } : ''
          }
          bg={ref['current'] === category ? 'gray.500' : 'gray.200'}
          color={ref['current'] === category ? 'white' : ''}
          onClick={() => {
            ref['current'] = category;
            filterVideos(category);
          }}
          key={category}
          href=''>
          {category}
        </Button>
      ))}
    </Wrap>
  );
}

const ForwardBadgeList = forwardRef(BadgeList);

BadgeList.propTypes = {
  filterVideos: PropTypes.func.isRequired,
};

export default ForwardBadgeList;
