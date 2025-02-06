import React from 'react';
import { Box, Container, Flex, Link, VStack } from '@chakra-ui/react';
import ListCompany from './ListCompany';
import AddCompanyPage from './AddCompanyPage';

export default function App() {
  return (
    <Box minH="100vh" bg="gray.50">
      <Box as="nav" bg="white" boxShadow="sm" mb={8}>
        <Container maxW="7xl">
          <Flex h="16" alignItems="center">
            <Flex>
              <Link href="/" px={4} color="gray.900" _hover={{ color: 'gray.600' }}>
                Add Company
              </Link>
              <Link href="/list" px={4} color="gray.900" _hover={{ color: 'gray.600' }}>
                List Companies
              </Link>
            </Flex>
          </Flex>
        </Container>
      </Box>
      
      <Container maxW="7xl">
        <VStack spacing={8} align="stretch">
          {window.location.pathname === '/list' ? <ListCompany /> : <AddCompanyPage />}
        </VStack>
      </Container>
    </Box>
  );
}