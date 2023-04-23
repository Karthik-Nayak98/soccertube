import { List } from '@chakra-ui/react';
import React from 'react';
import { MenuItem } from '../components';

import { menuItems } from '../backend/db/menuItems';

function Menu() {
  return (
    <List marginTop={5} style={{ position: 'fixed', top: '3.1rem' }} fontSize={18}>
      {menuItems.map((item) => (
        <MenuItem key={item._id} {...item} />
      ))}
    </List>
  );
}

export default Menu;
