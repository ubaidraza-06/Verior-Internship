import React, { useState, useEffect } from 'react'
import { Box, Grid, GridItem, Card, CardBody, Text, Heading, Badge, VStack, HStack, Icon, useToast } from '@chakra-ui/react'
import { useHabits } from './HabitContext'
import { CheckCircle, Clock, TrendingUp, Quote } from 'lucide-react'

const Dashboard = () => {
  const { habits, loading } = useHabits()
  const [quote, setQuote] = useState('')
  const [author, setAuthor] = useState('')
  const toast = useToast()

  // Fetch motivational quote from ZenQuotes API
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch('https://zenquotes.io/api/random')
        const data = await response.json()
        if (data && data[0]) {
          setQuote(data[0].q)
          setAuthor(data[0].a)
        }
      } catch (error) {
        console.error('Error fetching quote:', error)
        // Fallback quote
        setQuote('The only way to do great work is to love what you do.')
        setAuthor('Steve Jobs')
      }
    }

    fetchQuote()
  }, [])

  const todayCompleted = habits.filter(habit => {
    if (!habit.lastCompleted) return false
    const lastCompleted = new Date(habit.lastCompleted.seconds * 1000)
    const today = new Date()
    return lastCompleted.toDateString() === today.toDateString()
  }).length

  const totalStreak = habits.reduce((sum, habit) => sum + (habit.streak || 0), 0)
  const activeHabits = habits.filter(habit => habit.active !== false).length

  if (loading) {
    return (
      <Box textAlign="center" py={8}>
        <Text>Loading...</Text>
      </Box>
    )
  }

  return (
    <Box>
      <Heading mb={6}>Dashboard</Heading>
      
      {/* Motivational Quote */}
      <Card mb={6} bg="blue.50" border="1px" borderColor="blue.200">
        <CardBody>
          <HStack spacing={3}>
            <Icon as={Quote} color="blue.500" boxSize={6} />
            <VStack align="start" spacing={1}>
              <Text fontSize="lg" fontStyle="italic">
                "{quote}"
              </Text>
              <Text fontSize="sm" color="gray.600">
                — {author}
              </Text>
            </VStack>
          </HStack>
        </CardBody>
      </Card>

      {/* Stats Grid */}
      <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={6} mb={8}>
        <GridItem>
          <Card>
            <CardBody>
              <HStack spacing={4}>
                <Icon as={CheckCircle} color="green.500" boxSize={8} />
                <VStack align="start" spacing={1}>
                  <Text fontSize="2xl" fontWeight="bold">
                    {todayCompleted}
                  </Text>
                  <Text color="gray.600">Completed Today</Text>
                </VStack>
              </HStack>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card>
            <CardBody>
              <HStack spacing={4}>
                <Icon as={TrendingUp} color="blue.500" boxSize={8} />
                <VStack align="start" spacing={1}>
                  <Text fontSize="2xl" fontWeight="bold">
                    {totalStreak}
                  </Text>
                  <Text color="gray.600">Total Streak</Text>
                </VStack>
              </HStack>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card>
            <CardBody>
              <HStack spacing={4}>
                <Icon as={Clock} color="purple.500" boxSize={8} />
                <VStack align="start" spacing={1}>
                  <Text fontSize="2xl" fontWeight="bold">
                    {activeHabits}
                  </Text>
                  <Text color="gray.600">Active Habits</Text>
                </VStack>
              </HStack>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>

      {/* Recent Habits */}
      <Card>
        <CardBody>
          <Heading size="md" mb={4}>Recent Habits</Heading>
          {habits.length === 0 ? (
            <Text color="gray.500">No habits yet. Create your first habit to get started!</Text>
          ) : (
            <VStack spacing={3} align="stretch">
              {habits.slice(0, 5).map((habit) => (
                <HStack key={habit.id} justify="space-between" p={3} bg="gray.50" borderRadius="md">
                  <VStack align="start" spacing={1}>
                    <Text fontWeight="medium">{habit.name}</Text>
                    <Text fontSize="sm" color="gray.600">{habit.description}</Text>
                  </VStack>
                  <HStack spacing={2}>
                    <Badge colorScheme="blue">{habit.streak || 0} day streak</Badge>
                    {habit.lastCompleted && (
                      <Badge colorScheme="green">
                        {new Date(habit.lastCompleted.seconds * 1000).toLocaleDateString()}
                      </Badge>
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

export default Dashboard 