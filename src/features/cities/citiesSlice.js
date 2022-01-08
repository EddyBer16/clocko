import { createSlice } from '@reduxjs/toolkit'

export const citiesSlice = createSlice({
	name: 'cities',
	initialState: [],
	reducers: {
		initCities: () => {
			const localCities = localStorage.getItem('cities')
			if (localCities) {
				return JSON.parse(localCities)
			} else {
				localStorage.setItem('cities', JSON.stringify([]))
			}
		},
		cityAdded: (state, action) => {
			const city = {
				id: new Date().valueOf(),
				...action.payload
			}
			const newState = [
				...state,
				city
			]

			localStorage.setItem('cities', JSON.stringify(newState))
			return newState
		},
		cityRemoved: (state, action) => {
			const newState = state.filter(city => city.id !== action.payload)
			localStorage.setItem('cities', JSON.stringify(newState))
			return newState
		}
	}
})

export const { initCities, cityAdded, cityRemoved } = citiesSlice.actions

export default citiesSlice.reducer
