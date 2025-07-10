import React, { useState } from 'react'
import { 
  Box, 
  Button, 
  Card, 
  CardBody, 
  Text, 
  Heading, 
  VStack, 
  HStack, 
  Badge, 
  IconButton, 
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  useToast
} from '@chakra-ui/react'
import { useHabits } from './HabitContext'
import { Plus, Edit, Trash2, CheckCircle } from 'lucide-react'

const HabitsPage = () => {
  const { habits, addHabit, updateHabit, deleteHabit, completeHabit } = useHabits()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [editingHabit, setEditingHabit] = useState(null)
  const [formData, setFormData] = useState({ name: '', description: '', frequency: 'daily' })
  const toast = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      if (editingHabit) {
        await updateHabit(editingHabit.id, formData)
        toast({
          title: 'Habit updated',
          status: 'success',
          duration: 3000,
        })
      } else {
        await addHabit(formData)
        toast({
          title: 'Habit created',
          status: 'success',
          duration: 3000,
        })
      }
      
      setFormData({ name: '', description: '', frequency: 'daily' })
      setEditingHabit(null)
      onClose()
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
      })
    }
  }

  const handleEdit = (habit) => {
    setEditingHabit(habit)
    setFormData({
      name: habit.name,
      description: habit.description,
      frequency: habit.frequency || 'daily'
    })
    onOpen()
  }

  const handleDelete = async (habitId) => {
    try {
      await deleteHabit(habitId)
      toast({
        title: 'Habit deleted',
        status: 'success',
        duration: 3000,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
      })
    }
  }

  const handleComplete = async (habitId) => {
    try {
      await completeHabit(habitId)
      toast({
        title: 'Habit completed!',
        status: 'success',
        duration: 3000,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
      })
    }
  }

  const isCompletedToday = (habit) => {
    if (!habit.lastCompleted) return false
    const lastCompleted = new Date(habit.lastCompleted.seconds * 1000)
    const today = new Date()
    return lastCompleted.toDateString() === today.toDateString()
  }

  return (
    <Box>
      <HStack justify="space-between" mb={6}>
        <Heading>My Habits</Heading>
        <Button leftIcon={<Plus />} colorScheme="blue" onClick={onOpen}>
          Add Habit
        </Button>
      </HStack>

      <VStack spacing={4} align="stretch">
        {habits.length === 0 ? (
          <Card>
            <CardBody textAlign="center" py={8}>
              <Text color="gray.500">No habits yet. Create your first habit to get started!</Text>
            </CardBody>
          </Card>
        ) : (
          habits.map((habit) => (
            <Card key={habit.id}>
              <CardBody>
                <HStack justify="space-between" align="start">
                  <VStack align="start" spacing={2} flex={1}>
                    <HStack spacing={3}>
                      <Text fontSize="lg" fontWeight="medium">
                        {habit.name}
                      </Text>
                      <Badge colorScheme="blue">{habit.streak || 0} day streak</Badge>
                      {isCompletedToday(habit) && (
                        <Badge colorScheme="green">Completed Today</Badge>
                      )}
                    </HStack>
                    <Text color="gray.600">{habit.description}</Text>
                    <Text fontSize="sm" color="gray.500">
                      Frequency: {habit.frequency || 'daily'}
                    </Text>
                  </VStack>
                  
                  <HStack spacing={2}>
                    <IconButton
                      icon={<CheckCircle />}
                      colorScheme="green"
                      variant="ghost"
                      onClick={() => handleComplete(habit.id)}
                      isDisabled={isCompletedToday(habit)}
                      aria-label="Complete habit"
                    />
                    <IconButton
                      icon={<Edit />}
                      colorScheme="blue"
                      variant="ghost"
                      onClick={() => handleEdit(habit)}
                      aria-label="Edit habit"
                    />
                    <IconButton
                      icon={<Trash2 />}
                      colorScheme="red"
                      variant="ghost"
                      onClick={() => handleDelete(habit.id)}
                      aria-label="Delete habit"
                    />
                  </HStack>
                </HStack>
              </CardBody>
            </Card>
          ))
        )}
      </VStack>

      {/* Add/Edit Habit Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>
              {editingHabit ? 'Edit Habit' : 'Add New Habit'}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Habit Name</FormLabel>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Exercise, Read, Meditate"
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your habit..."
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel>Frequency</FormLabel>
                  <Select
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                    placeholder="Select frequency"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </Select>
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" type="submit">
                {editingHabit ? 'Update' : 'Create'}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default HabitsPage 