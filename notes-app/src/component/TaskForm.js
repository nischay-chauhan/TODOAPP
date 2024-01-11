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
import { toast } from "react-hot-toast";
import * as api from "../helper/helper"; 

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [task, setTasks] = useState([]);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasks = await api.fetchTasks();
        setTasks(tasks);
      } catch (error) {
        console.error("Error fetching tasks", error);
        toast.error("Error", error);
      }
    };

    fetchData();
  }, []);

  const handleAddTask = async () => {
    try {
      const newTask = await api.addTask(title, description);
      console.log("Task Added", newTask);
      toast.success("Added Successfully");
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error adding tasks", error);
      toast.error("KINDLY ADD THE TITLE");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await api.deleteTask(taskId);
      console.log("Task Deleted");
      toast.success("Deleted Successfully");
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error while deleting", error);
      toast.error("Error", error);
    }
  };

  const handleEditTask = (taskId) => {
    setEditTaskId(taskId);
    setIsEditFormOpen(true);
  };

  const handleSubmitEditForm = async (editedTitle, editedDescription) => {
    try {
      const updatedTask = await api.editTask(
        editTaskId,
        editedTitle,
        editedDescription
      );

      const updatedTasks = task.map((task) =>
        task._id === editTaskId ? updatedTask : task
      );
      setTasks(updatedTasks);
      console.log("Task Updated", updatedTask);
      toast.success("Updated Successfully");
    } catch (error) {
      console.error("Error updating task", error);
      toast.error("Error", error);
    }
  };

  const isHeadingValid = (heading) => {
    return heading.length <= 30;
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
      textAlign="center"
    >
     
      <Text fontSize="xl" mb="4" color="yellow.300" textAlign="center">
        Add Task
      </Text>
      <Stack spacing={["4", "8"]}>
        <Input
          placeholder="Task Title"
          color={"white"}
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
          color={"white"}
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
            borderRadius="25px"
            p="4"
            width="70%"
            height="130px"
            overflowY="auto"
          >
            <HStack justify="space-between">
              <Heading size="md">
                {isHeadingValid(task.title) ? task.title : "Invalid Heading"}
              </Heading>
              <Spacer />
              <HStack spacing={["2", "4"]}>
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
