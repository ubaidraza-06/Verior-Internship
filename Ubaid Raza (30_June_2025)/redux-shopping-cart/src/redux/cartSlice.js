import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      const existing = state.find(item => item.id === action.payload.id)
      if (existing) {
        existing.qty += 1
      } else {
        state.push({ ...action.payload, qty: 1 })
      }
    },
    removeItem: (state, action) => {
      return state.filter(item => item.id !== action.payload)
    },
    decreaseQty: (state, action) => {
      const item = state.find(item => item.id === action.payload)
      if (item) {
        if (item.qty === 1) {
          return state.filter(i => i.id !== action.payload)
        } else {
          item.qty -= 1
        }
      }
    },
  },
})

export const { addItem, removeItem, decreaseQty } = cartSlice.actions
export default cartSlice.reducer
