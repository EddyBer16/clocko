import './App.css';
import Header from './features/header/Header'
import Search from './features/search/Search'
import Cities from './features/cities/Cities'

function App() {
  return (
    <div className="App">
      <Header/>
		  <Search/>
		  <Cities/>
    </div>
  );
}

export default App;
