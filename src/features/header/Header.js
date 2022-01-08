import { useDispatch } from 'react-redux'
import { toggleSearch } from '../search/searchSlice'
import add from '../../assets/add.png'
import './Header.css'

function Header() {
	const dispatch = useDispatch()
	
	return <header class="container">
		<h1 class="header__logo text--bold">Clocko</h1>
		<img
			onClick={() => {dispatch(toggleSearch())}}
			class="Header__icon"
			src={add}
			width="40"
			height="40"
			alt=""
		/>
	</header>
}

export default Header
