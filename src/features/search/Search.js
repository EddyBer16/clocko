import searchIcon from '../../assets/search.svg'
import add from '../../assets/add.png'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleSearch, resultsLoaded } from './searchSlice'
import { cityAdded } from '../cities/citiesSlice'
import City from '../city/City'
import Skeleton from '../loader/Loader'
import './Search.css'

export default function Search() {
	const dispatch = useDispatch()
	const timezones = useSelector((state) => state.search.timezones)

	// handleResults
	let timeout = null
	const results = useSelector(state => state.search.results)
	const [resultsToRender, setResultsToRender] = useState([])
	const [loading, setLoading] = useState(false)
	useEffect(() => {
		let timeoutId = null
		setResultsToRender([])
		results.forEach((result, index) => {
			timeoutId = setTimeout(() => {
				setResultsToRender(prevResults => [...prevResults, result])
				if (index === results.length - 1) {
					setTimeout(setLoading(false), 500)
				}
			}, 1000 * index)
		})

		return () => clearTimeout(timeoutId)
	}, [results])


	const handleInputChange = e => {
		clearTimeout(timeout)
		timeout = setTimeout(() => {
			const input = e.target.value ? true : false

			if (input) {
				setLoading(true)
				const resultsToLoad = timezones.filter(timezone => {
					const cityName = timezone.city.toLowerCase()
					const searchName = e.target.value.toLowerCase()
					return cityName.includes(searchName) 
				})

				if (resultsToLoad.length > 0) {
					dispatch(resultsLoaded(resultsToLoad.map(result => {
						return {
							id: new Date().valueOf(),
							name: result.city,
							country: result.country,
							lat: result.lat,
							lng: result.lng
						}
					})))
				} else {
					setLoading(false)
					setResultsToRender([])
				}
			}
			else setResultsToRender([])
		}, 1000) 
	}

	// SEARCH BAR
	const $searchBar = document.querySelector('.Search-Bar')
	const searchState = useSelector((state) => state.search.open)
	useEffect(() => {
		const $search = document.querySelector('.Search')
		if (searchState) $search.classList.add('is-visible')
		else $search.classList.remove('is-visible')
	}, [searchState])

	const [searchResults, setSearchResults] = useState()
	useEffect(() => {
		let noCitiesData = [
			'Los Angeles',
			'San Francisco',
			'Monterrey',
			'San Diego',
			'New York'
		]

		if (resultsToRender.length > 0) {
			setSearchResults(resultsToRender.map(result => {
				return (
					<article
						key={result.id}
						class="City"
						onClick={() => {
							dispatch(cityAdded(result))
							dispatch(toggleSearch())
							document.querySelector('.Search-Input').value = ''
							setResultsToRender([])
						}}
					>
						<City {...result} />
					</article>
				)
			}))
		} else setSearchResults(
				<p class="paragraph-1">Try typing '{
					noCitiesData[Math.floor(Math.random() * noCitiesData.length)]
				}'</p>
		)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [resultsToRender])

	return <>
		<section class="Search">
			<header>
				<h1 class="heading-1">Add new city</h1>
				<img
					onClick={() => dispatch(toggleSearch())}
					class='Header__icon close'
					src={add}
					width="40"
					height="40"
					alt=""
				/>
			</header>
			<div class="Search-Bar">
				<img
					class="Search-Icon"
					src={searchIcon}
					alt=""
					width="20"
					height="20"
				/>
				<input class="Search-Input"
					type="text" 
					placeholder="Search by city name"
					onFocus={() => $searchBar.style.background = '#e3e3e3'}
					onBlur={() => $searchBar.style.background = 'var(--background-secondary)'}
					onKeyUp={handleInputChange}/>
			</div>
			<section class="Search-Results container">
				{loading && <Skeleton />}
				{searchResults}
			</section>
		</section>
	</>
}

