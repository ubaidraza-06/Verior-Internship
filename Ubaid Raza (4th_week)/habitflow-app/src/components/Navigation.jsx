import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Box, Flex, Button, Text, useColorModeValue } from '@chakra-ui/react'
import { Home, Calendar, TrendingUp, Plus } from 'lucide-react'

const Navigation = () => {
  const location = useLocation()
  const bg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/habits', label: 'Habits', icon: Plus },
    { path: '/progress', label: 'Progress', icon: TrendingUp },
    { path: '/calendar', label: 'Calendar', icon: Calendar },
  ]

  return (
    <Box bg={bg} borderBottom="1px" borderColor={borderColor} px={4} py={4}>
      <Flex maxW="1200px" mx="auto" align="center" justify="space-between">
        <Link to="/">
          <Text fontSize="xl" fontWeight="bold" color="blue.600">
            HabitFlow
          </Text>
        </Link>
        
        <Flex gap={2}>
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive ? 'solid' : 'ghost'}
                  colorScheme={isActive ? 'blue' : 'gray'}
                  leftIcon={<Icon size={18} />}
                  size="sm"
                >
                  {item.label}
                </Button>
              </Link>
            )
          })}
        </Flex>
      </Flex>
    </Box>
  )
}

export default Navigation 