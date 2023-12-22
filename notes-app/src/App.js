import React from 'react';
import { ChakraProvider, CSSReset, Box, Container, VStack, Text } from '@chakra-ui/react';
import './App.css'; 
import TaskForm from './component/TaskForm';


const App = () => {
  return (
    <ChakraProvider>
      <CSSReset />
      <Box
        bgGradient="linear(to-r, purple.500, yellow.500)"
        minH="100%"
        position="relative"
        overflow="hidden"
        textAlign="center"
        >
        <VStack
        spacing={8} align="center"
        >
        <Text
          color="white"
          fontSize="5xl"
          fontWeight="bold"
         _hover={{ transform: 'scale(1.1)' }}
          cursor="pointer"
          transition="transform 0.3s ease" 
          mt={8}
        >
          To-Do App
        </Text>
        <Container maxW={'x'}>
        <TaskForm />
        </Container>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default App;
