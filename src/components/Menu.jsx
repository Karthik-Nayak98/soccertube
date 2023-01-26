import { List } from '@chakra-ui/react';
import React from 'react';
import { MenuItem } from '../components';

import { menuItems } from '../backend/db/menuItems';

function Menu() {
  return (
    <List fontSize={18}>
      {menuItems.map((item) => (
        <MenuItem
          key={item._id}
          url={item.url}
          title={item.title}
          icon={item.icon}
        />
      ))}
    </List>
  );
}

export default Menu;
