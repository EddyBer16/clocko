import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import store from './app/store'
import { Provider } from 'react-redux'
import { timezonesLoaded } from './features/search/searchSlice'
import { fetchTimezones } from './services/fetchTimezones'
import { initCities } from './features/cities/citiesSlice'

const timezonesData = localStorage.getItem('timezones')
if (timezonesData) {
  store.dispatch(timezonesLoaded(JSON.parse(timezonesData)))
} else {
  fetchTimezones()
    .then(timezones => store.dispatch(timezonesLoaded(timezones)))
}

store.dispatch(initCities())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorkerRegistration.register()
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
