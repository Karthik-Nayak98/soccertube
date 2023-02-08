import { AiOutlineHome, AiOutlineLike } from 'react-icons/ai';
import {
  MdOutlineExplore,
  MdOutlineWatchLater,
  MdPlaylistPlay,
} from 'react-icons/md';
import { v4 as uuid } from 'uuid';

export const menuItems = [
  {
    _id: uuid(),
    url: '/',
    title: 'Home',
    route: '',
    icon: AiOutlineHome,
  },

  {
    _id: uuid(),
    url: '/explore',
    title: 'Explore',
    route: 'All',
    icon: MdOutlineExplore,
  },
  {
    _id: uuid(),
    url: '/playlist',
    title: 'Playlists',
    route: '',
    icon: MdPlaylistPlay,
  },
  {
    _id: uuid(),
    url: '/watchlater',
    title: 'Watch Later',
    route: '',
    icon: MdOutlineWatchLater,
  },
  {
    _id: uuid(),
    url: '/liked',
    title: 'Liked Videos',
    route: '',
    icon: AiOutlineLike,
  },
];
