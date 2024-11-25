import { Container, VStack, Text, SimpleGrid, Input } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useUserStore } from '../store/user';
import { useEffect, useState } from 'react';
import UserCard from '../components/UserCard';

const HomePage = () => {
  const { fetchUsers, users } = useUserStore();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Users 🙍
        </Text>

        <Input
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          mb={4}
        />

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w={"full"}>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))
          ) : (
            <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
              No User found 😢{" "}
              <Link to={"/create"}>
                <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
                  Create one
                </Text>
              </Link>
            </Text>
          )}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default HomePage;