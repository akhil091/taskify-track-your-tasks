# Task Management Application

Welcome to the Task Management Application! This application allows users to create, update, and manage tasks within different columns, similar to Trello. Users can move tasks between columns using drag-and-drop functionality and log in via Google for a seamless experience.

## FrontEnd Deployed Link :- https://voosh-assignment-dusky.vercel.app/
## BackEnd Deployed Link :- https://voosh-assignment-4zan.onrender.com

## Table of Contents

1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Usage](#usage)
5. [API Endpoints](#api-endpoints)
6. [Error Handling](#error-handling)
7. [Validation](#validation)
8. [Screenshots](#screenshots)
9. [Bonus Features](#bonus-features)

## Features

- **User Authentication**: Users can sign up and log in using their email and password or via Google.
- **Task Management**: Users can create, read, update, and delete tasks.
- **Drag-and-Drop Functionality**: Users can move tasks between columns such as "To Do," "In Progress," and "Completed."
- **Profile Management**: Users can update their profile information, including email, name, and profile picture.
- **Task Searching and Sorting**: Users can search for tasks and sort them based on different criteria.

## Prerequisites

Make sure you have the following installed on your local development environment:

- **Node.js**: v20.15.1
- **npm**: v10.7.0

## Installation

### Clone the Repository

First, clone the repository to your local machine:

```
git clone (https://github.com/Chakresh2001/Voosh-Assignment.git)
cd Voosh-Assignment
```

# Install Dependencies
Navigate to the frontend and backend folders separately and run the following command to install the necessary dependencies:

```
npm install
```

# Configure Environment Variables
Create a .env file in the backend folder and add the following environment variables:

```
MONGO_URI=<your-mongodb-connection-string>
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
```

# Run the Application

## FrontEnd Server
To start the frontend server, navigate to the frontend folder and run:

```
npm run dev
```
The frontend server will run on http://localhost:5173/.

 ## Backend Server
 To start the backend server, navigate to the backend folder and run:

 ```
npm run start
```
The backend server will run on http://localhost:8080/.

## Usage

### User Authentication

- **Sign Up**: Users can create a new account using their email and password.
- **Log In**: Users can log in using their email and password or via Google.
- **Profile Management**: After logging in, users can update their profile information, including email, name, and profile picture.

### Task Management

- **Create Tasks**: Users can add new tasks with a title and description.
- **Drag-and-Drop**: Users can drag and drop tasks between columns such as "To Do," "In Progress," and "Completed."
- **Edit Tasks**: Users can edit the details of existing tasks.
- **Delete Tasks**: Users can delete tasks they no longer need.
- **Search and Sort**: Users can search for tasks by title and sort tasks based on different criteria.

## API Endpoints

### User Authentication

- **POST** `user/register` - Register a new user
- **POST** `user/login` - Log in an existing user
- **GET** `user/auth-google` - Log in using Google

### Task Management

- **POST** `/task/add` - Create a new task
- **GET** `/task/all` - Retrieve all tasks
- **GET** `/task/all/:id` - Retrieve a specific task
- **PATCH** `/task/edit/:taskId` - Update a task
- **DELETE** `/task/delete/:taskId` - Delete a task

## Error Handling

The application includes comprehensive error handling to ensure that users receive appropriate error messages and status codes. Common errors such as invalid input data, authentication failures, and server errors are handled gracefully.

## Validation

Server-side validation is implemented to ensure that:

- **Tasks**: Tasks must have a valid title and belong to a valid column.
- **User Registration and Login**: Ensure user data is valid and secure.

## SCREENSHOTS 

# Application Login Page

![Login Page](https://github.com/user-attachments/assets/8e11367f-9419-4d32-88fc-661124322184)

# Application Signup Page

![Signup Page](https://github.com/user-attachments/assets/f7b434c0-f941-4305-8083-2bb68f9c7713)


# Application Home Page

![Home page](https://github.com/user-attachments/assets/700c18ef-d652-4d5b-b7d2-92df66b3667f)

# Application Profile Page

![Profile page](https://github.com/user-attachments/assets/fa0afcdd-c25a-4875-89a7-e36899d994bc)

# Application Profile Eidt

![Profile edit page](https://github.com/user-attachments/assets/0cae1256-b144-4b3a-8ff3-fc7a52c473c2)

# Application Signup Validation FrontEnd

![signup validation](https://github.com/user-attachments/assets/d6aae50b-a2b0-45e0-ad3e-0ebdd4c1170c)

# Application Add Task Validation

![Add Task Validation](https://github.com/user-attachments/assets/00ff877e-437a-404d-944b-a3f89e1e70a9)


## Thank you for using the Task Management Application! If you have any questions or feedback, please feel free to open an issue on GitHub Or Mail Me At :- jha.chakresh2001@gmail.com



