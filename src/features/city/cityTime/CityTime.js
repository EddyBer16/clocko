import React from 'react'
import './CityTime.css'

export default class Hour extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			timestamp: null
		}
	}

	getTimestamp() {
		if (this.props.lat && this.props.lng) {
			const API = 'https://api.timezonedb.com/v2.1/get-time-zone?'
			const API_KEY = 'DEEO9JPWTWPV'

			const params = new URLSearchParams()

			params.append('key', API_KEY)
			params.append('format', 'json')
			params.append('by', 'position')
			params.append('lat', this.props.lat)
			params.append('lng', this.props.lng)
			const url = API + params.toString()

			this.fetchCityData(url)
		}
	}

	fetchCityData(fetchUrl) {
		fetch(fetchUrl)
			.then(response => {
				if (response.ok) return response.json()
				throw response
			})
			.then(data => {
				this.setState({
					timestamp: data.timestamp * 1000
				})
			})
			.catch(error => {
				setTimeout(this.fetchCityData, 1000)
				console.error('Error fetching data:', error)
			})
	}

	addSecond() {
		this.setState({
			timestamp: this.state.timestamp + 1000
		})
	}

	componentDidMount() {
		this.getTimestamp()
		this.timerID = setInterval(() => this.addSecond(), 1000)
	}

	componentWillUnmount() {
		clearInterval(this.timerID)
	}

	render() {
		const date = new Date(this.state.timestamp)
		let hours = date.getUTCHours()
		let minutes = date.getUTCMinutes()
		if (minutes < 10) minutes =	`0${minutes}`
		if (hours < 10) hours = `0${hours}`

		return (
				<p class="City__time">{hours}:{minutes}</p>
		)
	}
}
