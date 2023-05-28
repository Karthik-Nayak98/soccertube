import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Input,
  List,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/react';
import { PropTypes } from 'prop-types';
import React, { forwardRef, useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useAuth } from '../context/AuthContext';
import supabase from '../supabase/client';
import SpinnerContainer from './SpinnerContainer';

function PlaylistModal(props, ref) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [playlistName, setPlaylistName] = useState('');
  const [playlistVideos, setPlaylistVideos] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  async function getPlaylists() {
    setError('');
    const { data, error } = await supabase
      .from('playlist')
      .select()
      .eq('user_id', user?.id);

    error && setError(error);
    data.length && setPlaylists(data);
  }

  async function getPlaylistVideos() {
    setError('');
    const { data, error } = await supabase.from('playlist_videos').select();
    if (error) {
      setError(error);
      setPlaylistVideos([]);
    }
    if (data) {
      setPlaylistVideos(data);
      setError('');
    }
  }

  useEffect(() => {
    getPlaylists();
    getPlaylistVideos();
  }, []);

  async function handleCreatePlaylist(event) {
    event.preventDefault();
    setError('');
    const { error } = await supabase
      .from('playlist')
      .insert({ user_id: user.id, name: playlistName });

    error && setError(error);
    getPlaylists();
    setPlaylistName('');
  }

  const handleDeletePlaylistVideo = async (id) => {
    setLoading(true);
    try {
      await supabase
        .from('playlist_videos')
        .delete()
        .eq('playlist_id', id, 'video_id', props.video_id);
    } catch (error) {
      setError(error);
    } finally {
      getPlaylistVideos();
      setLoading(false);
    }
  };

  const handleInsertPlaylistVideo = async (id) => {
    setLoading(true);
    try {
      await supabase
        .from('playlist_videos')
        .insert({ playlist_id: id, video_id: props.video_id });
    } catch (error) {
      error && setError(error);
    } finally {
      getPlaylistVideos();
      setLoading(false);
    }
  };

  if (loading) <SpinnerContainer />;

  if (error) <Box>{error.message}</Box>;

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalContent ref={ref}>
        <ModalHeader>Playlists</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {playlists?.map((playlist) => {
            return (
              <List key={playlist.id}>
                <Checkbox
                  isChecked={playlistVideos.some(
                    (item) =>
                      playlist.id === item.playlist_id &&
                      props.video_id === item.video_id
                  )}
                  onChange={() => {
                    playlistVideos.some(
                      (item) =>
                        playlist.id === item.playlist_id &&
                        props.video_id === item.video_id
                    )
                      ? handleDeletePlaylistVideo(playlist.id)
                      : handleInsertPlaylistVideo(playlist.id);
                  }}>
                  {playlist.name}
                </Checkbox>
              </List>
            );
          })}
          {open && (
            <form onSubmit={handleCreatePlaylist}>
              <FormControl mt={4}>
                <Input
                  type='text'
                  placeholder='Enter the playlist name'
                  required={true}
                  onChange={(event) => {
                    setPlaylistName(event.target.value);
                  }}
                  value={playlistName}
                />
              </FormControl>
              <Button mt={2} w='full' type='submit'>
                Create Playlist
              </Button>
            </form>
          )}
        </ModalBody>
        <ModalFooter>
          {!open && (
            <Button
              size='sm'
              leftIcon={<AiOutlinePlus />}
              onClick={() => setOpen(!open)}>
              Create Playlist
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

const ForwardPlaylistModal = forwardRef(PlaylistModal);

PlaylistModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  video_id: PropTypes.string,
};
export default ForwardPlaylistModal;
