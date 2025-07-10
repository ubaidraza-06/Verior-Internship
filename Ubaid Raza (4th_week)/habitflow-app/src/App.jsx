import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import { HabitProvider } from './components/HabitContext'
import Navigation from './components/Navigation'
import Dashboard from './components/Dashboard'
import HabitsPage from './components/HabitsPage'
import ProgressPage from './components/ProgressPage'
import CalendarPage from './components/CalendarPage'

function App() {
  return (
    <HabitProvider>
      <Router>
        <Box minH="100vh" bg="gray.50">
          <Navigation />
          <Box as="main" maxW="1200px" mx="auto" px={4} py={8}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/habits" element={<HabitsPage />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </HabitProvider>
  )
}

export default App 