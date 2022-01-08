import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cityRemoved } from './citiesSlice'
import {
	getCurrentPosition,
	addSwiping
} from '../../utils'
import City from '../city/City'
import Skeleton from '../loader/Loader'
import deleteIcon from '../../assets/delete.svg'

export default function Cities() {
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(true)
	const [citiesToRender, setCitiesToRender] = useState([])

	const cities = useSelector((state) => state.cities)

	useEffect(() => {
		setLoading(true)
		if (!localStorage.getItem('located'))	getCurrentPosition()
	}, [])

	useEffect(() => {
		setLoading(true)
		setCitiesToRender([])
		setTimeout(() => {
			let timeoutId = null

			if (cities) {
				cities.forEach((city, index) => {
					timeoutId = setTimeout(() => {
						setCitiesToRender(prevCities => [...prevCities, city])
						if (index === cities.length - 1) {
							setTimeout(() => {
								setLoading(false)
							}, 500)
						}
					}, 1000 * index)
				})

				return () => clearTimeout(timeoutId)
			}
		}, 1000)
	}, [cities])

	if (cities) if (citiesToRender.length > 0 || cities.length > 0) {
		return <main class="container">
			{loading && <Skeleton />}
			{citiesToRender.map((city, index) => {
				return (
					<div class="City__container">
						<article class="City">
							<City key={index} {...city} />
						</article>
						<span
							onClick={() => dispatch(cityRemoved(city.id))}
							class="City__delete-icon"
						>
							<img src={deleteIcon} alt="" width="25" height="25" />
						</span>
					</div>
				)
			})}
			{addSwiping()}
		</main>
	}

	return <main class="container">
		<h2 class="heading-1">No cities to show</h2>
		<p class="paragraph-1">Try adding a city using the + button</p>
	</main>
}
