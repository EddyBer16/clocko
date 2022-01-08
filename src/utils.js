function addSwiping() {
	window.Swiped.init({
		query: '.City',
		list: true,
		left: 70
	})
}

function fetchCity(fetchUrl) {
	const fetchedData = fetch(fetchUrl)
		.then(response => {
			if (response.ok) return response.json()
			throw response
		})
		.catch(e => console.error(e))
	return fetchedData
}

function getLocalCity(lat, lng) {
	const CITY_KEY = 'pk.4872db0da8f563a2308f04dbe4712ab9'
	const CITY_API = 'https://us1.locationiq.com/v1/reverse.php?'

	if (localStorage.getItem('located') !== 'true' && lat && lng) {
		const cityParams = new URLSearchParams()
		cityParams.append('key', CITY_KEY)
		cityParams.append('lat', lat)
		cityParams.append('lon', lng)
		cityParams.append('format', 'json')
		const cityUrl = CITY_API + cityParams.toString()

		fetchCity(cityUrl)
			.then(data => {
				const userCities = JSON.parse(localStorage.getItem('cities'))
				userCities.unshift({
					name: data.address.county,
					country: data.address.country,
					lat,
					lng
				})
				localStorage.setItem('cities', JSON.stringify(userCities))
				localStorage.setItem('located', 'true')
			})
		}
}

function getCurrentPosition() {
	if (!localStorage.getItem('located') &&
			!localStorage.getItem('geolocation?') &&
			'geolocation' in navigator) {
		navigator.geolocation.getCurrentPosition(position => {
			getLocalCity(
				position.coords.latitude,
				position.coords.longitude
			)
		}, (error) => {
			if (error.code === 1) localStorage.setItem('geolocation?', 'false')
		})
	}
}

export {
	getCurrentPosition,
	addSwiping
}
