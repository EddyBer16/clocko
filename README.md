<p align="center">
  <img src="https://user-images.githubusercontent.com/43454450/148852835-20045f03-7649-4551-b560-4ea47d7e0691.png" />
</p>

## Status

**_Currently on PWA version_**

## About the Project

Starting on _December 21, 2021_

I got the idea from my [stream on twitch](https://twitch.tv/eddyber16), where people from different parts of the world get together for study sessions using the pomodoro technique. I originally used the clock app on my phone to find out what time it was in cities where followers join from like Singapore, Melbourne, San Francisco and Toronto.

The idea was: 

> "A web application that helps to track the time in different cities around the world, the local time and save the cities in the local storage".

Once I had the idea I started to do the planning. I researched different services to get the time or city names giving only the latitude and longitude values. I also learned about the existence of the Geolocation API inside the browser to get the client's global position.

On _december 22_, I created the [design using **Figma**](https://www.figma.com/file/Hm6fzCQsKTxTvwizHnanPa/Clocko), which took me 1.5 days. I tried to make the design using **Atomic Design** as well to understand more deeply the use of these design methodologies along the development process.

The components are structured in the following structure:

<p align="center">
  <img src="https://user-images.githubusercontent.com/43454450/148852405-dc4ad7d3-093f-48fe-b9a5-e3c01e720b55.png" />
</p>
  
The development (or programming) started on _december 23, 2021_.

At the beginning of the project the idea was just to use [**React**](https://reactjs.org) to gain more experience in the library. I ended up learning how to use [**React Hooks**](https://reactjs.org/docs/hooks-intro.html) (something I didn't understand at all). When the application was populated with different components it caused that there was little control over the states. I wanted in a way that two components shared the state of the cities to add cities from the Search component and delete them in the Cities component.

Once the interface was built and the application was fully functional the need arose to convert the state into a global state, so I decided it was time to integrate [**Redux**](https://redux.js.org) from there.

I didn't really know anything about Redux; I spent several days trying to understand the structure of the files and what each reducer did with its actions and payload. When I was learning about Redux, the guy on the videos used **Testing Driven Development**, I didn't even know that was a thing, so I decided to use it and that's how I wrote my first tests using [**Jest**](https://jestjs.io/).

I restructured the project files so that I could integrate the necessary reducers and reduce the lines of code in the components, freeing them from unnecessary or repetitive logic.

In summary that was all the project entailed for me, in the following sections I will share more information about each component, its function and its design.

### Basic Flow

<p align="center">
  <img src="https://user-images.githubusercontent.com/43454450/148857135-72fb24b6-05f6-47a3-adb7-41e3974680c7.png" />
</p>

# Components

## Header

![Header](https://user-images.githubusercontent.com/43454450/148857539-a7b85369-8ae1-4373-83d5-350d799c796b.png)

Contains the icon to add a new city. When clicked it toggles the search component to show to the user.

```js
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
```

Inside of this first component I started using a reducer from the Search component, taking advantage of the general state to open from `Header` and closing from `Search`.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run deploy`

Deploys the app to GitHub pages.\
It first runs `npm run build` to generate the build and deploy that folder to the gh-pages branch.
