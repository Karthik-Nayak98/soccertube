/* eslint-disable indent */
import {
  Button,
  Center,
  Container,
  Flex,
  SimpleGrid,
  Spinner,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { VideoCard } from '../components';
import { useAuth } from '../context/AuthContext';
import { SideBar } from '../layouts';
import supabase from '../supabase/client';

const smVariant = { navigation: 'drawer' };
const mdVariant = { navigation: 'sidebar' };

function Liked() {
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [supabaseData, setSupabaseData] = useState(null);
  const [likedVideos, setLikedVideos] = useState(null);
  const { user } = useAuth();

  const handleDeleteLiked = async (id) => {
    try {
      setLoading(true);
      await supabase.from('liked').delete().eq('video_id', id);
      setLikedVideos((prevLiked) => prevLiked.filter(({ _id }) => id != _id));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    async function getLikedData() {
      setLoading(true);
      const { data, error } = await supabase
        .from('liked')
        .select()
        .eq('user_id', user?.id)
        .order('id', { ascending: false });

      if (error) {
        switch (error.code) {
          case '42P01':
            setFetchError('Table "liked" does not exist in database.');
            break;
          default:
            console.log(error.code);
            setFetchError('Unable to fetch the data from the database');
            break;
        }
        setSupabaseData(null);
      }
      if (data) {
        console.log(data);
        setSupabaseData(data);
        setFetchError(null);
      }
      setLoading(false);
    }
    getLikedData();
  }, []);

  useEffect(() => {
    axios.get('/api/videos').then((response) =>
      setLikedVideos(
        supabaseData?.map(({ video_id }) =>
          response.data.videos.find((video) => {
            if (video_id === video._id) return video;
          })
        )
      )
    );
  }, [supabaseData]);

  return (
    <Flex>
      <SideBar variant={variants?.navigation} />
      <Container maxW='5xl' mr='2rem'>
        {loading ? (
          <Center h='90vh'>
            <Spinner thickness='4px' speed='0.65s' color='blue.500' size='xl' />
          </Center>
        ) : (
          <>
            {fetchError && <Text>{fetchError}</Text>}
            {likedVideos?.length ? (
              <SimpleGrid columns={[1, 2, 3]} spacing='1.5rem' mt={4}>
                {likedVideos?.map((video) => (
                  <VideoCard
                    key={video._id}
                    {...video}
                    isLiked={true}
                    handleDeleteLiked={handleDeleteLiked}
                  />
                ))}
              </SimpleGrid>
            ) : (
              <Center h='50vh'>
                <VStack>
                  <Text as='p'>You do not have any videos in liked.</Text>
                  <Link p={2} to='/explore' state={{ route: 'All' }}>
                    <Button mt={4} size={['md']} colorScheme='blue'>
                      Go Back
                    </Button>
                  </Link>
                </VStack>
              </Center>
            )}
          </>
        )}
      </Container>
    </Flex>
  );
}

export default Liked;
