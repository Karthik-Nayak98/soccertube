import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';

function ProfileModal() {
  const { isOpen, onClose } = useDisclosure();
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalContent>
        <ModalHeader>Playlists</ModalHeader>
        <ModalBody></ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}

ProfileModal.propTypes = {};

export default ProfileModal;
