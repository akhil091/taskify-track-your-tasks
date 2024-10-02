# Taskify : Track your tasks

This application allows users to create, update, and manage tasks within different columns, similar to Trello. Users can move tasks between columns using drag-and-drop functionality and log in via Google for a seamless experience.

### Deployed Link : https://taskify-track-your-tasks.netlify.app
### backend deployed at https://taskify-track-your-tasks.onrender.com
## Table of Contents

1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Usage](#usage)
5. [API Endpoints](#api-endpoints)
6. [Error Handling](#error-handling)
7. [Validation](#validation)
8. [Screenshots](#screenshots)

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

### Application Login Page

![image](https://github.com/user-attachments/assets/0d730bb1-7e2a-4e62-8143-71f2c65d5221)


### Application Signup Page

![image](https://github.com/user-attachments/assets/a4b12cfb-c597-4075-8c9f-657239d50a2d)


### Application Home Page

![image](https://github.com/user-attachments/assets/c1cdd521-915a-44ea-80a5-a5dc835adf74)


### Application Profile Page

![image](https://github.com/user-attachments/assets/a7aec8a0-8236-4a60-b691-7302042ca4f3)

### Application Profile Eidt

![image](https://github.com/user-attachments/assets/7be0237e-f4aa-4084-9f79-7b4c8d85657c)




