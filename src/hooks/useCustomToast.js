import { useToast } from '@chakra-ui/react';

function useCustomToast() {
  const customToast = useToast();
  const toast = (title, status) => {
    customToast({
      title: title,
      status: status,
      position: 'top-right',
      duration: 3000,
      isClosable: true,
    });
  };

  return toast;
}

export default useCustomToast;
