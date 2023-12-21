import React from 'react';
import { ChakraProvider, CSSReset, Box, Container, VStack, Text } from '@chakra-ui/react';
import './App.css'; // Import external CSS


const App = () => {
  return (
    <ChakraProvider>
      <CSSReset />
    </ChakraProvider>
  );
};

export default App;
