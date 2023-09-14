# Chitter App

The Chitter App provides a platform for users to share their thoughts, similar to tweets, known as "peeps". This README offers a detailed overview of the project, including its structure, installation steps, features, and more.

## Table of Contents
- [Chitter App](#chitter-app)
  - [Table of Contents](#table-of-contents)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
    - [Backend:](#backend)
    - [Frontend:](#frontend)
  - [Installation \& Setup](#installation--setup)
    - [Backend:](#backend-1)
    - [Frontend:](#frontend-1)
  - [Features](#features)
  - [Endpoints](#endpoints)
    - [Backend:](#backend-2)
    - [Frontend:](#frontend-2)
  - [Security](#security)

## Tech Stack
- **Backend**: Express.js with Mongoose for MongoDB interaction.
- **Frontend**: React.js with Redux for state management and Redux-persist for persistent state.
- **Utilities**: multer (for handling multipart form data, mainly for file uploads), morgan (HTTP request logger), helmet (sets security-related HTTP headers), dotenv (loading environment variables).

## Project Structure

### Backend:
- `models`: Contains User and Peep schemas that define the structure for user and peep entries in the database.
- `routes`: Incorporates the routes for authentication (`auth.js`), user-specific routes (`users.js`), and peep-specific operations (`peeps.js`).
- `controllers`: Specifies the logic for each route, including functions like registration and peep creation.
- `middleware`: Contains middleware functions, including `verifyToken` to ensure only authenticated requests access particular endpoints.
- `public/assets`: The storage for all uploaded files (like profile pictures).

### Frontend:
- `state`: Contains Redux's toolkit slice, reducers, and actions. It manages state for authentication.
- `App.js`: The root component of the React application, where all other components reside.

## Installation & Setup

### Backend:
1. Navigate to the backend directory.
2. Install all dependencies with `npm install`.
3. Ensure MongoDB is running on your machine or utilize a cloud-hosted cluster.
4. Update the `.env` file with the MongoDB connection string.
5. Start the server with `bode index.js`. It runs on port `3001` by default.

### Frontend:
1. Go to the frontend directory.
2. Install dependencies with `npm install`.
3. Launch the React app using `npm start`, which usually runs on port `3001`.

## Features

- **User Authentication**: Offers registration and login functionality using JWT (JSON Web Tokens).
- **Create Peep**: After logging in, users can post a peep, optionally attaching an image.
- **View Peeps**: All peeps appear on the main page. Users can also view a specific user's peeps when visiting their profile.
- **Image Uploads**: During registration, users can upload profile pictures. They can also attach images to peeps.

## Endpoints

1. User Registration: `POST /auth/register`
2. Post a Peep: `POST /peeps`
3. Get all Peeps: `GET /peeps`
4. Fetch a specific user's peeps: `GET /peeps/:userId/peeps`


### Backend:
- **Testing Framework**: Mocha & Chai.
- **Running Tests**: Navigate to the backend directory and run `npm test`.

### Frontend:
- **Testing Framework**: Jest & React Testing Library.
- **Running Tests**: Navigate to the frontend directory and execute `npm test`.


## Security

- **helmet**: The backend employs the helmet library, securing HTTP headers and countering several vulnerabilities.
- **JWT**: JSON Web Tokens assure secure information transmission between the client and server and facilitate user authentication.


