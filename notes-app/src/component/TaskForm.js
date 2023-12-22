import { Box , Text , Stack , Input, Button} from '@chakra-ui/react'
import { useState , React } from 'react'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
const TaskForm = () => {
    const [title , setTitle] = useState('')
    const [description , setDescription] = useState('')

    const handleAddTask = (e) => {
        console.log(title , description);
    }
  return (
    <Box
    padding={['4' , '8']}
    spacing={['2' , '8']}
    bg="purple.700"
    p="8"
    borderRadius="md"
    width={{ base: '00%', md: '70%', lg: '50%' }}
    mx="auto" 
    my="4"   
    boxShadow="lg"
    >
     <Text fontSize="xl" mb="4" color="yellow.300" textAlign="center">
        Add Task
      </Text>
      <Stack spacing='8'>
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
      colorScheme='teal'
      onClick={handleAddTask}
      leftIcon={<FaPlus />}
      mt={10}
      w={"100%"}
      >
        Add
      </Button>

    </Box>
  )
}

export default TaskForm