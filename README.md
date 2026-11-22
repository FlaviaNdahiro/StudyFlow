# StudyFlow – Your Study Companion

StudyFlow is a multi-page React study management application designed to help students organize their tasks, manage their study time, and stay focused on their academic goals.

## Features

- **Dashboard:** View study progress, task statistics, and upcoming tasks.
- **Task Management:** Add, edit, delete, and complete study tasks.
- **Search and Filters:** Search tasks and filter by completion status.
- **Task Sorting:** Sort tasks by priority and due date.
- **Focus Timer:** Use a Pomodoro-style timer with study and break sessions.
- **Settings:** Set and save your daily study goal.
- **Data Persistence:** Save tasks and settings using localStorage.
- **Responsive Design:** Use the application on different screen sizes.
- **Navigation:** Move between pages using React Router.

## Pages and Routes

| Page | Route | Description |
|---|---|---|
| Dashboard | `/` | Displays study progress and task summaries |
| Tasks | `/tasks` | Manage and organize study tasks |
| Focus | `/focus` | Use the study timer |
| Settings | `/settings` | Manage study preferences |

## Technologies Used

- React 19
- JavaScript
- Vite
- Tailwind CSS
- React Router DOM
- HTML
- CSS
- Browser localStorage
- Git and GitHub

## Custom React Hooks

StudyFlow uses reusable custom hooks:

- `useLocalStorage` – Saves and retrieves data from localStorage.
- `useToggle` – Manages toggle states.
- `useDocumentTitle` – Updates the browser tab title.
- `useDebounce` – Delays search updates to improve performance.

## Reusable Components

The application includes reusable components such as:

- Navbar
- TaskCard
- TaskTitleInput
- EmptyState
- SummaryCard
- FocusTimer

These components help keep the application organized and make code easier to maintain.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/FlaviaNdahiro/StudyFlow.git
```

### 2. Open the project folder

```bash
cd StudyFlow
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL shown in your terminal to view the application.

### 5. Build for production

```bash
npm run build
```

## Data Persistence

StudyFlow uses the browser's localStorage to keep tasks and settings saved, including after refreshing the page.

## React Compiler

React Compiler is not enabled in this project. It can be added by following the official React documentation:

https://react.dev/learn/react-compiler/installation

## GitHub Repository

https://github.com/FlaviaNdahiro/StudyFlow

## Author

**Flavia Ndahiro**

Computer Networking Student | React Developer in Training
