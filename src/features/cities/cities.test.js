import reducer, { initCities, cityAdded, cityRemoved } from './citiesSlice'

describe('citiesReducer', () => {
	test('should return the local storage cities', () => {
		localStorage.setItem('cities', JSON.stringify([
			{
				name: 'Monterrey',
				country: 'Mexico',
				lat: 25,
				lng: -100
			}
		]))
		const newState = reducer([], initCities())
		expect(newState).toEqual([
			{
				name: 'Monterrey',
				country: 'Mexico',
				lat: 25,
				lng: -100
			}
		])
	})

	test('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual([])
	})

	test('should handle a city added from an empty array', () => {
		const data = {
			name: 'Monterrey',
			country: 'Mexico',
			lat: 25,
			lng: -100
		}

		const newState = reducer([], cityAdded(data))
		expect(newState).toHaveLength(1)
	})

	test('should handle a city added from an array with one city already', () => {
		const state = [
			{
				name: 'Monterrey',
				country: 'Mexico',
				lat: 25,
				lng: -100
			}
		]

		const payload = {
			name: 'San Francisco',
			country: 'United States',
			lat: 0,
			lng: 0
		}

		const newState = reducer(state, cityAdded(payload))
		expect(newState).toHaveLength(2)
	})

	test('should return state after removing a city by id', () => {
		const state = [
			{
				id: 1,
				name: 'Monterrey',
				country: 'Mexico',
				lat: 25,
				lng: -100,
			},
			{
				id: 2,
				name: 'San Francisco',
				country: 'United States',
				lat: 0,
				lng: 0
			}
		]

		const newState = reducer(state, cityRemoved(1))
		expect(newState).toEqual([
			{
				id: 2,
				name: 'San Francisco',
				country: 'United States',
				lat: 0,
				lng: 0
			}
		])
		expect(newState).toHaveLength(1)
	})

	test('should return the new state after adding two cities', () => {
		const state = []
		let newState = reducer(state, cityAdded({
			id: 1,
			name: 'Monterrey',
			country: 'Mexico',
			lat: 25,
			lng: -100
		}))
		newState = reducer(newState, cityAdded({
			id: 2,
			name: 'San Francisco',
			country: 'United States',
			lat: 0,
			lng: 0
		}))

		expect(newState).toEqual([
			{
				id: 1,
				name: 'Monterrey',
				country: 'Mexico',
				lat: 25,
				lng: -100
			},
			{
				id: 2,
				name: 'San Francisco',
				country: 'United States',
				lat: 0,
				lng: 0
			}
		])
		expect(newState).toHaveLength(2)
	})

	test('should return an empty array after removing a unique city', () => {
		const state = [
			{
				id: 1,
				name: 'Monterrey',
				country: 'Mexico',
				lat: 25,
				lng: -100
			}
		]
		expect(reducer(state, cityRemoved(1))).toEqual([])
	})
})
