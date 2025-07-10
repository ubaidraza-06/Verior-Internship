import React, { useState } from 'react'
import { 
  Box, 
  Heading, 
  Card, 
  CardBody, 
  Text, 
  VStack, 
  HStack, 
  Badge, 
  Grid,
  GridItem,
  Button,
  useToast
} from '@chakra-ui/react'
import { useHabits } from './HabitContext'
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react'

const CalendarPage = () => {
  const { habits, completeHabit } = useHabits()
  const [currentDate, setCurrentDate] = useState(new Date())
  const toast = useToast()

  // Get current month's calendar data
  const getCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())
    
    const days = []
    const current = new Date(startDate)
    
    while (current <= lastDay || current.getDay() !== 0) {
      days.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }
    
    return days
  }

  const calendarDays = getCalendarDays()

  const handleCompleteHabit = async (habitId) => {
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

  const isToday = (date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isCurrentMonth = (date) => {
    return date.getMonth() === currentDate.getMonth()
  }

  const getHabitsForDate = (date) => {
    // In a real app, you'd fetch completion data for specific dates
    // For now, we'll show all habits for today
    if (isToday(date)) {
      return habits
    }
    return []
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    })
  }

  return (
    <Box>
      <HStack justify="space-between" mb={6}>
        <Heading>Calendar View</Heading>
        <HStack spacing={2}>
          <Button
            leftIcon={<ChevronLeft />}
            variant="ghost"
            onClick={() => {
              const newDate = new Date(currentDate)
              newDate.setMonth(newDate.getMonth() - 1)
              setCurrentDate(newDate)
            }}
          >
            Previous
          </Button>
          <Text fontWeight="medium" minW="200px" textAlign="center">
            {formatDate(currentDate)}
          </Text>
          <Button
            rightIcon={<ChevronRight />}
            variant="ghost"
            onClick={() => {
              const newDate = new Date(currentDate)
              newDate.setMonth(newDate.getMonth() + 1)
              setCurrentDate(newDate)
            }}
          >
            Next
          </Button>
        </HStack>
      </HStack>

      {/* Calendar Grid */}
      <Card mb={6}>
        <CardBody>
          <Grid templateColumns="repeat(7, 1fr)" gap={1}>
            {/* Day headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <GridItem key={day} p={2} textAlign="center">
                <Text fontWeight="bold" fontSize="sm" color="gray.600">
                  {day}
                </Text>
              </GridItem>
            ))}
            
            {/* Calendar days */}
            {calendarDays.map((date, index) => {
              const habitsForDate = getHabitsForDate(date)
              const isCurrentMonthDay = isCurrentMonth(date)
              
              return (
                <GridItem 
                  key={index} 
                  p={2} 
                  minH="100px"
                  border="1px"
                  borderColor={isCurrentMonthDay ? "gray.200" : "gray.100"}
                  bg={isCurrentMonthDay ? "white" : "gray.50"}
                >
                  <VStack align="start" spacing={1}>
                    <Text 
                      fontSize="sm" 
                      fontWeight={isToday(date) ? "bold" : "normal"}
                      color={isToday(date) ? "blue.600" : isCurrentMonthDay ? "black" : "gray.400"}
                    >
                      {date.getDate()}
                    </Text>
                    
                    {isCurrentMonthDay && habitsForDate.length > 0 && (
                      <VStack spacing={1} align="start" w="full">
                        {habitsForDate.slice(0, 3).map(habit => (
                          <HStack key={habit.id} spacing={1} w="full">
                            <CheckCircle 
                              size={12} 
                              color={isCompletedToday(habit) ? "#38A169" : "#E2E8F0"}
                            />
                            <Text fontSize="xs" noOfLines={1}>
                              {habit.name}
                            </Text>
                          </HStack>
                        ))}
                        {habitsForDate.length > 3 && (
                          <Text fontSize="xs" color="gray.500">
                            +{habitsForDate.length - 3} more
                          </Text>
                        )}
                      </VStack>
                    )}
                  </VStack>
                </GridItem>
              )
            })}
          </Grid>
        </CardBody>
      </Card>

      {/* Today's Habits */}
      <Card>
        <CardBody>
          <Heading size="md" mb={4}>Today's Habits</Heading>
          {habits.length === 0 ? (
            <Text color="gray.500">No habits yet. Create your first habit to get started!</Text>
          ) : (
            <VStack spacing={3} align="stretch">
              {habits.map((habit) => (
                <HStack key={habit.id} justify="space-between" p={3} bg="gray.50" borderRadius="md">
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="medium">{habit.name}</Text>
                    <Text fontSize="sm" color="gray.600">{habit.description}</Text>
                  </VStack>
                  <HStack spacing={2}>
                    <Badge colorScheme="blue">{habit.streak || 0} day streak</Badge>
                    {isCompletedToday(habit) ? (
                      <Badge colorScheme="green">Completed</Badge>
                    ) : (
                      <Button
                        size="sm"
                        colorScheme="green"
                        leftIcon={<CheckCircle />}
                        onClick={() => handleCompleteHabit(habit.id)}
                      >
                        Complete
                      </Button>
                    )}
                  </HStack>
                </HStack>
              ))}
            </VStack>
          )}
        </CardBody>
      </Card>
    </Box>
  )
}

export default CalendarPage 