# Todo List Application (Front-End Developer Test)

A simple Todo List web application built as part of a Front-End Developer technical assignment.  
The project focuses on clean architecture, proper state management, and clear separation of concerns rather than complex UI.

---

## Tech Stack

- **React** (Functional Components)
- **TypeScript**
- **Vite** (Project setup & bundler)
- **React Context API + useReducer** (State management)
- **Fetch API** (API integration)
- **CSS** (Simple styling, no heavy UI library)

---

## Features

- Fetch todo items from an API
- Display todo list
- Add new todo
- Edit existing todo
- Delete todo
- Toggle todo status (Done / Not Done)
- Loading state handling
- Error state handling
- Optimistic UI updates (for better UX)

---

## Thought Process & Design Decisions

### Why Vite?
- Fast development server and build time
- Lightweight and modern
- Suitable for small-to-medium React applications

### Why Context API + useReducer?
- The application state is global but not complex enough to require Redux
- `useReducer` provides predictable state transitions
- Context API allows sharing state across components cleanly
- Easier to reason about data flow during code review and interviews

### Why separate API layer?
- Keeps components clean and focused on UI
- Makes it easier to replace or mock APIs in the future
- Improves maintainability and testability

### Why JSONPlaceholder?
- Simple mock API for demonstration purposes
- Allows showcasing async data fetching, loading, and error handling
- Note: data is not persisted on the server

---
