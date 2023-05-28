import {
  AspectRatio,
  Avatar,
  Card,
  CardBody,
  Flex,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { AiFillEye } from 'react-icons/ai';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { displayViews, formatDate } from '../utils/helper';
import KebabMenu from './KebabMenu';

function VideoCard({
  creator,
  _id,
  title,
  thumbnail,
  views,
  createdAt,
  handleDeleteLiked,
  onDelete,
  playlist_id,
  isLiked = false,
  isWatchLater = false,
  inPlaylist = false,
}) {
  const [showKebabMenu, setShowKebabMenu] = useState(false);

  return (
    <Card variant='outline'>
      <CardBody p={2}>
        <Link to={`/api/video/${_id}`}>
          <AspectRatio maxW='300px' ratio={4 / 2}>
            <Image borderRadius='lg' objectFit='cover' src={thumbnail} alt={title} />
          </AspectRatio>
        </Link>
        <Flex px={2} mt={2} justifyContent='space-between' alignItems='center'>
          <HStack>
            <Avatar size='xs' name={title} />
            <Text
              color='gray.700'
              maxW={250}
              fontSize={['0.8rem']}
              fontWeight={500}
              noOfLines={2}>
              {title}
            </Text>
          </HStack>
          {showKebabMenu ? (
            <KebabMenu
              isLiked={isLiked}
              isWatchLater={isWatchLater}
              inPlaylist={inPlaylist}
              playlist_id={playlist_id}
              video_id={_id}
              showKebabMenu={setShowKebabMenu}
              handleDeleteLiked={handleDeleteLiked}
              onDelete={onDelete}
            />
          ) : null}
          <HiOutlineDotsVertical
            size='1.2rem'
            cursor='pointer'
            onClick={() => setShowKebabMenu(true)}
          />
        </Flex>
        <Stack color='gray.600' fontSize='small' mt={2} spacing={0} px={2}>
          <Text fontWeight={400}>{creator}</Text>
          <Flex alignItems='center' gap={2}>
            <HStack spacing={1}>
              <Icon as={AiFillEye}></Icon>
              <Text>{displayViews(views)} views</Text>
            </HStack>
            <Text fontSize='1rem'>·</Text>
            <Text>{formatDate(createdAt)}</Text>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
}

VideoCard.propTypes = {
  title: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  creator: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  views: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  playlist_id: PropTypes.number,
  onDelete: PropTypes.func,
  handleDeleteLiked: PropTypes.func,
  isLiked: PropTypes.bool,
  isWatchLater: PropTypes.bool,
  inPlaylist: PropTypes.bool,
};
export default VideoCard;
