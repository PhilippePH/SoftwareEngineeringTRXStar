# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to install and run the project
- Run command 'npm install' to install dependencies listed in package.json locally
- Start up a development server with command 'npm start'
- Create a build folder with 'npm run build' where compiled code to be used for a host will be contained

## File Structure
__SUBJECT TO CHANGE WITH BOTH SASS AND BOOTSTRAP FILES__

main/
├── public/
│   ├── index.html <- main HTML page with React code injected into <div> element with id="root"
│   ├── offline.html <- HTML to be shown to user when no cache __and__ no internet
│   ├── manifest.js <- mandatory specifications for app to be installable
|   ├── serviceworker.js <- service worker logic linked to index.html through <script> element
│   └── images <- folder to store image content
|
├── src/
|   ├── index.js <- inject code into <div> element from index.html in /public
│   ├── App.js <- component structure and main app logic with use of react-router-dom and initialisation of IndexedDB
|   ├── App.scss 
│   └── components <- folder to contain React components with the below naming convention
|       └── ComponentName
|           ├── index.js
|           └── styles.scss
|
├── package.json <- List of dependencies, run 'npm install' to install
|
├── package-lock.json <- Auto-generated list of dependencies of dependencies from package.json
|
└── node_modules  <- installed node modules stored here from running 'npm install'

# Project-specific technologies

## Service Workers
Service Workers act as a proxy between the web server and the browser (intercepting fetch requests made by the browser). We leverage Service Workers to:
1) Dictate what the browser caches (in our case, the whole website)
2) Redirect fetch requests when files are not accessible (i.e. when there are both no files in browser cache __and__ the user is offline)
[See here] (https://www.youtube.com/watch?v=IaJqMcOMuDM&list=LL&index=12) for the tutorial on the tutorial we followed to implement Service Workers

## IndexedDB
In browser NoSQL database which uses an object store model.
See both:
1) https://dev.to/alexeagleson/how-to-use-indexeddb-to-store-data-for-your-web-application-in-the-browser-1o90
2) https://www.google.com/search?q=indexeddb+with+react&oq=indexeddb+with+react&aqs=chrome.0.69i59j0i22i30l4j0i390l2j69i60.5051j1j7&sourceid=chrome&ie=UTF-8#fpstate=ive&vld=cid:2cab3ea3,vid:G2CzVilvaXk

## React router
Per the package.json, we are using version 6, [here is the intro tutorial from the official docs] (https://reactrouter.com/en/main/start/tutorial).

## SASS
We use SASS, a CSS extension, for custom styling where needed, however most of our styling is taken from react-bootstrap. To read more about SASS please [click here](https://sass-lang.com/guide).

## React-bootstrap
TBA - (evaluate potential dependencies and the versioning of bootstrap we will be able to access while using the react-bootstrap library).

## Hosting
TBA - (add details about Vercel and GitLab CI/CD)