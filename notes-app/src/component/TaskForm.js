import {
  Box,
  Text,
  Stack,
  Input,
  Button,
  VStack,
  HStack,
  Heading,
  Spacer,
  IconButton,
} from "@chakra-ui/react";
import { useState, React, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [task, setTasks] = useState([]);

  const handleAddTask = async (e) => {
    try {
      const response = await axios.post("http://localhost:5000/api/tasks", {
        title,
        description,
      });

      console.log("Task Added", response.data);
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.log("error addign tasks", error);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tasks");
        setTasks(response.data);
      } catch (error) {
        console.log("Got some error while fetching tasks", error);
      }
    };

    fetchTasks();
  }, []);


  

  return (
    <Box
      padding={["4", "8"]}
      spacing={["2", "8"]}
      bg="purple.700"
      p="8"
      borderRadius="md"
      width={{ base: "00%", md: "70%", lg: "50%" }}
      mx="auto"
      my="4"
      boxShadow="lg"
    >
      <Text fontSize="xl" mb="4" color="yellow.300" textAlign="center">
        Add Task
      </Text>
      <Stack spacing="8">
        <Input
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          size="sm"
          borderBottom="2px"
          borderBottomColor="linear(to-r, purple.500, yellow.500)"
          borderTop="none"
          borderLeft="none"
          borderRight="none"
        />

        <Input
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          size="sm"
          borderBottom="2px"
          borderBottomColor="linear(to-r, purple.500, yellow.500)"
          borderTop="none"
          borderLeft="none"
          borderRight="none"
          height={"75px"}
        />
      </Stack>
      <Button
        colorScheme="teal"
        onClick={handleAddTask}
        leftIcon={<FaPlus />}
        mt={10}
        w={"100%"}
      >
        Add
      </Button>

      <VStack
 direction="row"
 align="start"
 wrap="wrap"
 spacing={4}
 px={2}
 width="100%"
>
 {task.map((task, index) => (
    <Box
      key={index}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="6"
      width={{ base: '100%', md: '50%', lg: '33%' }}
    >
    <HStack justify="space-between">
        <Heading size="md">{task.title}</Heading>
        <Spacer />
        <HStack spacing={2}>
          <IconButton
            colorScheme="teal"
            aria-label="Edit"
            icon={<FaEdit />}
            size="sm"
          />
          <IconButton
            colorScheme="red"
            aria-label="Delete"
            icon={<FaTrash />}
            size="sm"
          />
        </HStack>
      </HStack>
      <Text mt="4">{task.description}</Text>
    </Box>
  ))}
</VStack>
    </Box>
  );
};

export default TaskForm;
