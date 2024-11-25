import { Box, HStack, IconButton, Image, Heading, useColorModeValue, Text, useToast, Modal, 
    ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, useDisclosure,  
    ModalBody, VStack, Input, Button,
    ModalFooter} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useUserStore } from '../store/user';
import { useState } from 'react';

const UserCard = ({ user }) => {
    const [updatedUser, setUpdatedUser] = useState(user);
    const textColor = useColorModeValue('gray.600', 'gray.200');
    const bg = useColorModeValue('white', 'gray.800');

    const { deleteUser, updateUser } = useUserStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDeleteUser = async (id) => {
        const { success, message } = await deleteUser(id);
        toast({
        title: success ? "Success" : "Error",
        description: message,
        status: success ? "success" : "error",
        duration: 5000,
        isClosable: true,
        });
    };

    const handleUpdateUser = async (id, updatedUser) => {
        const { success, message } = await updateUser(id, updatedUser);
        if (!success) {
        toast({
            title: "Error",
            description: message,
            status: "error",
            duration: 5000,
            isClosable: true,
        });
        } else {
        toast({
            title: "Success",
            description: message,
            status: "success",
            duration: 5000,
            isClosable: true,
        });
        onClose();
        }
    }

    return (
    <Box
      shadow='lg'
      rounded='lg'
      overflow='hidden'
      transition='all 0.3s'
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image src={user.profilePicture} alt={user.name} h={48} w='full' objectFit='cover' />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {user.name + " - " + user.jobTitle} 
        </Heading>
        <Text fontSize='md' color={textColor}>
          {user.email}
        </Text>
        <Text fontSize='md' color={textColor}>
          {user.phoneNumber}
        </Text>

        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
          <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteUser(user.id)} colorScheme='red' />
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
                <Input 
                    placeholder="Name" 
                    name="name"
                    value={updatedUser.name}
                    onChange={(e) => setUpdatedUser({...updatedUser, name: e.target.value})}
                />
                <Input 
                    placeholder="Email" 
                    name="email"
                    value={updatedUser.email}
                    onChange={(e) => setUpdatedUser({...updatedUser, email: e.target.value})}
                />
                <Input 
                    placeholder="Phone Number" 
                    name="phoneNumber"
                    value={updatedUser.phoneNumber}
                    onChange={(e) => setUpdatedUser({...updatedUser, phoneNumber: e.target.value})}
                />
                <Input 
                    placeholder="Job Title" 
                    name="jobTitle"
                    value={updatedUser.jobTitle}
                    onChange={(e) => setUpdatedUser({...updatedUser, jobTitle: e.target.value})}
                />
                <Input 
                    placeholder="Profile Picture URL" 
                    name="profilePicture"
                    value={updatedUser.profilePicture}
                    onChange={(e) => setUpdatedUser({...updatedUser, profilePicture: e.target.value})}
                />
                
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={()=>handleUpdateUser(user.id,updatedUser)} >
                Update
            </Button>
            <Button variant="ghost" onClick={onClose} >
                Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default UserCard;