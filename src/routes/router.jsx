import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import { Navbar } from '../layouts';
import {
  Error,
  Explore,
  Home,
  Liked,
  Login,
  Playlist,
  Register,
  Video,
  WatchLater,
} from '../pages';
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Navbar />}>
      <Route path='/' element={<Home />} />
      <Route path='register' element={<Register />} />
      <Route path='api/video/:videoId' element={<Video />} />
      <Route path='login' element={<Login />} />
      <Route path='explore' element={<Explore />} />
      <Route
        path='liked'
        element={
          <ProtectedRoute>
            <Liked />
          </ProtectedRoute>
        }
      />
      <Route
        path='watchlater'
        element={
          <ProtectedRoute>
            <WatchLater />
          </ProtectedRoute>
        }
      />
      <Route
        path='playlist'
        element={
          <ProtectedRoute>
            <Playlist />
          </ProtectedRoute>
        }
      />
      <Route path='*' element={<Error />} />
    </Route>
  )
);

export default router;
