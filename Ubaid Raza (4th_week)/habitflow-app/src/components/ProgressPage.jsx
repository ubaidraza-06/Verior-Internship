import React, { useState, useEffect, useMemo } from 'react'
import { 
  Box, 
  Heading, 
  Card, 
  CardBody, 
  Text, 
  VStack, 
  HStack, 
  Badge, 
  Select,
  Grid,
  GridItem,
  Button
} from '@chakra-ui/react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { useHabits } from './HabitContext'
import { TrendingUp, Calendar, Target, RefreshCw } from 'lucide-react'

const ProgressPage = () => {
  const { habits, loadHabits } = useHabits()
  const [selectedHabit, setSelectedHabit] = useState('all')
  const [timeRange, setTimeRange] = useState('7d')
  const [refreshKey, setRefreshKey] = useState(0)

  // Generate real chart data based on actual habits
  const generateChartData = useMemo(() => {
    const data = []
    const today = new Date()
    
    // Generate data for the last 30 days
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      
      // Calculate real completion data for this date
      let completedCount = 0
      let totalStreak = 0
      
      habits.forEach(habit => {
        if (habit.lastCompleted) {
          const lastCompleted = new Date(habit.lastCompleted.seconds * 1000)
          if (lastCompleted.toDateString() === date.toDateString()) {
            completedCount++
          }
        }
        totalStreak += habit.streak || 0
      })
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        completed: completedCount,
        streak: totalStreak,
        dateObj: date
      })
    }
    
    return data
  }, [habits, refreshKey])

  // Generate data for specific habit if selected
  const generateHabitSpecificData = useMemo(() => {
    if (selectedHabit === 'all') return generateChartData
    
    const selectedHabitData = habits.find(h => h.id === selectedHabit)
    if (!selectedHabitData) return generateChartData
    
    const data = []
    const today = new Date()
    
    // Calculate streak progression for the selected habit
    let currentStreak = 0
    let maxStreak = 0
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      
      let completed = 0
      let streak = 0
      
      if (selectedHabitData.lastCompleted) {
        const lastCompleted = new Date(selectedHabitData.lastCompleted.seconds * 1000)
        if (lastCompleted.toDateString() === date.toDateString()) {
          completed = 1
          // If completed today, increment streak
          if (date.toDateString() === today.toDateString()) {
            currentStreak = selectedHabitData.streak || 0
          } else {
            // For past dates, simulate streak progression
            currentStreak = Math.min(currentStreak + 1, selectedHabitData.streak || 0)
          }
        } else {
          // If not completed on this date, reset streak
          currentStreak = 0
        }
      }
      
      maxStreak = Math.max(maxStreak, currentStreak)
      streak = currentStreak
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        completed,
        streak,
        dateObj: date
      })
    }
    
    return data
  }, [habits, selectedHabit, refreshKey])

  // Generate streak progression data for all habits
  const generateStreakProgressData = useMemo(() => {
    const data = []
    const today = new Date()
    
    // Calculate total streak progression across all habits
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      
      let totalStreak = 0
      
      habits.forEach(habit => {
        if (habit.lastCompleted) {
          const lastCompleted = new Date(habit.lastCompleted.seconds * 1000)
          // Calculate streak for this habit on this date
          if (lastCompleted.toDateString() === date.toDateString()) {
            // This habit was completed on this date, add its current streak
            totalStreak += habit.streak || 0
          }
        }
      })
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        streak: totalStreak,
        dateObj: date
      })
    }
    
    return data
  }, [habits, refreshKey])

  const chartData = generateHabitSpecificData
  const streakData = selectedHabit === 'all' ? generateStreakProgressData : generateHabitSpecificData

  // Calculate real statistics
  const totalHabits = habits.length
  const completedToday = habits.filter(habit => {
    if (!habit.lastCompleted) return false
    const lastCompleted = new Date(habit.lastCompleted.seconds * 1000)
    const today = new Date()
    return lastCompleted.toDateString() === today.toDateString()
  }).length

  const averageStreak = habits.length > 0 
    ? Math.round(habits.reduce((sum, habit) => sum + (habit.streak || 0), 0) / habits.length)
    : 0

  const longestStreak = habits.length > 0 
    ? Math.max(...habits.map(habit => habit.streak || 0))
    : 0

  // Calculate completion rate for the selected time range
  const getCompletionRate = () => {
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90
    const recentData = chartData.slice(-days)
    const totalCompletions = recentData.reduce((sum, day) => sum + day.completed, 0)
    const totalPossible = habits.length * days
    return totalPossible > 0 ? Math.round((totalCompletions / totalPossible) * 100) : 0
  }

  const completionRate = getCompletionRate()

  // Refresh data
  const handleRefresh = async () => {
    setRefreshKey(prev => prev + 1)
    await loadHabits()
  }

  // Auto-refresh when habits change
  useEffect(() => {
    setRefreshKey(prev => prev + 1)
  }, [habits])

  return (
    <Box>
      <HStack justify="space-between" mb={6}>
        <Heading>Progress & Analytics</Heading>
        <Button 
          leftIcon={<RefreshCw />} 
          onClick={handleRefresh}
          size="sm"
          colorScheme="blue"
        >
          Refresh
        </Button>
      </HStack>

      {/* Stats Cards */}
      <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={6} mb={8}>
        <GridItem>
          <Card>
            <CardBody>
              <VStack align="start" spacing={2}>
                <HStack>
                  <TrendingUp color="blue" />
                  <Text fontSize="lg" fontWeight="medium">Total Habits</Text>
                </HStack>
                <Text fontSize="3xl" fontWeight="bold" color="blue.500">
                  {totalHabits}
                </Text>
              </VStack>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card>
            <CardBody>
              <VStack align="start" spacing={2}>
                <HStack>
                  <Calendar color="green" />
                  <Text fontSize="lg" fontWeight="medium">Completed Today</Text>
                </HStack>
                <Text fontSize="3xl" fontWeight="bold" color="green.500">
                  {completedToday}
                </Text>
              </VStack>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card>
            <CardBody>
              <VStack align="start" spacing={2}>
                <HStack>
                  <Target color="purple" />
                  <Text fontSize="lg" fontWeight="medium">Avg Streak</Text>
                </HStack>
                <Text fontSize="3xl" fontWeight="bold" color="purple.500">
                  {averageStreak}
                </Text>
              </VStack>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card>
            <CardBody>
              <VStack align="start" spacing={2}>
                <HStack>
                  <Target color="orange" />
                  <Text fontSize="lg" fontWeight="medium">Completion Rate</Text>
                </HStack>
                <Text fontSize="3xl" fontWeight="bold" color="orange.500">
                  {completionRate}%
                </Text>
              </VStack>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>

      {/* Filters */}
      <HStack spacing={4} mb={6}>
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={2}>Habit</Text>
          <Select 
            value={selectedHabit} 
            onChange={(e) => setSelectedHabit(e.target.value)}
            size="sm"
          >
            <option value="all">All Habits</option>
            {habits.map(habit => (
              <option key={habit.id} value={habit.id}>{habit.name}</option>
            ))}
          </Select>
        </Box>
        
        <Box>
          <Text fontSize="sm" fontWeight="medium" mb={2}>Time Range</Text>
          <Select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            size="sm"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </Select>
        </Box>
      </HStack>

      {/* Charts */}
      <Grid templateColumns="repeat(auto-fit, minmax(400px, 1fr))" gap={6}>
        <GridItem>
          <Card>
            <CardBody>
              <Heading size="md" mb={4}>
                Completion Rate {selectedHabit !== 'all' && `- ${habits.find(h => h.id === selectedHabit)?.name}`}
              </Heading>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="completed" 
                    stroke="#3182ce" 
                    strokeWidth={2}
                    dot={{ fill: '#3182ce', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card>
            <CardBody>
              <Heading size="md" mb={4}>
                {selectedHabit === 'all' ? 'Total Streaks' : 'Streak Progress'} {selectedHabit !== 'all' && `- ${habits.find(h => h.id === selectedHabit)?.name}`}
              </Heading>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={streakData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="streak" fill="#805ad5" />
                </BarChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>

      {/* Top Performers */}
      <Card mt={8}>
        <CardBody>
          <Heading size="md" mb={4}>Top Performing Habits</Heading>
          {habits.length === 0 ? (
            <Text color="gray.500">No habits yet. Create your first habit to see analytics!</Text>
          ) : (
            <VStack spacing={3} align="stretch">
              {habits
                .sort((a, b) => (b.streak || 0) - (a.streak || 0))
                .slice(0, 5)
                .map((habit, index) => (
                  <HStack key={habit.id} justify="space-between" p={3} bg="gray.50" borderRadius="md">
                    <HStack spacing={3}>
                      <Badge colorScheme="blue">{index + 1}</Badge>
                      <VStack align="start" spacing={1}>
                        <Text fontWeight="medium">{habit.name}</Text>
                        <Text fontSize="sm" color="gray.600">{habit.description}</Text>
                      </VStack>
                    </HStack>
                    <HStack spacing={2}>
                      <Badge colorScheme="green">{habit.streak || 0} day streak</Badge>
                      {habit.streak === longestStreak && (
                        <Badge colorScheme="purple">Longest Streak</Badge>
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

export default ProgressPage 