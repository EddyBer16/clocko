import './City.css'
import CityTime from './cityTime/CityTime'

export default function City(props) {
	return <>
		<div class="City__info">
			<h1 class="City__name heading-1">{props.name}</h1>
			<label class="City__country subtitle-1">{props.country}</label>
		</div>
		<CityTime lat={props.lat} lng={props.lng} />
	</>
}
