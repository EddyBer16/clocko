import reducer, {
	resultsLoaded,
	toggleSearch
} from './searchSlice'

describe('searchReducer', () => {
	test('should return initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			open: false,
			results: [],
			timezones: []
		})
	})
	
	test('should return true when open is false', () => {
		const state = {
			open: false
		}
		expect(reducer(state, toggleSearch())).toEqual({open: true})
	})

	test('should return false when open is true', () => {
		const state = {
			open: true
		}
		expect(reducer(state, toggleSearch())).toEqual({open: false})
	})

	test('should return an array of 5 results', () => {
		const payload = [{
			id: 1,
			name: 'Monterrey',
			country: 'Mexico',
			lat: 25,
			lng: -100
		},
		{
			id: 2,
			name: 'Monterrey',
			country: 'Mexico',
			lat: 25,
			lng: -100
		},
		{
			id: 3,
			name: 'Monterrey',
			country: 'Mexico',
			lat: 25,
			lng: -100
		},
		{
			id: 4,
			name: 'Monterrey',
			country: 'Mexico',
			lat: 25,
			lng: -100
		},
		{
			id: 5,
			name: 'Monterrey',
			country: 'Mexico',
			lat: 25,
			lng: -100
		},
		{
			id: 6,
			name: 'Monterrey',
			country: 'Mexico',
			lat: 25,
			lng: -100
		}]

		const newState = reducer([], resultsLoaded(payload))

		expect(newState.results).toHaveLength(5)
	})
})
