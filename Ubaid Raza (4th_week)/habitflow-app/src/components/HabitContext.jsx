import React, { createContext, useContext, useState, useEffect } from 'react'
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore'
import { db } from '../config/firebase'

const HabitContext = createContext()

export const useHabits = () => {
  const context = useContext(HabitContext)
  if (!context) {
    throw new Error('useHabits must be used within a HabitProvider')
  }
  return context
}

export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState([])
  const [loading, setLoading] = useState(true)

  // Set up real-time listener for habits
  useEffect(() => {
    console.log('Setting up real-time listener for habits')
    
    const unsubscribe = onSnapshot(collection(db, 'habits'), (querySnapshot) => {
      const habitsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      console.log('Real-time update - Loaded habits:', habitsData)
      setHabits(habitsData)
      setLoading(false)
    }, (error) => {
      console.error('Error in real-time listener:', error)
      setLoading(false)
    })

    // Cleanup function
    return () => {
      console.log('Cleaning up real-time listener')
      unsubscribe()
    }
  }, [])

  // Add new habit
  const addHabit = async (habitData) => {
    try {
      console.log('Adding habit:', habitData)
      const habitToAdd = {
        ...habitData,
        createdAt: new Date(),
        streak: 0,
        lastCompleted: null,
        active: true
      }
      
      const docRef = await addDoc(collection(db, 'habits'), habitToAdd)
      console.log('Habit added with ID:', docRef.id)
      return docRef.id
    } catch (error) {
      console.error('Error adding habit:', error)
      throw error
    }
  }

  // Update habit
  const updateHabit = async (habitId, updates) => {
    try {
      console.log('Updating habit:', habitId, 'with updates:', updates)
      await updateDoc(doc(db, 'habits', habitId), updates)
    } catch (error) {
      console.error('Error updating habit:', error)
      throw error
    }
  }

  // Delete habit
  const deleteHabit = async (habitId) => {
    try {
      console.log('Deleting habit:', habitId)
      await deleteDoc(doc(db, 'habits', habitId))
    } catch (error) {
      console.error('Error deleting habit:', error)
      throw error
    }
  }

  // Complete habit
  const completeHabit = async (habitId) => {
    console.log('completeHabit called with ID:', habitId)
    console.log('Current habits:', habits)
    
    const habit = habits.find(h => h.id === habitId)
    if (!habit) {
      console.error('Habit not found:', habitId)
      return
    }

    console.log('Found habit:', habit)
    const today = new Date()
    const lastCompleted = habit.lastCompleted ? new Date(habit.lastCompleted.seconds * 1000) : null
    
    console.log('Today:', today)
    console.log('Last completed:', lastCompleted)
    
    let newStreak = habit.streak || 0
    console.log('Current streak:', newStreak)
    
    // Check if habit was already completed today
    if (lastCompleted && isSameDay(today, lastCompleted)) {
      console.log('Habit already completed today')
      return
    }
    
    // Calculate new streak
    if (lastCompleted && isConsecutiveDay(today, lastCompleted)) {
      newStreak += 1
      console.log('Consecutive day - new streak:', newStreak)
    } else {
      newStreak = 1
      console.log('New streak started:', newStreak)
    }

    console.log('Completing habit:', habitId, 'new streak:', newStreak)
    try {
      await updateHabit(habitId, {
        streak: newStreak,
        lastCompleted: today
      })
      console.log('Habit completion update successful')
    } catch (error) {
      console.error('Error completing habit:', error)
    }
  }

  // Helper functions
  const isSameDay = (date1, date2) => {
    return date1.toDateString() === date2.toDateString()
  }

  const isConsecutiveDay = (today, lastCompleted) => {
    const diffTime = Math.abs(today - lastCompleted)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays === 1
  }

  // Manual refresh function
  const loadHabits = async () => {
    console.log('Manual refresh requested')
    // The real-time listener will handle the update automatically
  }

  // Test function to manually update a habit
  const testUpdate = async (habitId) => {
    console.log('Testing manual update for habit:', habitId)
    try {
      await updateDoc(doc(db, 'habits', habitId), {
        testField: new Date().toISOString()
      })
      console.log('Test update successful')
    } catch (error) {
      console.error('Test update failed:', error)
    }
  }

  const value = {
    habits,
    loading,
    addHabit,
    updateHabit,
    deleteHabit,
    completeHabit,
    loadHabits,
    testUpdate
  }

  return (
    <HabitContext.Provider value={value}>
      {children}
    </HabitContext.Provider>
  )
} 