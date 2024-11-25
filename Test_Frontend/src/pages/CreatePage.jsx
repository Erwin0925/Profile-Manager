import { Box, Button, Container, Heading, Input, useColorModeValue, VStack, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useUserStore } from '../store/user';

const CreatePage = () => {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    jobTitle: '',
    profilePicture: '',
  });
  const toast = useToast();

  const { createUser } = useUserStore();

  const handleNewUser = async () => {
    const { success, message } = await createUser(newUser);
    if (!success){
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
    }
  }

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create a new user
        </Heading>
        <Box 
          w={"full"} bg={useColorModeValue("white", "gray.800")}
          p={6} rounded={"lg"} shadow={"lg"}
        > 
          <VStack spacing={4}>
            <Input
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <Input
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <Input
              placeholder="Phone Number"
              value={newUser.phoneNumber}
              onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })}
            />
            <Input
              placeholder="Job Title"
              value={newUser.jobTitle}
              onChange={(e) => setNewUser({ ...newUser, jobTitle: e.target.value })}
            />
            <Input
              placeholder="Profile Picture URL"
              value={newUser.profilePicture}
              onChange={(e) => setNewUser({ ...newUser, profilePicture: e.target.value })}
            />
            <Button onClick={handleNewUser}>Create User</Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default CreatePage;