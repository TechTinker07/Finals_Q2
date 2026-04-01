# Finals_Q2 - Todo Management System

## Overview
This project is the frontend of the Todo Management System. It is built using React, TypeScript, Vite, Context API, React Hook Form, and a .NET Web API backend.

## Features
- View the list of todos
- Add new todo items
- Edit existing todos
- Toggle completion status
- Delete todos
- Navigate between Todo and About pages
- Switch between Light, Dark, and Ocean themes
- Use a modal for editing todo items

## Setup and Run
1. Open the project in VS Code.
2. Install dependencies:

```bash
npm install
```
4. Make sure the backend API is also running.

## Routing
- / - Todo page
- /about - About page
## Architecture
This project uses React Router for page navigation, Context API for global state management, and a custom useTodos hook for cleaner access to todo functions and data. 
The UI is divided into reusable components such as AddTodoForm, TodoList, TodoItem, and EditTodoModal. State updates are handled immutably to ensure proper React rendering.
## Theme Support
The application includes three global themes:
- Light
- Dark
- Ocean
These themes are managed through ThemeContext and applied across the whole interface.
## Backend Integration
The frontend connects to the .NET Web API to perform CRUD operations. Todo data is fetched from the backend and updated only after successful API responses.

## Technical Debt Fixes
The following issues were corrected in the implementation:
- Delete logic now uses id correctly instead of title
- Update logic now uses map() instead of filter()
- Todo items now use todo.id as the React key instead of the array index
  
## About the Project
This Todo Management System is a simple and functional web application designed to help users manage daily tasks more efficiently. It allows users to add, edit, update, and delete todos while maintaining a clean and responsive interface. The project also demonstrates routing, reusable components, theme switching, form handling, and frontend-backend integration as part of a complete full-stack application.

## Bonus Challenge A
The application also includes the Focus-Flow Constraint bonus challenge:
- A maximum of 5 active tasks is allowed at a time
- Tasks must be completed in the order they were created
- Completed tasks are automatically removed after 15 seconds
## Bonus Challenge A Support
The backend was updated to support task creation order by including a `CreatedAt` field in the todo model.

