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
import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import EditForm from "./EditForm";
import axios from "axios";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [task, setTasks] = useState([]);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  const handleAddTask = async () => {
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
      console.log("Error adding tasks", error);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tasks");
        setTasks(response.data);
      } catch (error) {
        console.log("Error fetching tasks", error);
      }
    };

    fetchTasks();
  }, []);

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${taskId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Task Deleted");
      }
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.log("Error while deleting", error);
    }
  };

  const handleEditTask = (taskId) => {
    setEditTaskId(taskId);
    setIsEditFormOpen(true);
  };

  const handleSubmitEditForm = async (editedTitle, editedDescription) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/tasks/${editTaskId}`,
        {
          title: editedTitle,
          description: editedDescription,
        }
      );

      const updatedTasks = task.map((task) =>
        task._id === editTaskId ? response.data : task
      );
      setTasks(updatedTasks);
      console.log("Task Updated", response.data);
    } catch (error) {
      console.log("Error updating task", error);
    }
  };

  return (
    <Box
      p={["4", "8"]}
      bg="purple.700"
      borderRadius="md"
      width="70%"
      mx="auto"
      my="4"
      boxShadow="lg"
    >
      <Text fontSize="xl" mb="4" color="yellow.300" textAlign="center">
        Add Task
      </Text>
      <Stack spacing={["4", "8"]}>
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
          height={["50px", "75px"]}
        />
      </Stack>
      <Button
        colorScheme="teal"
        onClick={handleAddTask}
        leftIcon={<FaPlus />}
        mt={["6", "10"]}
        w="100%"
        mb={["4", "4"]}
      >
        Add
      </Button>
      <VStack
        direction={["column", "row"]}
        align="start"
        wrap="wrap"
        spacing={4}
        px={2}
        width="120%"
      >
        {task.map((task, index) => (
          <Box
            key={index}
            borderWidth="0.5px"
            borderRadius="sm"
            // overflow="hidden"
            p="4"
            width={{ base: "100%", md: "50%", lg: "33%" }}
            height="130px"  
            overflowY="auto" 
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
                  onClick={() => handleEditTask(task._id)}
                />
                <IconButton
                  colorScheme="red"
                  aria-label="Delete"
                  icon={<FaTrash />}
                  size="sm"
                  onClick={() => handleDeleteTask(task._id)}
                />
              </HStack>
            </HStack>
            <Text mt="2">{task.description}</Text>
          </Box>
        ))}
      </VStack>
      {isEditFormOpen && (
        <EditForm
          isOpen={isEditFormOpen}
          onClose={() => setIsEditFormOpen(false)}
          onSubmit={handleSubmitEditForm}
          initialTitle={task.find((task) => task._id === editTaskId)?.title}
          initialDescription={
            task.find((task) => task._id === editTaskId)?.description
          }
        />
      )}
    </Box>
  );
};

export default TaskForm;
