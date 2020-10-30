This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Read more [here](https://gitlab.stud.idi.ntnu.no/it2810-h20/team-74/prosjekt-3/-/blob/master/react.md)

## Setup of project

### Installation

To run the project, first run

### `cd backend`

### `npm install && npm start`.

Open another terminal and run

### `npm install && npm start`

## Product info

The project works as a travel diary with a list of countries in which the user can search, sort, filter through the different countries. The application can filter the countries based on region, population and area. The user can also mark countries they have visited or want to visit, and go through a list of these. In addition, the user can click on “see more” of a country to see more details of the desired country.

## MERN-stack

The project is set up using the MERN-stack, which includes MongoDB, Express, React and Node.js. The web part of the project, also referred to as frontend, is handled by React, the server side, referred to as backend, consists of Express and Node.js, while the database is set up with MongoDB. MongoDB works well with Express which runs on Node.js, which makes handling data from the database to the server side fairly easy. Express also handles HTTP requests in a simple manner with methods for mapping URLs to the server side. Together with React as the frontend framework of the project, the MERN stack is a full stack which allows for smooth development of the web application which is the reason why it was chosen for the project.

## Setup of database and backend

Following the MERN-stack, the backend is set up using a MongoDB database with Express and Node.js as the server. The backend API connects to the database using mongoose.connect() and runs on localhost port 8080. To retrieve data from the database, the backend is built on Express and REST, using the get() and post() methods from REST to retrieve countries and send user data to the database. The process of searching, filtering and sorting are all done in the backend of the project, using queries and params to find the specific countries that apply. The router.ts file then contains all endpoints that the Fetch component in frontend fetches from.

## User generated data

The project involves user generated data by letting the user mark countries which they have visited and countries the wish to travel to. This functionality is implemented by creating a new entry in the users-collection in the database, and sending the unique identificator for that entry to the user. This id is then saved in localStorage so that the client can fetch their data on future visits to the webpage. Furthermore, the id is used to modify the db by sending post-request to endpoints setup by the REST api backend.

## Third party components

### Redux

The application uses redux as its state manager. It is set up and modified through using the actions defined in store.tsx, and is preserved between refreshes through the usage of sessionStorage. The reason redux was chosen as the component to tackle state management over mobx or react-context is due to redux’s popularity before and thus the team members wanted to have experience with the technology as they are likely to encounter it later. Furthermore, with the release of hooks in v7.1.0, the usage of the redux was also simplified. This makes the development simple and quick, and more compatible with the increasing trend of using functional components from React. Another advantage with redux was that the component was well-documented, and the documentation was used a lot throughout the development.

### Router

This project uses the third party component “react-router-dom”. React Router (RR) provides a way to render different components within a Single Page Application (SPA). The Router component showing the different renderoptions. This is implemented wit the Switch-tag to show different Routes for the path s specified. To change the paths, and thereby chat is rendered according to the Switch in Router.tsx, the project uses Link-tags. This tag sets the path according to which case in the switch that shoul apply. The project also uses the function useLocation to access a parameter that is passed through the url. This is done in the CountryDisplayMoreInfo component.

## Testing

The application is tested with automated end-2-end testing using cypress. End-2-end testing was implemented to check the UI and user flow of the application, specifically the search, filtering and sorting functionality. The tests are run with

### `npm run e2e`

Furthermore, unit testing is important to check if components act in the manner that is wished. As such, two tests were written, one which checks that the buttons for viewing the countries the user has interacted with renders correctly, and another for checking that the search bar updates the input field as well as correctly updates the redux-store.

Ultimately, a snapshot test was also created to check that the navigation-buttons render correctly to have testing that covers a broader area of the application. These final tests were created using React’s own testing library in conjunction with jest as both of these are from the same developer, and the team had experience with these from beforehand. These tests run with

### `npm test`
