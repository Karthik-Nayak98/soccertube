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
  PlaylistVideos,
  Profile,
  Register,
  Video,
  WatchLater,
} from '../pages';
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Navbar />}>
      <Route index path='/' element={<Home />} />
      <Route path='register' element={<Register />} />
      <Route path='api/video/:videoId' element={<Video />} />
      <Route path='login' element={<Login />} />
      <Route path='explore' element={<Explore />} />

      <Route
        path='profile'
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
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
      <Route path='playlist'>
        <Route
          path=''
          element={
            <ProtectedRoute>
              <Playlist />
            </ProtectedRoute>
          }
        />
        <Route
          path=':playlist'
          element={
            <ProtectedRoute>
              <PlaylistVideos />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path='*' element={<Error />} />
    </Route>
  )
);

export default router;
