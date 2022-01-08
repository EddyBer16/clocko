import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    open: false,
    results: [],
    timezones: []
  },
  reducers: {
    timezonesLoaded: (state, action) => {
      return {
        ...state,
        timezones: action.payload 
      }
    },
    toggleSearch: (state) => {
      return {
        ...state,
        open: !state.open
      }
    },
    resultsLoaded: (state, action) => {
      return {
        ...state,
        results: action.payload.slice(0,5)
      }
    }
  },
})

export const {
  resultsLoaded,
  timezonesLoaded,
  toggleSearch
} = searchSlice.actions

export default searchSlice.reducer
