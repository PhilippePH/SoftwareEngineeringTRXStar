# TRX Exercise App
This is a React-based web application designed to help users discover and learn new TRX exercises.

## Installation
To install the dependencies, run:

```bash
npm install
```
## Usage
To start the app, run:

```bash
npm start
```
Then, open http://localhost:3000 to view it in the browser.

## Technologies Used
- React
- IndexedDB
- Redux Toolkit
- React Router
- React Bootstrap
- Sass
- YouTube API

## Deployment
This app can be deployed to any hosting service that supports Node.js applications.

To build the app for production, run:

```bash
npm run build
```
This will create an optimized production build of the app in the build folder.


## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Credits
Authors: Eugene Ting, Adela Viskova, Daniel Doyle, Philippe Paquin-Hirtle, Soren Antebi and Sofia Hernandez Gelado 

TRX videos: [PrivateGYMFitness](https://www.youtube.com/@PrivateGYMFitness)

## Demo
You can check out a live demo of this app at https://trxstar.co.uk.

## Roadmap
We're excited to share some potential changes and improvements we're considering for future releases of the project, but we also welcome and encourage contributions from our community, so feel free to share your ideas and help us shape the direction of this project:

- Use service worker to create a comprehensive offline experience up until YouTube pages
- Pre-load YouTube videos during rest section
- Implement server-side rendering to improve performance and SEO

We're always looking for new contributors to help us bring these exciting changes to life, so if you're interested in getting involved, please check out our Contributing guidelines below and submit a pull request!

## Contributing
We welcome contributions from anyone interested in improving this project. If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes and commit them with descriptive commit messages.
4. Push your changes to your fork.
5. Submit a pull request to the main repository.

We will review your changes as soon as possible and may provide feedback or request additional changes before merging your pull request. By contributing to this project, you agree to abide by our code of conduct (insert link to your code of conduct document).

## Folder Structure
```
/trx-exercise-app
├── README.md
├── database_scripts
|  ├── csv
|  ├── csv_to_json.py
|  ├── json
|  └── main.py
├── node_modules
├── package-lock.json
├── package.json
├── public
|  ├── images
|  ├── index.html
|  ├── logo.png
|  ├── manifest.json
|  ├── offline.html
|  ├── robots.txt
|  └── serviceworker.js
└── src
   ├── App.js
   ├── assets
   ├── components
   ├── data
   ├── index.css
   ├── index.js
   ├── redux
   ├── sassStyles
   └── scripts
```

## Acknowledgments
-  This project was bootstrapped with [Create React App](https://create-react-app.dev/).

-  The [Redux Persist](https://github.com/rt2zz/redux-persist) library was used for local storage persistence of state data.

-  The [react-loader-spinner](https://github.com/mhnpd/react-loader-spinner) library was used for loading spinners.

-  The [web-vitals](https://github.com/GoogleChrome/web-vitals) library was used for monitoring app performance.


# OLD

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