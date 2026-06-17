# Full Stack Open Exercises

This repository contains my solutions for the University of Helsinki **Full Stack Open** course up to **Part 5**.

The course covers modern full stack web development with JavaScript, React, Node.js, Express, MongoDB, testing, authentication, routing, and end-to-end testing.

## Repository overview

```text
fullstackopen/
├── part0/
├── part1/
├── part2/
├── part3/
├── part4/
├── part5/
├── tests/
├── playwright.config.js
├── package.json
└── README.md
```

Each part contains one or more small applications or course projects. The applications are usually developed step by step, so later exercises often extend or refactor earlier versions.

## Technologies used

* JavaScript
* React
* Vite
* Node.js
* Express
* MongoDB / Mongoose
* Axios
* JSON Web Tokens
* bcrypt
* Vitest
* React Testing Library
* Playwright
* Material UI
* styled-components
* Render deployment

## Part 0: Fundamentals of Web apps

Part 0 contains the introductory exercises about how web applications work.

Topics covered:

* Browser and server communication
* HTTP requests
* HTML forms
* Single-page applications
* Sequence diagrams

## Part 1: Introduction to React

Part 1 contains the first React applications.

### Course information

A simple React application for displaying course information and exercise counts.

Main topics:

* React components
* Props
* Rendering static data
* Basic component structure

### Unicafe

A feedback application where users can give feedback as good, neutral, or bad.

Main topics:

* React state with `useState`
* Event handlers
* Conditional rendering
* Calculating statistics
* Passing data to child components with props

### Anecdotes

An application that displays random programming anecdotes and allows voting.

Main topics:

* Random selection
* Arrays in state
* Updating state immutably
* Rendering the anecdote with the most votes

## Part 2: Communicating with server

Part 2 expands React applications by adding collections, forms, server communication, and external APIs.

### Course information

A refactored course information app that renders multiple courses and calculates exercise totals using array methods.

Main topics:

* Rendering collections
* Component extraction
* `map`
* `reduce`
* Using keys in lists

### Phonebook

A phonebook application with filtering, adding, updating, deleting, and notifications.

Main features:

* Add new persons
* Filter visible persons
* Update an existing number
* Delete persons
* Show success and error notifications
* Communicate with backend through a service module

Main topics:

* Controlled forms
* `useEffect`
* Axios
* REST API communication
* Service modules
* Error handling


#### Running locally

```bash
cd part2/phonebook
npm install
npm run dev
```


The phonebook frontend uses the `/api/persons` endpoint. In local development, Vite proxies `/api` requests to `http://localhost:3001`, so a compatible phonebook backend must be running on port `3001`.


### Countries

An application for searching countries and displaying country information.

Main features:

* Search countries by name
* Show a list when several countries match
* Show a single country with capital, area, languages, and flag
* Show weather information for the capital

Main topics:

* External APIs
* Conditional rendering
* Environment variables
* Effects and asynchronous data fetching


#### Environment variables

The weather feature uses the OpenWeather API. To enable weather data, create a local `.env` file inside `part2/countries`:

```env
VITE_SOME_KEY=your_openweathermap_api_key
```

After creating or changing the `.env` file, restart the development server.

## Part 3: Programming a server with Node.js and Express

Part 3 contains the backend for the phonebook application.

Main topics:

* Node.js
* Express
* REST APIs
* Middleware
* MongoDB Atlas
* Mongoose
* Environment variables
* Validation
* Error handling
* Deployment

Deployment:

```text
https://fullstackopen-4glo.onrender.com/
```

The deployed application is included as part of the course submission.

## Part 4: Testing Express servers, user administration

Part 4 contains the backend for the Bloglist application.

### Bloglist backend

The backend provides a REST API for blogs and users.

Main features:

* Get all blogs
* Create a blog
* Update blog likes
* Delete a blog
* User creation
* Login
* Token-based authentication
* Only the creator of a blog can delete it
* Blog documents are connected to users
* Users are connected to their blogs

Main topics:

* Express routers
* Mongoose models
* MongoDB relations with `populate`
* Password hashing with bcrypt
* JSON Web Tokens
* Middleware for token and user extraction
* Backend validation
* Supertest API tests
* Node test runner

Typical backend commands:

```bash
cd part4/bloglist
npm install
npm run dev
npm test
```

Required environment variables are expected in a local `.env` file, for example:

```text
MONGODB_URI=your_database_uri
TEST_MONGODB_URI=your_test_database_uri
SECRET=your_jwt_secret
PORT=3003
```

The `.env` file should not be committed to GitHub.

## Part 5: Testing React apps

Part 5 contains the frontend for the Bloglist application.

### Bloglist frontend

The frontend communicates with the Bloglist backend and provides a routed React UI.

Main features:

* Login and logout
* Persisting logged-in user in local storage
* Listing blogs
* Creating new blogs
* Viewing a single blog on its own route
* Liking a blog
* Deleting a blog
* Showing delete button only to the blog creator
* Navigation with React Router
* UI styling with Material UI and styled-components
* Notifications
* Component tests with Vitest and React Testing Library
* End-to-end tests with Playwright

Main topics:

* React Router
* Controlled forms
* Services with Axios
* Token-based frontend authentication
* Conditional rendering
* Component tests
* Mock functions
* End-to-end tests

Typical frontend commands:

```bash
cd part5/bloglist-frontend
npm install
npm run dev
npm test
npm run build
```

The frontend expects the backend API to be available through the configured Vite proxy or at the backend URL used during development.

## End-to-end tests

The Playwright end-to-end tests are located in the root-level `tests/` directory.

Main tested flows include:

* Successful login
* Failed login
* Logout
* Creating a blog
* Liking a blog
* Deleting a blog

Run E2E tests from the repository root:

```bash
npm install
npm test
```

Before running the E2E tests, make sure that:

1. The backend is running on the expected port.
2. The frontend is running on the expected port.
3. The backend test reset route is available in test mode.

Typical setup:

```bash
# terminal 1
cd part4/bloglist
npm run start:test

# terminal 2
cd part5/bloglist-frontend
npm run dev

# terminal 3, repository root
npm test
```

## Notes about tests

Some applications in this course are developed step by step. Later exercises may change the UI or architecture of an earlier version. Because of that, older tests may reflect an earlier stage of the application while newer tests target the final routed version.

The important final features of the Bloglist application are implemented in the Part 4 backend, Part 5 frontend, and the root-level Playwright tests.

## Installation notes

Install dependencies inside the specific project folder you want to run.

Examples:

```bash
cd part2/phonebook
npm install
npm run dev
```

```bash
cd part4/bloglist
npm install
npm run dev
```

```bash
cd part5/bloglist-frontend
npm install
npm run dev
```

For root-level Playwright tests:

```bash
npm install
npm test
```

## Git ignore recommendations

Generated files and local dependencies should not be committed.

Recommended ignored files and folders:

```text
node_modules/
dist/
coverage/
playwright-report/
test-results/
.env
```

## Course

Full Stack Open is offered by the University of Helsinki.

Course website:

```text
https://fullstackopen.com/en/
```

## Author

Helge Schulz

GitHub:

```text
https://github.com/FeFe488
```
