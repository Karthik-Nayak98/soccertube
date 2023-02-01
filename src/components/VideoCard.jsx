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
import { AiFillEye } from 'react-icons/ai';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { displayViews, formatDate } from '../utils/helper';

function VideoCard({ creator, _id, title, thumbnail, views, createdAt }) {
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
          <HiOutlineDotsVertical size='1.2rem' />
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
};
export default VideoCard;
