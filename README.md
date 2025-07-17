# MERN Shopping List Application

A full-stack Shopping List app built with the MERN stack (MongoDB, Express, React, Node.js). This project demonstrates best practices in authentication, validation, debugging, and comprehensive testing (unit, integration, and end-to-end).

---

## Features
- User registration and login with JWT authentication
- Protected CRUD operations for shopping list items
- Advanced validation on both frontend and backend
- Responsive, mobile-first UI with modern styling
- Robust error handling and logging (Winston, React Error Boundaries)
- Comprehensive testing: unit, integration, and E2E (Cypress)

---

## Project Structure
```
week-6-test-debug-assignment-wmweemba/
├── client/
│   ├── src/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── components/
│   │   │   ├── ShoppingList.jsx
│   │   │   ├── ShoppingListItem.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── ErrorBoundary.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/
│   │   │   └── useToggle.js
│   │   └── tests/
│   │       ├── unit/
│   │       ├── integration/
│   │       └── e2e/
│   └── cypress/
│       └── e2e/
├── server/
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── logger.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── errorHandler.js
│   │   ├── models/
│   │   │   ├── Item.js
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   └── items.js
│   │   └── utils/
│   │       └── helpers.js
│   └── tests/
│       ├── unit/
│       └── integration/
├── changelog.md
├── README.md
└── ...
```

---

## Setup & Installation

### Prerequisites
- Node.js (v18+ recommended)
- pnpm (preferred package manager)
- MongoDB (local or Atlas)

### 1. Clone the repository
```sh
git clone <repo-url>
cd week-6-test-debug-assignment-wmweemba
```

### 2. Install dependencies
```sh
cd server
pnpm install
cd ../client
pnpm install
```

### 3. Environment Variables
- Copy `.env.example` to `.env` in `server/` and set your MongoDB URI and JWT secret.

### 4. Start the app
- **Backend:**
  ```sh
  cd server
  pnpm run dev
  ```
- **Frontend:**
  ```sh
  cd client
  pnpm run dev
  ```
- Visit [http://localhost:5173](http://localhost:5173)

---

## Usage
- Register a new user or login with existing credentials.
- Add, mark as purchased, unmark, and delete shopping list items.
- Logout to end your session.

---

## Testing Strategy

### 1. **Unit Testing**
- **Tools:** Jest (backend & frontend), React Testing Library (frontend)
- **Coverage:** Utility functions, React components, custom hooks, Express middleware
- **How to run:**
  - Backend: `cd server && pnpm test -- --coverage`
  - Frontend: `cd client && pnpm test -- --coverage`

### 2. **Integration Testing**
- **Tools:** Supertest (backend), React Testing Library (frontend)
- **Coverage:**
  - Backend: API endpoints, authentication, validation, protected routes (using in-memory MongoDB)
  - Frontend: Authentication flows, form validation, protected UI
- **How to run:**
  - Backend: `cd server && pnpm test -- --coverage`
  - Frontend: `cd client && pnpm test -- --coverage`

### 3. **End-to-End (E2E) Testing**
- **Tools:** Cypress
- **Coverage:** Registration, login, CRUD, navigation, error handling, visual regression
- **How to run:**
  - `cd client && pnpm cypress:open` (interactive)
  - `cd client && pnpm cypress:run` (headless)

### 4. **Debugging & Monitoring**
- **Backend:** Winston logger for persistent logs, morgan for HTTP logs, global error handler
- **Frontend:** React ErrorBoundary, browser DevTools, React DevTools, performance profiling

---

## Best Practices & Notes
- All critical routes are protected by JWT authentication.
- Advanced validation is enforced on both frontend and backend.
- Error boundaries and global error handlers ensure robust error reporting.
- The UI is mobile-first, responsive, and visually balanced.
- All changes and features are documented in `changelog.md`.

---

