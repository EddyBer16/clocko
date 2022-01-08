import { configureStore } from '@reduxjs/toolkit'
import searchReducer from '../features/search/searchSlice'
import citiesReducer from '../features/cities/citiesSlice'

export default configureStore({
  reducer: {
    search: searchReducer,
    cities: citiesReducer,
  },
})
